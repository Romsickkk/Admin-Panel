import { useState } from "react";

import { LuImagePlus } from "react-icons/lu";
import { imageFilter } from "../../hooks/imageFilter";

import { Controller, useForm } from "react-hook-form";
// import { useUpdateReleasesByNameMutation } from "./apiReleases";
// import { useDeleteImageMutation, useUpdateImageMutation } from "../../services/apiReleasesAvatar";

import { useUpdateReleasesByNameMutation, type ReleasesData } from "./apiReleases";

import toast from "react-hot-toast";
import Button from "../../ui/Button";
import Select from "react-select";

import styled from "styled-components";
import makeAnimated from "react-select/animated";
import useSelectData from "../../ui/useSelectData";
import DefaultAvatar from "../../assets/default-avatar.png";
import { selectStyles } from "../../ui/selectStyles";

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
  owners: string;
  cygnus: string;
}

interface UserFormProps {
  format: string | null;
  currentReleases: ReleasesData | null;
  onRequestClose: () => void;
}

function ReleasesForm({ format, currentReleases, onRequestClose }: UserFormProps) {
  const { avatar, name, owners, cygnus } = currentReleases ?? {};
  // const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<string>(avatar || DefaultAvatar);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);
  const [updateReleasesByName, { isLoading }] = useUpdateReleasesByNameMutation();
  const animatedComponents = makeAnimated();
  const { artistsNames, isLoading: isSelectLoading } = useSelectData();

  console.log(artistsNames);

  const {
    control,

    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues: { name, owners, cygnus },
  });

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && imageFilter(files)) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewAvatar(imageUrl);
      // setAvatarFile(file);
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

    if (currentReleases && format === "Edit") {
      if (!isDirty && !avatarChanged) {
        console.log("Нет изменений");
        reset();
        onRequestClose();
        return;
      }

      const newData = {
        ...currentReleases,
        ...Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value !== currentReleases?.[key as keyof FormData])
        ),
        ...(avatarChanged ? { avatar: newAvatar } : {}),
      };

      if (Object.keys(newData).length) {
        console.log("Datas changed:", newData);

        try {
          await updateReleasesByName({ name: newData.name, newData });
        } catch (error) {
          console.log("Releases data update error: ", error);
          toast.error("Releases data update error");
        }
      }
      toast.success("Releases information updated.");
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
      <div>
        <Label>Owner(s)</Label>
        <Controller
          name="owners"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={artistsNames}
              styles={selectStyles}
              isLoading={isSelectLoading}
              isSearchable={true}
              isMulti
              onMenuOpen={() => console.log("Menu opened")}
              onInputChange={(newValue) => console.log(newValue)}
            />
          )}
        />

        {/* Добавляем отображение ошибок */}
        {errors.owners && <ErrorMessage>{errors.owners.message}</ErrorMessage>}
      </div>

      {["name", "cygnus"].map((field) => (
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
        <Button $variations="primary" $size="medium" type="submit">
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default ReleasesForm;
