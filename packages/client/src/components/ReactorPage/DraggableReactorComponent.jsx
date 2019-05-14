import React, { useCallback } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { updatePosition } from '@/state/reactorComponents';

const handleClassName = '__DraggableReactorComponent__handle';

export const DraggableReactorComponent = ({
  position,
  onPositionChange,
  children,
  componentId,
  ...props
}) => {
  const clonedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      nameClassName: handleClassName,
      nameStyle: { cursor: 'grab' },
    }),
  );

  const onStop = useCallback(
    (e, data) => {
      const { x, y } = data;
      onPositionChange({ x, y });
    },
    [onPositionChange],
  );

  return (
    <Draggable
      handle={`.${handleClassName}`}
      position={position}
      onStop={onStop}
      {...props}
    >
      <div style={{ display: 'inline-block' }}>{clonedChildren}</div>
    </Draggable>
  );
};

export default connect(
  (state, { componentId }) => ({
    position: get(state, ['reactorComponents', 'positions', componentId]) || {
      x: 0,
      y: 0,
    },
  }),
  (dispatch, { componentId }) => ({
    onPositionChange: position =>
      dispatch(updatePosition({ position, id: componentId })),
  }),
)(DraggableReactorComponent);
