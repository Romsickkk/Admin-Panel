import { type ArtistData } from "./apiArtists";

import ReactModal from "react-modal";
import ArtistsForm from "./ArtistsForm";
import Button from "../../ui/Button";
import styled from "styled-components";

import { type ModalType } from "./ArtistsAgGrid";

interface ModalInterface {
  modalName: ModalType;
  onRequestClose: () => void;
  currentArtist?: ArtistData | null;
}
ReactModal.setAppElement("#root");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
    background: "var(--color-grey-200)",
    zIndex: 1010,
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    color: "#fff",
    border: "none",
  },
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

const WarningText = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ArtistsFormModal({ modalName, onRequestClose, currentArtist }: ModalInterface) {
  const isOpen = !!modalName;

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={`${modalName} Modal`} style={modalStyles}>
      {modalName === "Edit" ? (
        <>
          <p>Edit Artist</p>
          {currentArtist && (
            <ArtistsForm format={modalName} currentArtist={currentArtist} onRequestClose={onRequestClose} />
          )}
        </>
      ) : modalName === "Delete" ? (
        <>
          <WarningText>
            Are you sure to delete artist{" "}
            <span style={{ color: "#FF6E1B", margin: "0 5px" }}>{currentArtist?.name}</span> ?
          </WarningText>

          <ButtonContainer>
            <Button $variations="secondary" $size="medium" onClick={onRequestClose}>
              Cancel
            </Button>
            <Button $variations="danger" $size="medium" onClick={onRequestClose}>
              Delete
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <>
          <p>Add Artist</p>

          <ArtistsForm format={modalName} currentArtist={null} onRequestClose={onRequestClose} />
        </>
      )}
    </ReactModal>
  );
}
export default ArtistsFormModal;
