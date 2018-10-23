import styled from 'styled-components';

const ChartGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.unit * 0.5}px;
`;

export const ChartGridItem = styled.div`
  width: 33.33%;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.unit * 0.5}px;
`;

export default ChartGrid;
