import React, { useRef } from 'react';
import styled from 'styled-components';

import DraggableReactorComponent from './DraggableReactorComponent';

const Bounds = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ReactorLayout = ({ children }) => {
  const boundsRef = useRef();

  const wrappedChildren = React.Children.map(children, child => (
    <DraggableReactorComponent
      offsetParent={boundsRef.current}
      bounds="parent"
      axis="both"
      componentId={child.props.componentId}
    >
      {child}
    </DraggableReactorComponent>
  ));

  return <Bounds ref={boundsRef}>{wrappedChildren}</Bounds>;
};

export default ReactorLayout;
