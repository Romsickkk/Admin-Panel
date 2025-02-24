import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ArtistData } from "../services/apiArtists";
import Button from "../ui/Button";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
  background: #1f2937; /* Это оставляем фоном */
  border-radius: 8px;
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
    border-color: #ff6e1b; /* При фокусе меняем цвет рамки */
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

interface FormData {
  name: string;
  facebook: string;
  vk: string;
  spotify: string;
  soundcloud: string;
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

interface UserFormProps {
  format: string | null;
  currentArtist?: ArtistData;
  onRequestClose: () => void;
}

function UserForm({ format, currentArtist, onRequestClose }: UserFormProps) {
  const { name, facebook, vk, spotify, soundcloud } = currentArtist ?? {};
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },

    reset,
  } = useForm<FormData>({
    defaultValues: {
      name,
      facebook,
      vk,
      spotify,
      soundcloud,
    },
  });

  function onSubmit(data: FormData) {
    if (format === "Add") {
      return;
    }

    if (isDirty && currentArtist) {
      const isDataChanged = Object.keys(data).some((key) => {
        const typedKey = key as keyof FormData;

        return data[typedKey] !== currentArtist[typedKey];
      });

      if (isDataChanged) {
        console.log("Entered data:", data);
      } else {
        console.log("No changes detected");
      }
    }

    reset();
    onRequestClose();
  }

  function onCencel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    reset();
    onRequestClose();
  }
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Имя</Label>
        <InputField
          {...register("name", { required: "Name is compulsory" })}
          placeholder="Enter name"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div>
        <Label>Facebook</Label>
        <InputField
          {...register("facebook", { required: "Facebook is compulsory" })}
          placeholder="Enter Facebook"
        />
        {errors.facebook && (
          <ErrorMessage>{errors.facebook.message}</ErrorMessage>
        )}
      </div>

      <div>
        <Label>VK</Label>
        <InputField
          {...register("vk", { required: "VK is compulsory" })}
          placeholder="Enter VK"
        />
        {errors.vk && <ErrorMessage>{errors.vk.message}</ErrorMessage>}
      </div>

      {/* Spotify */}
      <div>
        <Label>Spotify</Label>
        <InputField
          {...register("spotify", { required: "Spotify is compulsory" })}
          placeholder="Enter Spotify"
        />
        {errors.spotify && (
          <ErrorMessage>{errors.spotify.message}</ErrorMessage>
        )}
      </div>

      <div>
        <Label>SoundCloud</Label>
        <InputField
          {...register("soundcloud", { required: "SoundCloud is compulsory" })}
          placeholder="Enter SoundCloud"
        />
        {errors.soundcloud && (
          <ErrorMessage>{errors.soundcloud.message}</ErrorMessage>
        )}
      </div>

      <ButtonContainer>
        <Button
          $variations="secondary"
          $size="medium"
          type="button"
          onClick={onCencel}
        >
          Cancel
        </Button>
        <Button $variations="primary" $size="medium" type="submit">
          {format} Artist
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default UserForm;
