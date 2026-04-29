'use client';
import { useState } from 'react'
import Image from 'next/image'

export default function UploadPage() {
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const fileInput = form.querySelector<HTMLInputElement>('input[type="file"]');
        const file = fileInput?.files?.[0];

        if (!file) {
            setError('請選擇一個檔案');
            return;
        }

        // 只允許圖片檔案
        if (!file.type.startsWith('image/')) {
            setError('只接受圖片檔案（jpg, png, webp 等）');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            // 把檔案直接用 fetch 傳送到 Route Handler
            // 不使用 FormData，而是把 file 作為 body 直接傳（更簡單、更快）
            const response = await fetch(
                `/api/upload?filename=${encodeURIComponent(file.name)}`,
                {
                    method: 'POST',
                    body: file,  // 直接傳 File 物件
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error ?? '上傳失敗');
            }

            const data = await response.json();
            setUploadedUrl(data.url);  // 儲存上傳後的公開 URL
        } catch (err) {
            setError(err instanceof Error ? err.message : '上傳時發生未知錯誤');
        } finally {
            setUploading(false);
        }

    }

    return (
        <main className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">上傳大頭照</h1>

            <form onSubmit={handleUpload} className="space-y-4">
                <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm border rounded p-2"
                />
                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {uploading ? '上傳中...' : '上傳圖片'}
                </button>
            </form>

            {error && (
                <p className="mt-4 text-red-600 text-sm">{error}</p>
            )}

            {uploadedUrl && (
                <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">✅ 上傳成功！</p>

                    {/* 用 Image 元件顯示上傳的圖片（自動優化） */}
                    <div className="relative w-32 h-32">
                        <Image
                            src={uploadedUrl}
                            alt="上傳的大頭照"
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>

                    {/* 顯示公開 URL，讓學生複製 */}
                    <p className="mt-2 text-xs text-gray-500 break-all">
                        URL：{uploadedUrl}
                    </p>
                </div>
            )}
        </main>
    )

}