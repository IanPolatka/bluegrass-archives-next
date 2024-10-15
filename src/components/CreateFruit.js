'use client'

import axios from "@/lib/axios"
import { useState } from 'react'
import { useRouter } from "next/navigation"
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from "@/hooks/auth"

export const CreateFruit = () => {
    const router = useRouter()
    const { user } = useAuth()
    const [name, setName] = useState('')
    const [errors, setErrors] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const metadata = {
        title: 'Laravel - Create Fruit',
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const fruit = { name: name, user_id: user.id };

        axios.post(`/api/fruits`, fruit )
            .then((data) => {
                setIsLoading(false)
                setErrors("")
                setName("")
                router.push('/')
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
                setIsLoading(false)
            })
    }
    
    // const { data: fruit } = useSWR('/api/fruit', () =>
    //     axios
    //         .post('/api/fruit')
    //         .then(res => res.data)
    //         .catch(error => {
    //             if (error.response.status !== 409) throw error
    //         }),
    // )

    // const submitForm = async event => {
    //     event.preventDefault()

    //     login({
    //         fruit,
    //         password,
    //         setErrors,
    //     })
    // }

    return (
        <div>
            <h2>Your Fruits</h2>
            <div className="flex items-center">
                <form onSubmit={handleSubmit}>
                    {/* Fruit */}
                    <div>
                        <Label htmlFor="name">Fruit Name</Label>

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

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-3" disabled={isLoading}>Create</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}