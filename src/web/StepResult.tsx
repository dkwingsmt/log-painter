import React from 'react';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { useStepperStyles } from './App-classes';
import { AnalysedLine, Configuration } from 'common';

export interface StepResultInitState {
  lines: AnalysedLine[];
  config: Configuration;
}

interface StepResultProps {
  getInitState: () => StepResultInitState;
  onPrevStep: () => void;
  onRestart: () => void;
}

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    Output: {
      fontFamily: '微软雅黑',
      fontSize: 12,
      padding: '18.5px 14px',

      borderColor: '#0000003b',
      '&:hover': {
        borderColor: '#000000de',
      },
      borderStyle: 'solid' ,
      borderWidth: 1,
      borderRadius: 4,
      maxHeight: 200,
      overflowY: 'scroll',

      '& > p': {
        margin: '0.5em 0',
      },
    },
  }),
);

export const StepResult: React.FC<StepResultProps> = (props: StepResultProps) => {
  const { getInitState, onPrevStep, onRestart } = props;
  const { lines, config } = getInitState();
  const stepperClasses = useStepperStyles();
  const classes = useStyles();
  const { players } = config;
  return (
    <Grid container className={stepperClasses.Container}>
      <Grid
        item
        xs={12}
        style={{ maxHeight: 400, overflowY: 'scroll' }}
        className={stepperClasses.Body}
      >
        <div
          className={classes.Output}
          onDoubleClick={(): void => {
            const selection = window.getSelection();
            if (!selection)
              return;
            const element = document.getElementById('result');
            if (!element)
              return;
            const range = document.createRange();
            range.selectNode(element);
            selection.removeAllRanges();
            selection.addRange(range);
          }}
          id='result'
        >
          {lines.map((line: AnalysedLine, paragraphId: number) => {
            const { playerId, content } = line;
            const player = players[playerId];
            if (!player.enabled)
              return null;
            return (
              <p
                key={paragraphId}
                style={{
                  color: player.color,
                }}
              >
                {`<${player.displayName}> `}
                {content.map((contentLine: string, contentId: number) => {
                  const newLine = contentId == 0 ? [] : [<br key={`br-${contentId}`}/>];
                  return newLine.concat([<span key={contentId}>{contentLine}</span>]);
                })}
              </p>
            );
          })}
        </div>
      </Grid>
      <Grid item xs={12} justify="flex-end" className={stepperClasses.Control}>
        <Button
          variant="outlined"
          color="secondary"
          className={stepperClasses.ControlButton}
          onClick={onPrevStep}
        >
          上一步
        </Button>
        <Button
          variant="contained"
          className={stepperClasses.ControlButton}
          style={{ backgroundColor: '#d4d45f' }}
          onClick={onRestart}
        >
          再做一团
        </Button>
      </Grid>
    </Grid>
  );
};