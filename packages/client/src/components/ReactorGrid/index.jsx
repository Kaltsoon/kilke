import React from 'react';
import styled from 'styled-components';

const ReactorGridBase = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.unit}px;
`;

export const ReactorGridItemBase = styled.div`
  width: 20%;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.unit}px;
  min-height: 4rem;
`;

export const ReactorGridItem = ({ children }) => {
  return <div>{children}</div>;
};

const ReactorGrid = ({ width = 5, height = 5, children }) => {
  const childrenArr = React.Children.toArray(children);

  return (
    <ReactorGridBase>
      {[...new Array(width * height)].map((v, i) => {
        const y = Math.floor(i / height);
        const x = i % width;

        const child =
          childrenArr.find(({ props }) => {
            return props.x === x && props.y === y;
          }) || null;

        return <ReactorGridItemBase>{child}</ReactorGridItemBase>;
      })}
    </ReactorGridBase>
  );
};

export default ReactorGrid;
