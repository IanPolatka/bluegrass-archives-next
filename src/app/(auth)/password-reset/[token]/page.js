'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const PasswordReset = () => {
    const searchParams = useSearchParams()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(searchParams.get('email'))
    }, [searchParams.get('email')])

    return (
        <>
            <div className="relative flex flex-col min-h-screen">
                <div className="flex items-center justify-center w-full h-screen px-4 themes-wrapper">
                    <div className="w-full max-w-sm p-4 bg-white border border-gray-300 rounded-md">
                        {/* Session Status */}
                        <AuthSessionStatus className="mb-4" status={status} />

                        <form onSubmit={submitForm}>
                            {/* Email Address */}
                            <div>
                                <Label htmlFor="email">Email</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    className="block w-full mt-1"
                                    onChange={event => setEmail(event.target.value)}
                                    required
                                    autoFocus
                                />

                                <InputError messages={errors.email} className="mt-2" />
                            </div>

                            {/* Password */}
                            <div className="mt-4">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    className="block w-full mt-1"
                                    onChange={event => setPassword(event.target.value)}
                                    required
                                />

                                <InputError
                                    messages={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mt-4">
                                <Label htmlFor="passwordConfirmation">
                                    Confirm Password
                                </Label>

                                <Input
                                    id="passwordConfirmation"
                                    type="password"
                                    value={passwordConfirmation}
                                    className="block w-full mt-1"
                                    onChange={event =>
                                        setPasswordConfirmation(event.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    messages={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Button>Reset Password</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PasswordReset
