'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile"
import toast from "react-hot-toast";

const Page = () => {

    const [categoryName, setCategoryName] = useState()
    const [categories, setCategories] = useState([])
    const { loading: profileLoading, data: profileData } = useProfile()
    const [editedCategory, setEditedCategory] = useState(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault()
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName }
            if (editedCategory) {
                data._id = editedCategory._id
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            setCategoryName('')
            fetchCategories()
            setEditedCategory(null)
            if (response.ok)
                resolve()
            else
                reject()
        })
        await toast.promise(creationPromise, {
            loading: editedCategory
                ? 'Updating Category'
                : 'Creating your new category...',
            success: editedCategory ? 'Category Updated' : 'Category Created',
            error: 'Failed to create the category. Please try again.'
        })
    }

    if (profileLoading) {
        return 'Loading Info'
    }
    if (!profileData.admin) {
        return "Not An Admin "
    }
    return (
        <section className="mt-24 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label >
                            {editedCategory ? 'Update category' : 'New category name'}
                            {
                                editedCategory && (
                                    <>
                                        : <b> {editedCategory.name}</b>
                                    </>
                                )
                            }
                        </label>
                        <input type="text"
                            onChange={e => setCategoryName(e.target.value)}
                            value={categoryName} />
                    </div>
                    <div className="pb-3">
                        <button className="border border-primary" type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </form>

            <div>
                <h2 className="mt-8 text-sm text-gray-500">Edit Category:</h2>
                {categories?.length > 0 && categories.map((c, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setEditedCategory(c);
                            setCategoryName(c.name)
                        }}
                        className="bg-gray-200 cursor-pointer rounded-xl p-2 px-4 mb-1 flex gap-2">

                        {c.name}
                    </button>
                ))}
            </div>

        </section>
    );
};

export default Page;