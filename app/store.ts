import { create } from 'zustand'
import { getCurrentAccount } from '@/lib/actions/user.action';
import { persist } from "zustand/middleware";

export const INITIAL_USER = {
    userId: "",
    name: "",
    email: "",
    phone:"",
    dob: new Date(),
    gender:"",
    avatar:"https://api.dicebear.com/6.x/micah/png?seed=MM&backgroundColor=b6e3f4,c0aede,d1d4f9",
    bio:"",
    bannerImg:""
  };
  


interface AuthStore {
    user: User;
    isLoading: boolean;
    setUser: (user: User) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (bool: boolean) => void;
    checkAuthUser: () => Promise<boolean>;
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

            logout: async () => {
                set(() => ({ user: INITIAL_USER, isAuthenticated: false }));
            },
        }),
        { name: "auth" , skipHydration: true}
    )
);