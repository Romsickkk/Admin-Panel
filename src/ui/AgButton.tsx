import { ReactNode } from "react";
import { ArtistData } from "../services/apiArtists";
import { ICellRendererParams } from "ag-grid-community";

import styled from "styled-components";

// Styled components для обертки и кнопки
const AgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const DivButton = styled.button`
  background-color: #111827;
  color: white;
  border-radius: 5px;
  padding: 7px 5px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #ff6e1b;
  }

  &:active {
    color: #ff6e1b;
  }

  &:focus {
    color: #ff6e1b;
    outline: 2px solid #ff6e1b;
  }
`;

interface AGButtonProps {
  name: string;
  icon?: ReactNode;
  params: ICellRendererParams;
  modalChange: () => void;
  changeCurrentArtist: (artist: ArtistData) => void;
}

function AGButton({
  name,
  icon,
  params,
  modalChange,
  changeCurrentArtist,
}: AGButtonProps) {
  return (
    <AgDiv>
      <DivButton
        onClick={() => {
          modalChange();
          changeCurrentArtist(params.data);
        }}
      >
        {icon} {name}
      </DivButton>
    </AgDiv>
  );
}

export default AGButton;
