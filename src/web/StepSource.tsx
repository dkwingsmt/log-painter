import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AlertDialog, { AlertDialogControl } from './AlertDialog';
import { useStepperStyles } from './App-classes';

import { parseAndGroup } from 'parser';
import { GroupResult } from 'common';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StepSourceInitState {
}

export type StepSourceResult = GroupResult;

interface StepSourceProps {
  initState: StepSourceInitState;
  onNextStep: (result: StepSourceResult) => void;
  show: boolean;
}

export const StepSource: React.FC<StepSourceProps> = (props: StepSourceProps) => {
  const { onNextStep } = props;
  const stepperClasses = useStepperStyles();
  const [text, setText] = useState<string>('');

  const [alertControl, setAlertControl] = useState<AlertDialogControl>({
    open: false,
  });

  if (!props.show)
    return null;

  function processResult(text: string): GroupResult | undefined {
    const groupResult = parseAndGroup(text);
    if (groupResult.players.length === 0 || groupResult.lines.length === 0) {
      setAlertControl({
        open: true,
        body: '无法从这段记录中找到可识别的部分！请检查后再试一次吧！',
      });
      return undefined;
    }
    return groupResult;
  }

  return (
    <Grid container className={stepperClasses.Container}>
      <Grid item xs={12} className={stepperClasses.Body}>
        <TextField
          id="outlined-basic"
          label="原文"
          placeholder="把原文粘贴到这里，然后点击下一步。"
          variant="outlined"
          multiline
          fullWidth
          rows={10}
          className='Source-textfield'
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setText(event.target.value);
          }}
          value={text}
        />
      </Grid>
      <Grid item xs={12} justify="flex-end" className={stepperClasses.Control}>
        <Button
          variant="contained"
          color="primary"
          disabled={text.length < 5}
          className={stepperClasses.ControlButton}
          onClick={(): void => {
            const result = processResult(text);
            if (result) {
              onNextStep(result);
            }
          }}
        >
          下一步
        </Button>
      </Grid>
      <AlertDialog
        onClose={(): void => setAlertControl({
          ...alertControl,
          open: false,
        })}
        {...alertControl}
      />
    </Grid>
  );
};