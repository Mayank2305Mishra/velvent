import { ID, Query, OAuthProvider } from "appwrite";
import { account, avatars, databases } from "../appwrite";
import axios from "axios";

interface PhoneNumberResponse {
  phoneNumber?: string;
  rawResponse?: any;
}

export const user_signUp = async ({ password, ...userData }: UserSignUpParams) => {
    const { email, name } = userData;
    try {
        const user = await account.create(ID.unique(), email, password, name);
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
            }
        )
        return newUser;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const user_login = async ({ email, password }: UserLoginParams) => {
    try {
        const user = await account.createEmailPasswordSession(email, password);
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAccount() {
    try {
        const currentAccount = await account.get()
        return currentAccount;
    } catch (error) {
        console.error(error);
    }
}

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
const getGoogleDOB = async (accessToken: string) => {
    try {
        const response = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=birthdays",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch Google profile picture");
        const {birthdays} = await response.json();
        return birthdays
    } catch (error) {
        console.error("Error fetching Google picture:", error);
        return null;
    }
}
export async function googleLogin() {
    try {
        //const userData = await account.createOAuth2Token(OAuthProvider.Google);
        const user = await account.createOAuth2Session(
            OAuthProvider.Google,
            `${window.location.origin}/profile/edit`,
            `${window.location.origin}/login`,
            ["https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/user.phonenumbers.read","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"],
        )
        return user;
    } catch (error) {
        console.error(error);
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
                }
            )
            return newUser;
        }
    } catch (err) {
        console.error('Signup Error:', err);
        throw err;
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

export async function signOut() {
    try {
        const session = await account.deleteSession("current")
        return session;
    } catch (error) {
        console.error(error);
    }
}