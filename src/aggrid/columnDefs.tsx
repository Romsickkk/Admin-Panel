import { ColDef } from "ag-grid-community";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { ICellRendererParams } from "ag-grid-community";

import { type ArtistData } from "../services/apiArtists";

import AgEditButton from "../ui/AgEditButton";
import AgLink from "../ui/AgLink";
import styled from "styled-components";

// Исправление стилей для EditingButtonsDiv
const EditingButtonsDiv = styled.div`
  display: flex;
  gap: 3px;
  padding: 0;
  align-items: center;
  height: 100%;
`;

export const columnDefs: ColDef<ArtistData>[] = [
  {
    headerName: "Actions",
    sortable: false,
    cellStyle: { padding: 0 },
    cellRenderer: (params: ICellRendererParams) => {
      return (
        <EditingButtonsDiv>
          <AgEditButton
            name="Edit"
            icon={<FaPen />}
            params={params}
            modalChange={params.context.openModal}
            changeCurrentArtist={params.context.changeCurrentArtist}
          />
          <AgEditButton
            name="Delete"
            icon={<FaTrashAlt />}
            params={params}
            modalChange={params.context.openModal}
            changeCurrentArtist={params.context.changeCurrentArtist}
          />
        </EditingButtonsDiv>
      );
    },
    width: 135,
    minWidth: 80,
  },
  {
    headerName: "Avatar",
    field: "avatar",
    sortable: false,
    cellRenderer: (params: ICellRendererParams) => {
      return (
        <img
          src={params.value}
          alt="Artist Avatar"
          style={{
            width: "40px", // Исправлено с "40x" на "40px"
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      );
    },
    width: 150,
    minWidth: 80,
  },
  {
    headerName: "Name",
    field: "name",
    flex: 1,
  },

  {
    headerName: "Facebook",
    field: "facebook",
    cellRenderer: (params: ICellRendererParams) => {
      return <AgLink value={params.value} />;
    },
    flex: 1,
  },
  {
    headerName: "VK",
    field: "vk",
    cellRenderer: (params: ICellRendererParams) => {
      return <AgLink value={params.value} />;
    },
    flex: 1,
  },
  {
    headerName: "Spotify",
    field: "spotify",
    cellRenderer: (params: ICellRendererParams) => {
      return <AgLink value={params.value} />;
    },
    flex: 1,
  },
  {
    headerName: "SoundCloud",
    field: "soundcloud",
    cellRenderer: (params: ICellRendererParams) => {
      return <AgLink value={params.value} />;
    },
    resizable: false,
    flex: 1,
  },
];
