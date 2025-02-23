import ReactModal from "react-modal";
import UserForm from "../aggrid/UserForm";
import { ArtistData } from "../services/apiArtists";

interface ModalInterface {
  isOpen: boolean;
  onRequestClose: () => void;
  currentArtist: ArtistData | null;
  setCurrentArtist: (artist: ArtistData | null) => void;
  onModalClose?: () => void; // Функция, которую ты хочешь выполнить
}

ReactModal.setAppElement("#root");

function AgModal({
  isOpen,
  onRequestClose,
  currentArtist,
  setCurrentArtist,
  onModalClose,
}: ModalInterface) {
  function onClose() {
    onRequestClose();
    setCurrentArtist(null);

    if (onModalClose) {
      onModalClose();
    }
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose} // Передаем onClose, который уже выполняет нужные действия
      contentLabel="Example Modal"
      style={{
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
          background: "#1F2937",
          zIndex: 1010,
        },
      }}
    >
      <p>Name</p>
      {currentArtist && <UserForm currentArtist={currentArtist} />}
      <button onClick={onClose}>Close</button>
    </ReactModal>
  );
}

export default AgModal;
