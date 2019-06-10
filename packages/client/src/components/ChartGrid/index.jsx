import styled from 'styled-components';

import { spacing } from '@/theme';

const ChartGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  padding: ${spacing(1.5)};
`;

export const ChartGridItem = styled.div`
  width: 33.33%;
  box-sizing: border-box;
  padding: ${spacing(1.5)};
`;

export default ChartGrid;
