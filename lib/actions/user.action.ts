import { ID, Query, OAuthProvider } from "appwrite";
import { account, avatars, databases } from "../appwrite";
import { create } from "domain";

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

export async function googleLogin() {
    try {
        const session = await account.createOAuth2Session(
            OAuthProvider.Google,
            `${window.location.origin}/`,
            `${window.location.origin}/`,
        )
        return session;
    } catch (error) {
        console.error(error);
    }
}

export async function signupWithGoogleOAuth() {
    try {
        const session = await googleLogin();
        if(!session) throw new Error("Session not found");
        
        const user = await account.get();
        if (!user) throw new Error("User not found");

        const { providerAccessToken } = (await account.getSession("current")) || {};
        const profilePicture = providerAccessToken
            ? await getGooglePicture(providerAccessToken)
            : null;
        const createdUser = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
            ID.unique(),
            {
                userId: user.$id,
                email: user.email,
                name: user.name,
                avatar: profilePicture,
            }
        );
        return createdUser;
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