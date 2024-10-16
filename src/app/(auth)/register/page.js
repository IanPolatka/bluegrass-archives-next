'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import ApplicationLogo from '@/components/ApplicationLogo'
import ReCAPTCHA from 'react-google-recaptcha'

const Page = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [capVal, setCapVal] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }

    return (
        <div className="relative flex flex-col min-h-screen">
            <div className="flex items-center justify-center w-full h-screen px-4 themes-wrapper">
                <div className="space-y-8 w-96">
                    <ApplicationLogo />
                    <form onSubmit={submitForm} className="w-full max-w-sm p-4 bg-white border border-gray-300 rounded-md">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                type="text"
                                value={name}
                                className="block w-full mt-1"
                                onChange={event => setName(event.target.value)}
                                required
                                autoFocus
                            />

                            <InputError messages={errors.name} className="mt-2" />
                        </div>

                        {/* Email Address */}
                        <div className="mt-4">
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className="block w-full mt-1"
                                onChange={event => setEmail(event.target.value)}
                                required
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
                                autoComplete="new-password"
                            />

                            <InputError messages={errors.password} className="mt-2" />
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

                        <ReCAPTCHA
                            sitekey="6LdiOSUqAAAAAGkEu8yNLDbTKCuwtpAOjVwgeuWT"
                            onChange={(val) => setCapVal(val)}
                            className="block w-full mt-4 mb-4"
                        />

                        <div className="flex items-center justify-end mt-4">
                            <Link
                                href="/login"
                                className="text-sm text-gray-600 underline hover:text-gray-900">
                                Already registered?
                            </Link>

                            <Button disabled={!capVal || !name || !email || !password || !passwordConfirmation} className="ml-4">Register</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page
