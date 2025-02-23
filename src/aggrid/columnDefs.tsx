import { ColDef } from "ag-grid-community";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { ICellRendererParams } from "ag-grid-community";

import { type ArtistData } from "../services/apiArtists";

import AgButton from "../ui/AgButton";
import AgLink from "../ui/AgLink";

export const columnDefs: ColDef<ArtistData>[] = [
  {
    headerName: "Actions",
    sortable: false,
    cellStyle: { padding: 0 },
    cellRenderer: (params: ICellRendererParams) => {
      return (
        <div
          style={{
            display: "flex",
            gap: "3px",
            padding: 0,
            alignItems: "center",
            height: "100%",
          }}
        >
          <AgButton
            name="Edit"
            icon={<FaPen />}
            params={params}
            modalChange={params.context?.openModal}
            changeCurrentArtist={params.context?.changeCurrentArtist}
          />
          <AgButton
            name="Delete"
            icon={<FaTrashAlt />}
            params={params}
            modalChange={params.context?.openModal}
            changeCurrentArtist={params.context?.changeCurrentArtist}
          />
        </div>
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
            width: "40x",
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
