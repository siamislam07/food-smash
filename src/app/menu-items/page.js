'use client'
import EditAbleImage from "@/components/layout/EditAbleImage"
import UserTabs from "@/components/layout/UserTabs"
import { useProfile } from "@/components/UseProfile"
import { useState } from "react"
import toast from "react-hot-toast"

export default function MenuItemsPage() {

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [basePrice, setBasePrice] = useState('')
    const { loading, data } = useProfile()


    async function handleFormSubmit(e) {
        e.preventDefault()
        const data = { image, name, description, basePrice }
        const savingPromise = new Promise(async (resolve, reject) => {

            const response = fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-type': 'application/json' }
            })
            if (response.ok)
                resolve()
            else
                reject()

        })
        await toast.promise(savingPromise,{
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error   '
        })
    }

    if (loading) {
        return 'Loading User Info...'
    }

    if (!data.admin) {
        return "Not An Admin"
    }
    return (
        <section className="mt-24">
            <UserTabs isAdmin={true}></UserTabs>
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