'use client'
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession()
    const [userName, setUserName] = useState('')
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const { status } = session


    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session?.data?.user?.name)
            setImage(session.data.user.image)
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    // console.log(data);
                    setPhone(data.phone)
                    setStreetAddress(data.streetAddress)
                    setPostalCode(data.postalCode)
                    setCity(data.city)
                    setCountry(data.country)
                })
            })
        }

    }, [session, status])

    async function handleProfileUpdate(e) {
        e.preventDefault()

        const savingPromise = new Promise(async (resolve, reject) => {

            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    image,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country
                })
            })
            if (response.ok)
                resolve()
            else
                reject()
        })

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile Saved!',
            error: 'Error'

        })
    }

    async function handleFileChange(e) {
        const files = e.target.files
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0])

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,

            }).then(async response => {
                if (response.ok) {
                    const link = await response.json();
                    setImage(link?.imageUrl);

                }
            })



            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Uploading Complete',
                error: 'Upload error'
            })
        }
    }



    if (status === 'loading') {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }



    return (
        <section className="mt-24">
            <h1 className="text-center text-primary text-4xl mb-5">profile</h1>
            <div className="max-w-md mx-auto " >


                <div className="flex gap-4">
                    <div>
                        <div className=" p-2 rounded-xl relative  max-w-[120px]">
                            {image && (
                                <Image className="rounded-lg w-full h-full mb-1" src={image} width={250} height={250} alt="userImage" />

                            )}

                            <label >
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                <span className="border border-gray-300 cursor-pointer rounded-lg p-2 text-center block ">Edit</span>
                            </label>
                        </div>
                    </div>

                    <form className="grow" onSubmit={handleProfileUpdate}>

                        <label>First and Last name</label>
                        <input type="text"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="First And Last Name" name="" id=""
                        />

                        <label>Email</label>
                        <input type="email"
                            disabled value={session?.data?.user?.email}
                            placeholder="email"
                        />

                        <label>Phone</label>
                        <input type="tel" placeholder="Phone Number"
                            value={phone} onChange={ev => setPhone(ev.target.value)}
                        />

                        <label>Street Address</label>
                        <input type="text" placeholder="Street Address"
                            value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                        <div className="flex gap-2 ">
                            <div>
                                <label>Postal Code</label>
                                <input type="text" placeholder="Post Code"
                                    value={postalCode} onChange={ev => setPostalCode(ev.target.value)}
                                />
                            </div>

                            <div>
                                <label>City</label>
                                <input type="text" placeholder="City"
                                    value={city} onChange={ev => setCity(ev.target.value)}
                                />
                            </div>

                        </div>
                        <label>Country</label>
                        <input type="text" placeholder="Country"
                            value={country} onChange={ev => setCountry(ev.target.value)} />

                        <button type="submit">save</button>
                    </form>

                </div>

            </div>
        </section>
    )
}