import { useState } from "react";
import { updateNewImage } from "../../aggrid/updateNewImage";
import { useForm } from "react-hook-form";

import { useGetTableDataQuery, useUpdateArtistByIdMutation } from "./apiArtists";
import { useDeleteImageMutation, useUpdateImageMutation } from "../../services/apiArtistAvatar";

import { type ArtistData } from "./apiArtists";

import Button from "../../ui/Button";

import toast from "react-hot-toast";
import DefaultAvatar from "../../assets/default-avatar.png";
import { imageFilter } from "../../hooks/imageFilter";

import {
  AvatarContainer,
  AvatarWrapper,
  ButtonContainer,
  ErrorMessage,
  FormContainer,
  HiddenFileInput,
  InputField,
  Label,
  RoundAvatar,
  UploadIcon,
} from "../styles/FormsStyles";

interface FormData {
  name: string;
  facebook: string;
  vk: string;
  spotify: string;
  soundcloud: string;
  instagram: string;
  twitter: string;
}

interface UserFormProps {
  format: string | null;
  currentArtist: ArtistData | null;
  onRequestClose: () => void;
}

function ArtistsForm({ format, currentArtist, onRequestClose }: UserFormProps) {
  const { avatar, name, facebook, vk, spotify, soundcloud, instagram, twitter } = currentArtist ?? {};
  const { refetch } = useGetTableDataQuery();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<string>(avatar || DefaultAvatar);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);
  const [updateImage, { isLoading: isLoadingImage }] = useUpdateImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [updateArtistById, { isLoading }] = useUpdateArtistByIdMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues: { name, facebook, vk, spotify, soundcloud, instagram, twitter },
  });

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && imageFilter(files)) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewAvatar(imageUrl);
      setAvatarFile(file);
      setAvatarChanged(true);
      event.target.value = "";
    }
  }

  async function onSubmit(data: FormData) {
    if (format === "Add") {
      console.log("Entered data:", { ...data, newAvatar });
      reset();
      onRequestClose();
      return;
    }

    if (currentArtist && format === "Edit") {
      if (!isDirty && !avatarChanged) {
        console.log("Нет изменений");
        reset();
        onRequestClose();
        return;
      }

      if (avatarChanged && avatarFile) {
        try {
          await updateNewImage(avatarFile, setNewAvatar, updateImage);

          if (avatar) {
            const fileName = avatar.split("/").pop();

            if (fileName) {
              await deleteImage({ storageName: "artistsAvatars", fileName });
            }
          }
        } catch (error) {
          console.log("Ошибка загрузки нового аватара:", error);
          return;
        }
      }
      const newData: ArtistData = {
        ...currentArtist,
        ...Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value !== currentArtist?.[key as keyof FormData])
        ),
        ...(avatarChanged ? { avatar: newAvatar } : {}),
      };

      if (Object.keys(newData).length) {
        try {
          await updateArtistById({ id: newData.id, newData });
        } catch (error) {
          console.log("Artist data update error: ", error);
          toast.error("Artist data update error");
        }
      }
      toast.success("Artist information updated.");
      reset();
      onRequestClose();
    }
    refetch();
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <AvatarContainer>
        <HiddenFileInput id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarChange} />
        <AvatarWrapper>
          <RoundAvatar onClick={() => document.getElementById("avatarUpload")?.click()} src={newAvatar}>
            <UploadIcon />
          </RoundAvatar>
        </AvatarWrapper>
      </AvatarContainer>

      {["name", "facebook", "vk", "spotify", "soundcloud", "instagram", "twitter"].map((field) => (
        <div key={field}>
          <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
          <InputField
            {...register(field as keyof FormData, {
              required: field === "name" ? `${field} is compulsory` : false,
              pattern:
                field !== "name"
                  ? {
                      value: /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w{2,}(\/.*)?$/,
                      message: `Invalid ${field} URL`,
                    }
                  : undefined,
            })}
            placeholder={`Enter ${field}`}
          />
          {errors[field as keyof FormData] && <ErrorMessage>{errors[field as keyof FormData]?.message}</ErrorMessage>}
        </div>
      ))}

      <ButtonContainer>
        <Button $variations="secondary" $size="medium" type="button" disabled={isLoading} onClick={onRequestClose}>
          Cancel
        </Button>
        <Button $variations="primary" $size="medium" type="submit" disabled={isLoading || isLoadingImage}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default ArtistsForm;
