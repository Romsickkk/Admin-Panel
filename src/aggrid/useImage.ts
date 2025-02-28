import toast from "react-hot-toast";
import supabase from "../services/supabase";

export async function useImage(file: File, setNewAvatar: (url: string) => void, updateImage: any) {
  const fileName = `${crypto.randomUUID()}_${file.name}`;
  const { data, error } = await supabase.storage.from("artistsAvatars").upload(fileName, file);

  if (error) {
    toast.error(`Image upload error:  ${error.message}`);
    throw new Error(error.message);
  }

  const imageUrl = `${supabase.storage.from("artistsAvatars").getPublicUrl(fileName).data.publicUrl}`;

  await updateImage({ avatar: imageUrl });
  setNewAvatar(imageUrl);
}
