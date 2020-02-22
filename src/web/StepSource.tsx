import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { useStepperStyles } from './App-classes';

export interface StepSourceInitState {
  text: string;
}

export interface StepSourceResult {
  text: string;
}

interface StepSourceProps {
  getInitState: () => StepSourceInitState;
  onNextStep: (result: StepSourceResult) => void;
}

export const StepSource: React.FC<StepSourceProps> = (props: StepSourceProps) => {
  const { getInitState, onNextStep } = props;
  const { text: initText } = getInitState();
  const stepperClasses = useStepperStyles();
  const [text, setText] = useState<string>(initText);
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
            onNextStep({
              text,
            });
          }}
        >
          下一步
        </Button>
      </Grid>
    </Grid>
  );
};