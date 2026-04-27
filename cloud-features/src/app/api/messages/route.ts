const messages: {id: number; text:string; createdAt: string}[] = [];
let nextId = 1

export async function GET(){
    return Response.json({messages})
}

export async function POST(request:Request){
    const body = await request.json()

    if(!body.text || typeof body.text !== 'string'){
        return Response.json(
            { error: '缺少text欄位'},
            { status: 400},
        )
    }

    const newMessage = {
        id: nextId++,
        text: body.text,
        createdAt: new Date().toISOString(),
    }

    messages.push(newMessage);

    return Response.json(newMessage, {status:201}) // 201 Created
}