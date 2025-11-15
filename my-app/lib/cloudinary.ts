export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary env not set: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET")
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  const fd = new FormData()
  fd.append("file", file)
  fd.append("upload_preset", uploadPreset)

  const res = await fetch(url, { method: "POST", body: fd })
  const json = await res.json()
  if (!res.ok) {
    const msg = json?.error?.message || "Cloudinary upload failed"
    throw new Error(msg)
  }
  return json.secure_url as string
}
