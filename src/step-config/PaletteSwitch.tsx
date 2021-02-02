import React, { useState, useRef, useContext } from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
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
import { DescribedColor } from 'common/colors';

interface PaletteSwitchProps {
  value: ColorPalette;
  setValue: (value: ColorPalette) => void;
  className?: string;
}

const useStyles = makeStyles((/*theme: Theme*/) =>
  createStyles({
    outerButton: {
      marginLeft: 10,
    },
    paper: {
      display: 'flex',
      flexDirection: 'row',
      background: '#f5f5f5',
    },
    menu: {
      flex: '100pt 0 0',
    },
    descriptionBox: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'medium',
      overflowX: 'hidden',
    },
    descriptionText: {
      flex: '80pt 1 0',
      padding: 20,
    },
    descriptionDisplay: {
      flex: '20pt 0 0',
      height: 20,
      display: 'inline-flex',
      background: 'white',
    },
    descriptionDisplayCell: {
      flex: '1',
      height: 20,
    },
  }),
);

export const PaletteSwitch: React.FC<PaletteSwitchProps> = (props: PaletteSwitchProps) => {
  const { value, setValue, className } = props;
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [dialogSelect, setDialogSelect] = React.useState<ColorPalette>(Object.values(colorPalettes)[0].id);

  const current = colorPalettes[value];

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setDialogSelect(value);
  }

  const handleConfirmDialog = () => {
    setDialogOpen(false);
    setValue(dialogSelect);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  return (
    <div className={className}>
      当前配色方案：{current.name}
      <Button
        color="secondary"
        size="small"
        variant="contained"
        onClick={handleOpenDialog}
        className={classes.outerButton}
      >
        切换
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>更换配色方案</DialogTitle>
        <DialogContent>
          <DialogContentText>
            你当前的配色方案是“{current.name}”。<br />
          </DialogContentText>
          <Paper className={classes.paper}>
            <MenuList className={classes.menu}>
              {Object.values(colorPalettes).map((palette: PaletteInfo) => (
                <MenuItem
                  key={palette.id}
                  selected={palette.id == dialogSelect}
                  onClick={() => { setDialogSelect(palette.id); }}
                >
                  {palette.name}
                </MenuItem>
              ))}
            </MenuList>
            <div className={classes.descriptionBox}>
              <div className={classes.descriptionText}>
                {colorPalettes[dialogSelect].description}
              </div>
              <div className={classes.descriptionDisplay}>
                {Object.values(colorPalettes[dialogSelect].contents()).map((color: DescribedColor) => (
                  <div className={classes.descriptionDisplayCell} style={{ background: color.value }} />
                ))}
              </div>
            </div>
          </Paper>
          <DialogContentText>
            更换配色方案后，所有现有配色设置将重置。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialog} color="primary" variant="contained" disabled={dialogSelect == value}>
            确认更换
          </Button>
          <Button onClick={handleCloseDialog} color="secondary">
            不了
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
