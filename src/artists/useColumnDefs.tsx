import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { ICellRendererParams } from "ag-grid-community";

import { type ArtistData } from "./apiArtists";

import DefaultAvatar from "../assets/default-avatar.png";
import AgEditButton from "../ui/AgEditButton";
import AgLink from "../ui/AgLink";
import styled from "styled-components";
import RoundAvatar from "../ui/RoundAvatar";

const EditingButtonsDiv = styled.div`
  display: flex;
  gap: 3px;
  padding: 0;
  align-items: center;
  height: 100%;
`;

export const useColumnDefs = () => {
  return useMemo<ColDef<ArtistData>[]>(
    () => [
      {
        headerName: "Actions",
        sortable: false,
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams) => (
          <EditingButtonsDiv>
            <AgEditButton
              name="Delete"
              icon={<FaTrashAlt />}
              params={params}
              modalChange={params.context.openModal}
              changeCurrentArtist={params.context.changeCurrentArtist}
            />
            <AgEditButton
              name="Edit"
              icon={<FaPen />}
              params={params}
              modalChange={params.context.openModal}
              changeCurrentArtist={params.context.changeCurrentArtist}
            />
          </EditingButtonsDiv>
        ),
        width: 10,
        minWidth: 80,
        filter: false,
        floatingFilter: false,
      },
      {
        headerName: "Avatar",
        field: "avatar",
        sortable: false,
        cellRenderer: (params: ICellRendererParams) => (
          <RoundAvatar src={params.value ? params.value : DefaultAvatar} alt={`${params.data.name} Avatar`} />
        ),
        width: 100,
        minWidth: 80,
        filter: false,
        floatingFilter: false,
      },
      {
        headerName: "Name",
        field: "name",
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          defaultOption: "contains",
          suppressFilterButton: true,
          maxNumConditions: 1,
          suppressAndOrCondition: true,
        },
      },

      {
        headerName: "Facebook",
        field: "facebook",
        cellRenderer: (params: ICellRendererParams) => <AgLink value={params.value} />,
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          defaultOption: "contains",
          suppressFilterButton: true,
          maxNumConditions: 1,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "VK",
        field: "vk",
        cellRenderer: (params: ICellRendererParams) => <AgLink value={params.value} />,
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          defaultOption: "contains",
          suppressFilterButton: true,
          maxNumConditions: 1,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "Spotify",
        field: "spotify",
        cellRenderer: (params: ICellRendererParams) => <AgLink value={params.value} />,
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          defaultOption: "contains",
          suppressFilterButton: true,
          maxNumConditions: 1,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "SoundCloud",
        field: "soundcloud",
        cellRenderer: (params: ICellRendererParams) => <AgLink value={params.value} />,
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          defaultOption: "contains",
          suppressFilterButton: true,
          maxNumConditions: 1,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "Instagram",
        field: "instagram",
        cellRenderer: (params: ICellRendererParams) => <AgLink value={params.value} />,
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          defaultOption: "contains",
          suppressFilterButton: true,
          maxNumConditions: 1,
          suppressAndOrCondition: true,
        },
      },
      {
        headerName: "Twitter",
        field: "twitter",
        cellRenderer: (params: ICellRendererParams) => <AgLink value={params.value} />,
        resizable: false,
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: ["contains"],
          defaultOption: "contains",
          suppressFilterButton: true,
          maxNumConditions: 1,
          suppressAndOrCondition: true,
        },
      },
    ],
    []
  );
};
