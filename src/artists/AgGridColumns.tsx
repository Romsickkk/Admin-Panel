import { useState } from "react";
import { useColumnDefs } from "./useColumnDefs";
import { AgGridReact } from "ag-grid-react";
import { type ArtistData, useGetTableDataQuery } from "./apiArtists";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";

import Spinner from "../ui/Spiner";
import AgFormModal from "./AgFormModal";
import AgGridWrapper from "../ui/AgGridWrapper";
import AddArtistButton from "../ui/AddArtistButton";

export type ModalType = "Edit" | "Delete" | "Add" | null;

function AgGridComponent() {
  const { data, error, isLoading, refetch } = useGetTableDataQuery();
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
  const [currentArtist, setCurrentArtist] = useState<ArtistData | null>(null);
  const columnDefs = useColumnDefs();

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
        <AddArtistButton changeModal={openModal} />
      </div>

      <AgGridWrapper className="ag-theme-alpine-dark">
        <AgGridReact
          columnDefs={columnDefs}
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
            changeCurrentArtist: (artist: ArtistData) => setCurrentArtist(artist),
          }}
          modules={[PaginationModule, CellStyleModule, ClientSideRowModelModule, ValidationModule, TextFilterModule]}
        />
      </AgGridWrapper>

      <AgFormModal modalName={currentModal} onRequestClose={closeModal} currentArtist={currentArtist} />
      <button onClick={() => refetch()} style={{ padding: "0.5rem 1rem", borderRadius: "8px" }}>
        Refetch
      </button>
    </div>
  );
}

export default AgGridComponent;
