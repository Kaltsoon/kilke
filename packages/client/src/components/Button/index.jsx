import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import { darken, rgba } from 'polished';

import { themeProp } from '../../theme';
import Icon from '../Icon';

const ButtonBase = styled.button`
  appearance: none;
  outline: none;
  font-family: ${themeProp('typography.fontFamily')};
  line-height: ${themeProp('typography.lineHeight')};
  white-space: nowrap;
  font-weight: bold;
  padding: 6px 18px;
  font-size: 1rem;
  border: 1px solid;
  transition: background-color 0.25s, border-color 0.25s, opacity 0.25s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: ${themeProp('borderRadius.base')};
  min-height: 38px;

  ${is('disabled')`
    opacity: 0.7;
    cursor: not-allowed;
  `};
`;

const ButtonSolid = styled(ButtonBase)`
  ${({ theme, color }) => `
    border-color: ${theme.palette[color].base};
    background-color: ${theme.palette[color].base};
    color: ${theme.palette[color].contrastText};

    &:hover {
      border-color: ${darken(0.1, theme.palette[color].base)};
      background-color: ${darken(0.1, theme.palette[color].base)};
    }

    &:active {
      border-color: ${darken(0.2, theme.palette[color].base)};
      background-color: ${darken(0.2, theme.palette[color].base)};
    }
  `};
`;

const ButtonOutline = styled(ButtonBase)`
  ${({ theme, color }) => `
    border-color: ${theme.palette[color].base};
    background-color: ${rgba(theme.palette[color].base, 0)};
    color: ${theme.palette[color].base};

    &:hover {
      background-color: ${rgba(theme.palette[color].base, 0.1)};
    }

    &:active {
      background-color: ${rgba(theme.palette[color].base, 0.2)};
    }
  `};
`;

const ButtonIcon = styled(Icon)`
  font-size: 1.25em;
`;

const getBaseComponent = variant => {
  if (variant === 'solid') {
    return ButtonSolid;
  } else if (variant === 'outline') {
    return ButtonOutline;
  }

  return ButtonSolid;
};

const Button = ({
  children,
  color = 'primary',
  variant = 'solid',
  disabled = false,
  iconAfter = null,
  iconBefore = null,
  icon = null,
  ...props
}) => {
  const Component = getBaseComponent(variant);

  return (
    <Component color={color} disabled={disabled} {...props}>
      {iconBefore ? (
        <ButtonIcon style={{ marginRight: '4px' }}>{iconBefore}</ButtonIcon>
      ) : null}
      {children}
      {icon ? <ButtonIcon>{icon}</ButtonIcon> : null}
      {iconBefore ? (
        <ButtonIcon style={{ marginLeft: '4px' }}>{iconAfter}</ButtonIcon>
      ) : null}
    </Component>
  );
};

export default Button;
