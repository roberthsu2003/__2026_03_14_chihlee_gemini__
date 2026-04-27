import Image from 'next/image'

export default function ImageDemoPage(){
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-8">圖片優化比較</h1>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2 className="font-semibold mb-2">❌ 普通 img 標籤</h2>
                    <img 
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                        alt="風景照"
                        className='w-full rounded'
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        無 Lazy Load、無格式轉換、無尺寸優化
                    </p>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">✅ Next.js Image 元件</h2>
                    <div className='relative w-full aspect-video'>
                        <Image
                            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                            alt="風景照"
                            fill
                            className="object-cover rounded"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        自動 WebP、Lazy Load、響應式尺寸
                    </p>
                </div>
            </div>
        </main>
    )
}