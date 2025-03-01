import { useState } from "react";
import { updateNewImage } from "./updateNewImage";
import { useForm } from "react-hook-form";
import { LuImagePlus } from "react-icons/lu";
import { useUpdateArtistByIdMutation } from "../services/apiArtist";
import { useDeleteImageMutation, useUpdateImageMutation } from "../services/apiArtistAvatar";

import { type ArtistData } from "../artists/apiArtists";

import Button from "../ui/Button";
import styled from "styled-components";
import toast from "react-hot-toast";
import DefaultAvatar from "../assets/default-avatar.png";
import { imageFilter } from "../hooks/imageFilter";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
  background: #1f2937;
  border-radius: 8px;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover svg {
    color: #ff6e1b;
  }
`;

const UploadIcon = styled(LuImagePlus)`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 4px;
  color: white;
  font-size: 25px;
`;

const RoundAvatar = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: url(${(props) => props.src}) center/cover no-repeat;
  border: 2px solid #ff6e1b;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const InputField = styled.input`
  padding: 0.8rem;
  border: 1px solid #4b5563;
  border-radius: 8px;
  background: #374151;
  color: white;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #ff6e1b;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #e5e7eb;
`;

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: #ef4444;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

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

function UserForm({ format, currentArtist, onRequestClose }: UserFormProps) {
  const { avatar, name, facebook, vk, spotify, soundcloud, instagram, twitter } = currentArtist ?? {};
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<string>(avatar || DefaultAvatar);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);
  const [updateImage, { isLoading }] = useUpdateImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [updateArtistById] = useUpdateArtistByIdMutation();

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
              console.log("ПОЛНОЕ ИМЯ", fileName);
              console.log("БЕЗ ИЗМЕНЕНИЙ", avatar);
            }
          }
        } catch (error) {
          console.log("Ошибка загрузки нового аватара:", error);
          return;
        }
      }
      const newData = {
        id: currentArtist.id,
        name: currentArtist.name,
        ...Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value !== currentArtist?.[key as keyof FormData])
        ),
        ...(avatarChanged ? { avatar: newAvatar } : {}),
      };

      if (Object.keys(newData).length) {
        console.log("Datas changed:", newData);

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
            {...register(field as keyof FormData, { required: `${field} is compulsory` })}
            placeholder={`Enter ${field}`}
          />
          {errors[field as keyof FormData] && <ErrorMessage>{errors[field as keyof FormData]?.message}</ErrorMessage>}
        </div>
      ))}

      <ButtonContainer>
        <Button $variations="secondary" $size="medium" type="button" disabled={isLoading} onClick={onRequestClose}>
          Cancel
        </Button>
        <Button $variations="primary" $size="medium" type="submit">
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default UserForm;
