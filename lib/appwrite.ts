import { Account, Avatars, Client, Databases } from "appwrite";

const client = new Client();

client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!);
client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

export { account, databases, avatars };
