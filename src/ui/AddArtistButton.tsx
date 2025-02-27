import { FaUserPlus } from "react-icons/fa";

import { type ModalType } from "../artists/AgGridColumns";

import Button from "./Button";

interface AddArtistButtonProps {
  changeModal: (modalName: ModalType) => void;
}
function AddArtistButton({ changeModal }: AddArtistButtonProps) {
  function handleSubmit() {
    changeModal("Add");
  }
  return (
    <Button $size="medium" $variations="secondary" onClick={handleSubmit}>
      <FaUserPlus /> Add Artist
    </Button>
  );
}

export default AddArtistButton;
