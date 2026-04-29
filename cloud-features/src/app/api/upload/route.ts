import {put} from '@vercel/blob'

export async function POST(request:Request){
    const {searchParams} = new URL(request.url);
    const filename = searchParams.get('filename')

    if (!filename){
        return Response.json({ error: '沒有上傳檔案'}, {status: 400})
    }

    if (!request.body){
        return Response.json({error: '沒有上傳檔案'}, { status: 400})
    }

    const blob = await put(filename, request.body, {
        access: 'public'
    })

    return Response.json({
        url: blob.url,
        pathname: blob.pathname
    })

}