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
import AgModal from "./AgModal";
import AgGridWrapper from "./AgGridWrapper";

function AgGridComponent() {
  const { data, error, isLoading, refetch } = useGetTableDataQuery();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentArtist, setCurrentArtist] = useState<ArtistData | null>(null);
  console.log(currentArtist);

  if (isLoading) return <Spinner />;

  if (error) {
    const errorMessage =
      (error as { message: string }).message || "An unknown error occurred";
    return <p>{errorMessage}</p>;
  }

  function openEditModal() {
    setModalOpen(true);
  }

  function closeEditModal() {
    setModalOpen(false);
  }

  function changeCurrentArtist(artist: ArtistData | null): void {
    setCurrentArtist(artist);
  }

  return (
    <>
      <AgGridWrapper className="ag-theme-alpine-dark">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={data}
          context={{ openEditModal, changeCurrentArtist }}
          modules={[
            CellStyleModule,
            ClientSideRowModelModule,
            ValidationModule,
          ]}
        />
      </AgGridWrapper>
      <button onClick={() => refetch()}>Refetch</button>

      <AgModal
        isOpen={modalOpen}
        onRequestClose={closeEditModal}
        currentArtist={currentArtist}
        setCurrentArtist={setCurrentArtist}
      />
    </>
  );
}

export default AgGridComponent;
