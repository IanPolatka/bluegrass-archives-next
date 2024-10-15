import UserInformation from "@/components/Profile/UserInformation";
import UserPasswordUpdate from "@/components/Profile/UserPasswordUpdate";
import BackToHomeButton from '@/components/BackToHomeButton'

export default function Profile() {
    return (
        <main>
            <div className="p-4 mx-auto mt-4 md:p-0 md:mt-16 max-w-7xl">
                <div className="space-y-4 md:mx-12">
                    <BackToHomeButton />
                    <div className="bg-white border rounded-md shadow-md">
                        <div className="grid items-center grid-cols-1 gap-4 px-4 py-6 border-b border-gray-300 lg:px-8 md:grid-cols-2">
                            <h1 className="text-xl font-semibold">Profile Information</h1>
                        </div>
                        <div className="px-8 py-2 border-b border-gray-300 bg-sky-950/5">
                            <div className="text-gray-500">
                                <div className="text-xs uppercase">Personal Information</div>
                            </div>
                        </div>
                        <UserInformation />
                        <div className="px-8 py-2 border-b border-gray-300 bg-sky-950/5">
                            <div className="text-gray-500">
                                <div className="text-xs uppercase">Update Password</div>
                            </div>
                        </div>
                        <UserPasswordUpdate />
                    </div>
                </div>
            </div>
        </main>
    )
}