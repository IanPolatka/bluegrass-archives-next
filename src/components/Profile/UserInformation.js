"use client"

import axios from "@/lib/axios"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { toast } from "sonner"

export default function UserInformation() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = () => {
        setIsLoading(true)
        axios.get('/api/profile')
            .then(({data}) => {
                setIsLoading(false)
                setName(data.data.name)
                setEmail(data.data.email)
            })
            .catch(() => {
                setIsLoading(false)
            })
    } 

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const userInformation = { name: name, email: email }

        axios.put(`/api/profile`, userInformation )
            .then((data) => {
                setIsLoading(false)
                setErrors("")
                toast.success('Your personal information has been updated.', {
                    duration: 3000,
                })
                router.push('/profile')
            })
            .catch(error => {
                const response = error.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
                setIsLoading(false)
            })
    }
    return (
        <form onSubmit={handleSubmit} className="grid items-center grid-cols-1 gap-4 px-4 py-6 border-b border-gray-300 lg:px-8 md:grid-cols-2">
            <div>
                <Label htmlFor="name">Name</Label>

                <Input
                    id="name"
                    type="text"
                    value={name}
                    className="block w-full mt-1"
                    onChange={event => setName(event.target.value)}
                    autoFocus
                    required
                />

                <InputError messages={errors.name} className="mt-2" />
            </div>

            <div>
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

            <div className="flex items-center justify-start">
                <Button className="" disabled={isLoading}>Update</Button>
            </div>
        </form>
    )
}