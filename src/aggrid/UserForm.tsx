import { useState } from "react";
import { useForm } from "react-hook-form";
import { type ArtistData } from "../artists/apiArtists";
import Button from "../ui/Button";
import styled from "styled-components";
import { LuImagePlus } from "react-icons/lu";
import DefaultAvatar from "../assets/default-avatar.png";

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
}

interface UserFormProps {
  format: string | null;
  currentArtist?: ArtistData;
  onRequestClose: () => void;
}

function UserForm({ format, currentArtist, onRequestClose }: UserFormProps) {
  const { name, facebook, vk, spotify, soundcloud } = currentArtist ?? {};
  const [avatar, setAvatar] = useState<string>(currentArtist?.avatar || DefaultAvatar);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues: { name, facebook, vk, spotify, soundcloud },
  });

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      setAvatarChanged(true);
    }
    event.target.value = "";
  }

  function onSubmit(data: FormData) {
    if (format === "Add") {
      console.log("Entered data:", { ...data, avatar });
      reset();
      onRequestClose();
      return;
    }

    if (!isDirty && !avatarChanged) {
      console.log("Нет изменений");
      reset();
      onRequestClose();
      return;
    }

    const changes = {
      ...Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== currentArtist?.[key as keyof FormData])
      ),
      ...(avatarChanged && { avatar }),
    };

    if (Object.keys(changes).length) {
      console.log("Измененные данные:", changes);
    }

    reset();
    onRequestClose();
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <AvatarContainer>
        <HiddenFileInput id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarChange} />
        <AvatarWrapper onClick={() => document.getElementById("avatarUpload")?.click()}>
          <RoundAvatar src={avatar}>
            <UploadIcon />
          </RoundAvatar>
        </AvatarWrapper>
      </AvatarContainer>

      {["name", "facebook", "vk", "spotify", "soundcloud"].map((field) => (
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
        <Button $variations="secondary" $size="medium" type="button" onClick={onRequestClose}>
          Cancel
        </Button>
        <Button $variations="primary" $size="medium" type="submit">
          Save
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default UserForm;
