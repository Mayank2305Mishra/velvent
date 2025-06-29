"use client"
import { useAuthStore } from "@/app/store"
import { LoaderCircle } from 'lucide-react';

const page = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore()
  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>Edit Profile</h1>
          <h1>Email: {user?.email}</h1>
        </div>
      )}
      {!isAuthenticated && (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl flex flex-row font-bold gap-3">
            <LoaderCircle size={48} className="animate-spin" />
          </h1>
          <br />
          <h1 className="text-3xl font-bold">Syncing your data with the databases</h1>
        </div>
      )}
    </div>
  )
}

export default page