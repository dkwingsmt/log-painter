import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface AlertDialogControl {
  open: boolean;
  body?: React.ReactNode;
}

interface AlertDialogProps extends AlertDialogControl {
  onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, onClose, body }: AlertDialogProps) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>出错啦</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            好的
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;