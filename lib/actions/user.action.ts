import { ID, Query } from "appwrite";
import { account, avatars, databases } from "../appwrite";

export const user_signUp = async ({ password, ...userData }: UserSignUpParams) => {
    const { email, name } = userData;
    try {
        const user = await account.create(ID.unique(), email, password, name);
        if (!user) throw new Error("User not created");
        const avatar = await avatars.getInitials(name, 100, 100, "#DFD3E3");
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

export const getUserInfo = async ({ userId }: { userId: string }) => {
    try {
        const user = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
            [Query.equal('userID', [userId])]
        )

        return user.documents[0];
    } catch (error) {
        console.error('Error', error)
    }
}

export async function getLoggedInUser() {
    try {
        const result = await account.get();
        const user = await getUserInfo({ userId: result.$id })
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}