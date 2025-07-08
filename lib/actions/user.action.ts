import { ID, Query, OAuthProvider } from "appwrite";
import { account, avatars, databases } from "../appwrite";
import {users} from "./user.server";
import { parseStringify } from "../utils";

//USER REGISTRATION WITH THE DATABASE
export const user_signUp = async ({ password, ...userData }: UserSignUpParams) => {
    const { email, name , phone} = userData;
    try {
        const user = await users.create(ID.unique(), email, phone , password, name);
        if (!user) throw new Error("User not created");
        const avatar = await avatars.getInitials(name, 100, 100, "DFD3E3");
        await user_login({ email, password })
        const newUser = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: user.$id,
                avatar,
                createdAt : user.$createdAt,
                authMethod : 'email'
            }
        )
        return newUser;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function storeGoogleUser(email: string) {
    try {
        const userData = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
            [Query.equal("email", email)]
        );
        if (userData.total == 0) {
            const user = await getAccount()
            if(!user) throw Error("User not found");
            const { providerAccessToken } = (await account.getSession("current")) || {};
            const profilePicture = providerAccessToken
                ? await getGooglePicture(providerAccessToken)
                : null;
            const dob = providerAccessToken 
                    ? await getUserDOBGoogle(providerAccessToken) 
                    : Date.now();

            const gender = providerAccessToken 
                    ? await getUserGenderGoogle(providerAccessToken)
                    : "Others";
            const newUser = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
                ID.unique(),
                {
                    email: user.email,
                    userId: user.$id,
                    avatar: profilePicture,
                    name: user.name,
                    dob: dob,
                    //gender: gender,
                    createdAt: user.$createdAt,
                    authMethod: "google"
                }
            )
            return newUser;
        }
    } catch (err) {
        console.error('Signup Error:', err);
        throw err;
    }
}

//USER LOGIN 
export const user_login = async ({ email, password }: UserLoginParams) => {
    try {
        const user = await account.createEmailPasswordSession(email, password);
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function googleLogin() {
    try {
        //const userData = await account.createOAuth2Token(OAuthProvider.Google);
        localStorage.setItem("googleAuth", "true");
        const user = await account.createOAuth2Session(
            OAuthProvider.Google,
            `${window.location.origin}/profile`,
            `${window.location.origin}/login`,
            ["https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/user.phonenumbers.read","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/user.birthday.read","https://www.googleapis.com/auth/user.gender.read"],
        )
        return user;
    } catch (error) {
        console.error(error);
    }
}

//GOOGLE PEOPLES API FUNCTIONS 
const getGooglePicture = async (accessToken: string) => {
    try {
        const response = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=photos",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch Google profile picture");

        const { photos } = await response.json();
        return photos?.[0]?.url || null;
    } catch (error) {
        console.error("Error fetching Google picture:", error);
        return null;
    }
};

async function getUserDOBGoogle(accessToken: string): Promise<string | null> {
  // Change personFields to 'birthdays' to request birthday information
  const apiUrl = 'https://people.googleapis.com/v1/people/me?personFields=birthdays';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      // Handle HTTP errors (e.g., 401 Unauthorized, 403 Forbidden, 404 Not Found)
      const errorData = await response.json();
      console.error(`Error fetching date of birth: ${response.status} - ${errorData.error.message}`);
      return null;
    }

    const data = await response.json();

    // The birthdays are typically an array. We look for the primary one.
    // Google People API response structure for birthdays:
    // {
    //   "resourceName": "people/...",
    //   "etag": "...",
    //   "birthdays": [
    //     {
    //       "date": {
    //         "year": 1990,
    //         "month": 1,
    //         "day": 15
    //       },
    //       "metadata": {
    //         "primary": true,
    //         "source": {
    //           "type": "ACCOUNT",
    //           "id": "..."
    //         }
    //       }
    //     }
    //   ]
    // }
    if (data.birthdays && Array.isArray(data.birthdays) && data.birthdays.length > 0) {
      // Find the primary birthday if available, otherwise just take the first one
      const primaryBirthday = data.birthdays.find((bday: any) => bday.metadata?.primary);
      const dobData = primaryBirthday ? primaryBirthday.date : data.birthdays[0].date;

      if (dobData && dobData.year && dobData.month && dobData.day) {
        // Validate the year against the specified range
        if (dobData.year < 1000 || dobData.year > 9999) {
          console.error(`Invalid year received from API: ${dobData.year}. Year must be between 1000 and 9999.`);
          return null;
        }

        // Format the date as YYYY-MM-DD HH:MM:SS
        const year = dobData.year.toString();
        const month = dobData.month.toString().padStart(2, '0');
        const day = dobData.day.toString().padStart(2, '0');
        const time = "00:00:00"; // Time components are not provided by Google People API for birthdays

        return `${year}-${month}-${day} ${time}`;
      } else {
        console.log('Birthday data found, but missing year, month, or day.');
        return null;
      }
    } else {
      console.log('No birthday information found for this user.');
      return null;
    }
  } catch (error) {
    console.error('Network or unexpected error:', error);
    return null;
  }
}

async function getUserGenderGoogle(accessToken: string): Promise<string | null> {
  const apiUrl = 'https://people.googleapis.com/v1/people/me?personFields=genders';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      // Handle HTTP errors (e.g., 401 Unauthorized, 403 Forbidden, 404 Not Found)
      const errorData = await response.json();
      console.error(`Error fetching gender: ${response.status} - ${errorData.error.message}`);
      return null;
    }
    const data = await response.json();
    if (data.genders && Array.isArray(data.genders) && data.genders.length > 0) {
      // Find the primary gender if available, otherwise just take the first one
      const primaryGender = data.genders.find((gender: any) => gender.metadata?.primary);
      const genderValue = primaryGender ? primaryGender.value : data.genders[0].value;

      return genderValue;
    }

    return null;
  } catch (error) {
    console.error('Error fetching gender:', error);
    return null;
  }
}


//APPWRITE ACCOUNT RETIVAL

export async function getAccount() {
    try {
        const currentAccount = await account.get()
        return currentAccount;
    } catch (error) {
        console.error(error);
    }
}

export async function getCurrentAccount() {
    try {
        const currentAccount = await getAccount()
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
            [Query.equal("userId", currentAccount.$id)]
        );
        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.error(error);

    }
}


//USER PHONE AUTH (OTP + VERIFICATION)
export async function getUserByPhone(phone: string) {
  try {
    const userData = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("phone", phone)]
    );
    if (userData.total == 0) return null;
    return userData.documents[0];
  } catch (error) {
    console.error(error);
  }
}
export function formatIndianPhoneNumber(phone: string): string {
  // Remove all whitespace for safety
  const cleaned = phone.trim().replace(/\s+/g, '');

  // Check if it already starts with +91 and has 10 digits after it
  if (/^\+91\d{10}$/.test(cleaned)) {
    return cleaned;
  }

  // If it's just 10 digits without +91, append +91
  if (/^\d{10}$/.test(cleaned)) {
    return `+91${cleaned}`;
  }

  // If it's invalid, you can throw an error or handle it differently
  throw new Error('Invalid phone number format. Expecting 10 digits or +91XXXXXXXXXX.');
}

export const sendPhoneOTP = async(phone: string) => {
  try {
    const session = await account.createPhoneToken(ID.unique(), phone);

    return session.userId;
  } catch (error) {
    console.error(error, "Failed to send email OTP");
  }
};


export async function user_phoneLogin(phone: string) {
    try {
    const existingUser = await getUserByPhone(phone);

    // User exists, send OTP
    if (existingUser) {
      await sendPhoneOTP(phone);
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    console.error(error, "Failed to sign in user");
  }
}

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const session = await account.createSession(accountId, password);

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    console.error(error, "Failed to verify OTP");
  }
};

//SIGN OUT FUNCTION 
export async function signOut() {
    try {
        const session = await account.deleteSession("current")
        return session;
    } catch (error) {
        console.error(error);
    }
}

