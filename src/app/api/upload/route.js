import { error } from 'console'
import uniqid from 'uniqid'


const image_hosting_key = process.env.IMGBB_API_KEY
// console.log(image_hosting_key);

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
export async function POST(req) {
    const data = await req.formData()

    if (data.get('file')) {
        try {
            // upload the file
            const file = data.get('file')

            const ext = file.name.split('.').slice(-1)[0];
            const newFileName = uniqid() + '.' + ext
            console.log(newFileName);

            const formData = new FormData()
            formData.append('image', file, newFileName)

            const response = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                const responseBody = await response.json()
                const imageUrl = responseBody.data.url
                console.log('image uploaded successfully url:', imageUrl);

                return new Response(JSON.stringify({ success: true, imageUrl }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            else {
                console.error('Error uploading image to ImgBB:', response.statusText);
                return new Response(JSON.stringify({ error: 'Image upload failed' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        catch (error) {
            console.error('Error handling file upload:', error);
            return new Response(JSON.stringify({ error: 'Internal server error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

    } 
    else {
        console.log('No file provided');
        return new Response(JSON.stringify({ error: 'No file provided' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    // console.log(data);
    // return Response.json(true)
}