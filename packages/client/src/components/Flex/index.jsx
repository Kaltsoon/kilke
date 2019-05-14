import styled from 'styled-components';
import FlexBase, { FlexItem as FlexItemBase } from 'styled-flex-component';

import { getSpacingStyles } from '@/theme';

export const Flex = styled(FlexBase)`
  ${getSpacingStyles}
`;

export const FlexItem = styled(FlexItemBase)`
  ${getSpacingStyles}
`;

export default Flex;
