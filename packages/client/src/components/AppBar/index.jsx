import React from 'react';
import styled from 'styled-components';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

import { spacing } from '@/theme';
import useModal from '@/hooks/useModal';

const MenuButton = styled(IconButton).attrs(() => ({
  color: 'inherit',
  'aria-label': 'Menu',
}))`
  margin-right: ${spacing(2)} !important;
`;

const MenuDrawer = props => {
  const { onClose } = props;

  const itemProps = {
    onClick: onClose,
    component: Link,
    button: true,
  };

  return (
    <Drawer {...props}>
      <List>
        <ListItem {...itemProps} to="/system-selection">
          <ListItemIcon>
            <CompareArrowsIcon />
          </ListItemIcon>
          <ListItemText primary="Switch system" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export const AppBar = () => {
  const { isOpen, close, open } = useModal();

  return (
    <>
      <MenuDrawer open={isOpen} onClose={close} />
      <MuiAppBar position="static">
        <Toolbar>
          <MenuButton onClick={open}>
            <MenuIcon />
          </MenuButton>
          <Typography variant="h6" color="inherit">
            Nemo
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </>
  );
};

export default AppBar;
