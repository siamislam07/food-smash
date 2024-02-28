'use client'
import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs"
import EditAbleImage from "../../components/layout/EditAbleImage";

export default function ProfilePage() {
    const session = useSession()
    const [userName, setUserName] = useState('')
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [profileFetched, setProfileFetched] = useState(false)
    const { status } = session


    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session?.data?.user?.name)
            setImage(session.data.user.image)
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    // console.log(data);
                    setPhone(data?.phone)
                    // console.log(data?.phone);
                    setStreetAddress(data?.streetAddress)
                    setPostalCode(data?.postalCode)
                    setCity(data?.city)
                    setCountry(data?.country)
                    setIsAdmin(data?.admin)
                    setProfileFetched(true)
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

    



    if (status === 'loading' || !profileFetched) {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }



    return (
        <section className="mt-24">
            <UserTabs isAdmin={isAdmin}></UserTabs>

            <div className="max-w-md mx-auto mt-8" >


                <div className="flex gap-4">
                    <div>
                        <div className=" p-2 rounded-xl relative  max-w-[120px]">
                            <EditAbleImage link={image} setLink={setImage}/>
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