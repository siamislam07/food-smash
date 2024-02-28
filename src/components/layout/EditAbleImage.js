import Image from "next/image";
import toast from "react-hot-toast";

export default function EditAbleImage({ link, setLink }){

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
                    setLink(link?.imageUrl);

                }
            })

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Uploading Complete',
                error: 'Upload error'
            })
        }
    }

    return (
        <>
            {link && (
                <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt="userImage" />

            )}
            {!link &&(
                <div className="bg-gray-200 text-center p-4 text-gray-500 rounded-lg mb-1">
                    No Image
                </div>
            )}
            <label >
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <span className="border border-gray-300 cursor-pointer rounded-lg p-2 text-center block ">Edit</span>
            </label>
        </>
    )
}