import styled from "styled-components";
import { LuImagePlus } from "react-icons/lu";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
  background: #1f2937;
  border-radius: 8px;
  color: var(--color-grey-0);
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const AvatarWrapper = styled.div`
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

export const UploadIcon = styled(LuImagePlus)`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 4px;

  font-size: 25px;
`;

export const RoundAvatar = styled.div<{ src: string }>`
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

export const InputField = styled.input`
  padding: 0.8rem;
  border: 1px solid #4b5563;
  border-radius: 8px;
  background: #374151;

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

export const Label = styled.label`
  font-size: 1rem;
  color: #e5e7eb;
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: #ef4444;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;
