import styled from "styled-components";

const AgGridWrapper = styled.div`
  height: 400px;
  width: 100%;
  background-color: #1f2937;
  color: #ffffff;

  &.ag-theme-alpine-dark {
    --ag-background-color: #102a3f;
    --ag-foreground-color: #ffffff;
    --ag-header-background-color: #1a1a1a;
    --ag-row-hover-color: #1a1a1a;
    --ag-border-color: #333333;
    --ag-secondary-border-color: #333333;

    --ag-cell-background-color: #006aff;

    --ag-odd-row-background-color: #1b2738;
  }
`;

export default AgGridWrapper;
