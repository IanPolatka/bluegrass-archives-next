"use client"

import axios from "@/lib/axios"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { toast } from "sonner"

export default function UserPasswordUpdate() {
    const router = useRouter()
    const [current_password, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const user = { current_password, password, password_confirmation };

        axios.put(`/api/password`, user )
            .then((data) => {
                setIsLoading(false)
                setErrors("")
                setCurrentPassword("")
                setPassword("")
                setPasswordConfirmation("")
                router.push('/profile')
                toast.success('Your password has been updated.', {
                    duration: 3000,
                })
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
                setIsLoading(false)
            })
    }
    return (
        <form onSubmit={handleSubmit} className="grid items-center grid-cols-1 gap-4 px-4 py-6 border-b border-gray-300 lg:px-8 md:grid-cols-2">
            <div>
                <Label htmlFor="current_password">Current Password</Label>

                <Input
                    id="current_password"
                    type="password"
                    value={current_password}
                    className="block w-full mt-1"
                    onChange={event => setCurrentPassword(event.target.value)}
                />

                <InputError messages={errors.current_password} className="mt-2" />
            </div>

            <div></div>

            <div>
                <Label htmlFor="password">Password</Label>

                <Input
                    id="password"
                    type="password"
                    value={password}
                    className="block w-full mt-1"
                    onChange={event => setPassword(event.target.value)}
                />

                <InputError messages={errors.password} className="" />
            </div>

            <div>
                <Label htmlFor="password_confirmation">Password Confirmation</Label>

                <Input
                    id="password_confirmation"
                    type="password"
                    value={password_confirmation}
                    className="block w-full mt-1"
                    onChange={event => setPasswordConfirmation(event.target.value)}
                />

                <InputError messages={errors.password} className="mt-2" />
            </div>

            <div className="flex items-center justify-start">
                <Button className="" disabled={isLoading}>Update</Button>
            </div>
        </form>
    )
}
