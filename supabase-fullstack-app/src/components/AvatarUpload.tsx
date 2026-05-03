"use client";

import { useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AvatarUpload({
  userId,
}: {
  userId: string;
}) {
  const [uploading, setUploading] = useState(false);
  const selectedFileRef = useRef<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const supabase = createClient();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setErrorMessage(null);
    setUploadedUrl(null);
    selectedFileRef.current = file;
    setSelectedFileName(file?.name ?? null);
    setPreviewUrl(null);

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(typeof reader.result === "string" ? reader.result : null);
    };
    reader.onerror = () => {
      setErrorMessage("圖片預覽讀取失敗，但仍可以嘗試上傳。");
    };
    reader.readAsDataURL(file);
  }

  async function uploadAvatar() {
    try {
      setUploading(true);
      setErrorMessage(null);
      setUploadedUrl(null);

      const selectedFile = selectedFileRef.current;

      if (!selectedFile) {
        throw new Error("you must select an image to upload.");
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("請先登入後再上傳頭像。");
      }

      const file = selectedFile;
      const fileExt = file.name.split(".").pop();
      const filePath = `${userId}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 取得公開 url
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setUploadedUrl(data.publicUrl);
      selectedFileRef.current = null;
      setSelectedFileName(null);
      setPreviewUrl(null);
      alert("上傳成功!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error uploading avatar!";
      setErrorMessage(message);
      alert(message);
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-4">
      <label className="block mb-2 font-bold" htmlFor="single">
        {uploading ? "上傳中 ..." : "上傳頭像"}
      </label>
      <input
        type="file"
        id="single"
        accept="image/*"
        onChange={handleFileChange}
        onInput={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      <p className="mt-2 text-sm text-gray-500">
        目前狀態：{selectedFileName ? `已選擇 ${selectedFileName}` : "尚未選擇圖片"}
      </p>
      <div className="mt-4">
        {previewUrl ? (
          <div
            role="img"
            aria-label="頭像預覽"
            className="h-32 w-32 rounded-full border bg-cover bg-center"
            style={{ backgroundImage: `url(${previewUrl})` }}
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full border bg-gray-100 text-sm text-gray-500">
            尚無預覽
          </div>
        )}
        {selectedFileName ? (
          <p className="mt-2 text-sm text-gray-600">
            已選擇：{selectedFileName}
          </p>
        ) : null}
        <button
          type="button"
          onClick={uploadAvatar}
          disabled={uploading || !selectedFileName}
          className="mt-3 rounded bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {uploading ? "上傳中 ..." : "確認上傳"}
        </button>
      </div>
      {uploadedUrl ? (
        <p className="mt-2 text-sm text-green-600">頭像已上傳成功</p>
      ) : null}
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </div>
  );
}
