import Image from 'next/image'

export default function LocalImagePage(){
    return (
        <main className='p-8'>
            <h1 className="text-2xl font-bold mb-4">我的個人頁面</h1>
            <Image
                src="/avatar.png"
                alt="大頭照"
                width={200}
                height={200}
                className="rounded-full"
                priority
            />
        </main>
    )
}