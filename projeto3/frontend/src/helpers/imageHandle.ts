import { firebaseApp } from "@/app/firebaseConfig"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

export const uploadImageAndReturnUrls= async (files: any) => {
  try {
    const imageRefs = await Promise.all(
      files.map((file: any) => {
        const storage = getStorage(firebaseApp)
        const storageRef = ref(storage, `products/${file.name}`)
        return uploadBytes(storageRef, file)
      })
    )

    const imageUrls = await Promise.all(
      imageRefs.map(async (imageRef) => {
        return await getDownloadURL(imageRef.ref)
      })
    );

    return imageUrls;

  } catch (error: any) {
    console.log(error)
  }
}