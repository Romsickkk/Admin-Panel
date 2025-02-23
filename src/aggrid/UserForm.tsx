import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ArtistData } from "../services/apiArtists";

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

const SubmitButton = styled.button`
  padding: 0.8rem;
  background: #4f46e5;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #4338ca;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

interface FormData {
  name: string;
  facebook: string;
  vk: string;
  spotify: string;
  soundcloud: string;
}
interface UserFormProps {
  currentArtist: ArtistData;
}

function UserForm({ currentArtist }: UserFormProps) {
  const { name, facebook, vk, spotify, soundcloud } = currentArtist;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name,
      facebook,
      vk,
      spotify,
      soundcloud,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Entered data:", data);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Имя</Label>
        <InputField
          {...register("name", { required: "Имя is compulsory" })}
          placeholder="Enter имя"
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

      <SubmitButton type="submit">Submit</SubmitButton>
    </FormContainer>
  );
}

export default UserForm;
