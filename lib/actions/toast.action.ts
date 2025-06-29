import { Query } from "appwrite";
import { databases } from "../appwrite";

const toast_message = {
    "email_exists": "Email already exists, try to login or login with Google",
    "email_doesnt_exist" : "Email doesnt exists, try to signup or signup with Google",
    "phone_doesnt_exist" : "Phone number doesnt exists, try to signup",
    "google_auth" : "Google account already exists, try to login",
    "invalid_credientials": "Invalid credientials"
}

export const emailCheckSign = async(email: string)=>{
    const userData = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
        [Query.equal("email", email)]
    );
    if (userData.total == 0) {
        return false
    }
    else{
        return toast_message.email_exists
    }
}

export const emailCheckLogin = async(email: string)=>{
    const userData = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
        [Query.equal("email", email)]
    );
    if (userData.total == 0) {
        return toast_message.email_doesnt_exist
    }
    else{
        return false
    }
}

export const phoneCheckLogin = async(phone: string)=>{
    const userData = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
        [Query.equal("phone", phone)]
    );
    if (userData.total == 0) {
        return toast_message.phone_doesnt_exist
    }
    else{
        return false
    }
}