'use client'
import { useState } from "react";
import { useProfile } from "../../../components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditAbleImage from "@/components/layout/EditAbleImage";
import Left from '@/components/icons/left'
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {



    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [basePrice, setBasePrice] = useState('')
    const [redirectToItems, setRedirectToItems] = useState(false)
    const { loading, data } = useProfile()


    async function handleFormSubmit(e) {
        e.preventDefault()
        const data = { image, name, description, basePrice }
        const savingPromise = new Promise(async (resolve, reject) => {

            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-type': 'application/json' }
            })
            if (response.ok)
                resolve()
            else
                reject()

        })
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error   '
        })
        setRedirectToItems(true)
    }

    if (redirectToItems) {
        return redirect('/menu-items')
    }

    if (loading) {
        return 'Loading user Info...'

    }

    if (!data.admin) {
        return 'Not An Admin'
    }

    return (
        <section className="mt-24">
            <UserTabs isAdmin={true}></UserTabs>
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu item</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div className="grid  items-start gap-4" style={{ gridTemplateColumns: '.3fr .7fr' }}>
                    <div className="">
                        <EditAbleImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label >Item Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label >Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <label >Base Price</label>
                        <input
                            type="text"
                            value={basePrice}
                            onChange={e => setBasePrice(e.target.value)}
                        />
                        <button type="submit">Save</button>
                    </div>

                </div>
            </form>
        </section>
    )

}