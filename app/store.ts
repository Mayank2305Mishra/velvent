
import { create } from 'zustand'
import { getAccount, getCurrentAccount, storeGoogleUser } from '@/lib/actions/user.action';
import { persist } from "zustand/middleware";
import { account } from '@/lib/appwrite';


export const INITIAL_USER = {
    userId: "",
    name: "",
    email: "",
    phone:"",
    dob: new Date(),
    gender:"Male",
    avatar:"https://api.dicebear.com/6.x/micah/png?seed=MM&backgroundColor=b6e3f4,c0aede,d1d4f9",
    bio:"",
    bannerImg:"https://i.ibb.co/PG6mX543/3ca8bc3b8c77f6bac9ea67398058397ac3633b3e.jpg"
  };
  


interface AuthStore {
    user: User;
    isLoading: boolean;
    setUser: (user: User) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (bool: boolean) => void;
    checkAuthUser: () => Promise<boolean>;
    googleUserData: () => Promise<any>;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: INITIAL_USER,
            isLoading: false,
            isAuthenticated: false,
            setIsAuthenticated: (bool: boolean) =>
                set(() => ({ isAuthenticated: bool })),
            setUser: (user: User) =>
                set(() => ({ user: { ...get().user, ...user } })),
            checkAuthUser: async () => {
                try {
                    const currentAccount = await getCurrentAccount();
                    if (currentAccount) {
                        get().setUser({
                            userId: currentAccount.userId,
                            name: currentAccount.name,
                            email: currentAccount.email,
                            phone: currentAccount.phone,
                            avatar: currentAccount.avatar,
                            bio: currentAccount.bio,
                            dob: currentAccount.dob,
                            gender: currentAccount.gender,
                            bannerImg: currentAccount.bannerImg
                        });
                        get().setIsAuthenticated(true);
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            },
            googleUserData: async () => {
              try {
                  const user = await getAccount()
                  if(user){
                  const userData = await storeGoogleUser(user.email);
                  await get().checkAuthUser();
                  return userData
                  }
                  else{
                    return INITIAL_USER
                  }
              }  
              catch (error) {
               console.error(error)
               throw error; 
              }
            },
            logout: async () => {
                set(() => ({ user: INITIAL_USER, isAuthenticated: false }));
            },
        }),
        { name: "auth" , skipHydration: true}
    )
);