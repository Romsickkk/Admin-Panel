import { useState } from "react";
import { columnDefs } from "../aggrid/columnDefs";
import { AgGridReact } from "ag-grid-react";
import { ArtistData, useGetTableDataQuery } from "../services/apiArtists";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  ValidationModule,
} from "ag-grid-community";

import Spinner from "./Spiner";
import AgFormModal from "./AgFormModal";
import AgGridWrapper from "./AgGridWrapper";
import AddArtistButton from "./AddArtistButton";

export type ModalType = "Edit" | "Delete" | "Add" | null;

function AgGridComponent() {
  const { data, error, isLoading, refetch } = useGetTableDataQuery();
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
  const [currentArtist, setCurrentArtist] = useState<ArtistData | null>(null);

  function openModal(modalName: ModalType) {
    setCurrentModal(modalName);
  }

  function closeModal() {
    setCurrentModal(null);
    setCurrentArtist(null);
  }

  if (isLoading) return <Spinner />;

  if (error) {
    const errorMessage =
      (error as { message: string }).message || "An unknown error occurred";
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <AddArtistButton changeModal={openModal} />
      </div>

      <AgGridWrapper className="ag-theme-alpine-dark">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={data}
          context={{
            openModal,
            changeCurrentArtist: (artist: ArtistData) =>
              setCurrentArtist(artist),
          }}
          modules={[
            CellStyleModule,
            ClientSideRowModelModule,
            ValidationModule,
          ]}
        />
      </AgGridWrapper>

      <AgFormModal
        modalName={currentModal}
        onRequestClose={closeModal}
        currentArtist={currentArtist}
      />
      <button
        onClick={() => refetch()}
        style={{ padding: "0.5rem 1rem", borderRadius: "8px" }}
      >
        Refetch
      </button>
    </div>
  );
}

export default AgGridComponent;
