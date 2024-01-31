'use client'
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const session = useSession()
    const [userName, setUserName] = useState(session?.data?.user?.name || '')
    const { status } = session
    const [saved, setSaved] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session?.data?.user?.name)
        }

    }, [session, status])

    async function handleProfileUpdate(e) {
        e.preventDefault()
        setSaved(false)
        setIsSaving(true)
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName })
        })
        setIsSaving(false)
        if (response.ok) {
            setSaved(true)
        }

    }



    if (status === 'loading') {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    const userImage = session?.data?.user?.image

    return (
        <section className="mt-24">
            <h1 className="text-center text-primary text-4xl mb-5">profile</h1>
            <div className="max-w-md mx-auto " >

                {saved ? (
                    <h2 className="text-center bg-green-100 p-4 rounded-lg border border-x-green-400">Profile saved!</h2>
                ):''}
                {
                    isSaving ? (
                        <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-x-blue-400">Saving...</h2>
                    ):''
                }
                <div className="flex gap-3 items-center">
                    <div>

                        <div className=" p-2 rounded-xl">
                            <Image className="rounded-lg w-full h-full mb-1" src={userImage} width={250} height={250} alt="userImage" />
                            <button type="button">Edit</button>
                        </div>

                    </div>
                    <form className="grow" onSubmit={handleProfileUpdate}>
                        <input type="text"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="First And Last Name" name="" id="" />
                        <input type="email" disabled value={session?.data?.user?.email} />
                        <button type="submit">save</button>
                    </form>
                </div>

            </div>
        </section>
    )
}