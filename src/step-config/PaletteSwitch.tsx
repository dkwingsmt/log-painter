import React, { useState, useRef, useContext } from 'react';

import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
  ColorPalette,
  PaletteInfo,
  colorPalettes,
} from 'common';

interface PaletteSwitchProps {
  value: ColorPalette;
  setValue: (value: ColorPalette) => void;
}

export const PaletteSwitch: React.FC<PaletteSwitchProps> = (props: PaletteSwitchProps) => {
  const { value, setValue } = props;
  const anchorRef = React.useRef(null);
  const [popperOpen, setPopperOpen] = React.useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [dialogToSwitch, setDialogToSwitch] = React.useState<PaletteInfo>(Object.values(colorPalettes)[0]);

  const current = colorPalettes[value];

  const handleTogglePopper = () => {
    setPopperOpen((prevOpen) => !prevOpen);
  };

  const handleClosePopper = () => {
    setPopperOpen(false);
  }

  const handleMenuItemClick = (palette: PaletteInfo) => {
    if (palette.id != current.id) {
      setDialogOpen(true);
      setDialogToSwitch(palette);
    } else {
      handleClosePopper()
    }
  }

  const handleConfirmDialog = () => {
    setDialogOpen(false);
    handleClosePopper();
    setValue(dialogToSwitch.id);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  return (
    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
      <Button
        color="primary"
        size="small"
        onClick={handleTogglePopper}
      >
        当前配色方案：{current.name}
        <ArrowDropDownIcon />
      </Button>
      <Popper open={popperOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClosePopper}>
                <MenuList id="split-button-menu">
                  {Object.values(colorPalettes).map((palette: PaletteInfo) => (
                    <MenuItem
                      key={palette.id}
                      selected={palette.id == current.id}
                      onClick={() => handleMenuItemClick(palette)}
                    >
                      {palette.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>更换配色方案</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            你当前的配色方案是“{current.name}”。<br />
            你即将更换为“{dialogToSwitch.name}”。{dialogToSwitch.description}<br />
            更换配色方案后，所有现有配色设置将重置。<br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialog} color="primary" autoFocus>
            确认更换
          </Button>
          <Button onClick={handleCloseDialog} color="secondary">
            不了
          </Button>
        </DialogActions>
      </Dialog>
    </ButtonGroup>
  );
}
