import { useState } from "react";
import { useArtistsColumnDefs } from "./useArtistsColumnDefs";
import { AgGridReact } from "ag-grid-react";
import { type ArtistData, useGetTableDataQuery } from "./apiArtists";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";

import Spinner from "../../ui/Spinner";
import ArtistsFormModal from "./ArtistsFormModal";
import AgGridWrapper from "../../ui/AgGridWrapper";
import AddButton from "../../ui/AddButton";

export type ModalType = "Edit" | "Delete" | "Add" | null;

function ArtistsAgGrid() {
  const { data, error, isLoading, refetch } = useGetTableDataQuery();
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
  const [currentArtist, setCurrentArtist] = useState<ArtistData | null>(null);
  const aritstsColumnDefs = useArtistsColumnDefs();

  function openModal(modalName: ModalType) {
    setCurrentModal(modalName);
  }

  function closeModal() {
    setCurrentModal(null);
    setCurrentArtist(null);
  }

  if (isLoading) return <Spinner />;

  if (error) {
    const errorMessage = (error as { message: string }).message || "An unknown error occurred";
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <AddButton changeModal={openModal} name="Artist" />
      </div>

      <AgGridWrapper className="ag-theme-alpine-dark">
        <AgGridReact
          columnDefs={aritstsColumnDefs}
          defaultColDef={{
            filter: true,
            floatingFilter: true,
          }}
          rowData={data}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={false}
          context={{
            openModal,
            changeCurrentData: (artist: ArtistData) => setCurrentArtist(artist),
          }}
          modules={[PaginationModule, CellStyleModule, ClientSideRowModelModule, ValidationModule, TextFilterModule]}
        />
      </AgGridWrapper>

      <ArtistsFormModal modalName={currentModal} onRequestClose={closeModal} currentArtist={currentArtist} />
      <button onClick={() => refetch()} style={{ padding: "0.5rem 1rem", borderRadius: "8px" }}>
        Refetch
      </button>
    </div>
  );
}

export default ArtistsAgGrid;
