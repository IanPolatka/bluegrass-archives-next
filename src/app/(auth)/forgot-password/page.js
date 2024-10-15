'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import ApplicationLogo from '@/components/ApplicationLogo'

const Page = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (

            <div className="relative flex flex-col min-h-screen">
                <div className="flex items-center justify-center w-full h-screen px-4 themes-wrapper">
                    <div className="space-y-8">
                        <ApplicationLogo  />
                        <div className="w-full max-w-sm p-4 bg-white border border-gray-300 rounded-md">
                            <div className="block mb-4 text-sm text-gray-500">
                                Forgot your password? No problem. Just let us know your email
                                address and we will email you a password reset link that
                                will allow you to choose a new one.
                            </div>

                            {/* Session Status */}
                            <AuthSessionStatus className="mb-4" status={status} />

                            <form onSubmit={submitForm}>
                                {/* Email Address */}
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        className="block w-full mt-1"
                                        onChange={event => setEmail(event.target.value)}
                                        required
                                        autoFocus
                                    />

                                    <InputError messages={errors.email} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button>Email Password Reset Link</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default Page
