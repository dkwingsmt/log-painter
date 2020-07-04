import React, { useRef, useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { useStepperStyles } from './App-classes';
import { AnalysedLine, Configuration, getGeneralConfig, GeneralConfig, ConfigPlayer } from 'common';
import { saveConfig } from './storage';
import { regularizeQuotes } from './postprocesses';

export interface StepResultInitState {
  lines: AnalysedLine[];
  config: Configuration;
  oldConfig: Configuration;
}

interface StepResultProps {
  initState: StepResultInitState;
  onPrevStep: () => void;
  onRestart: () => void;
  show: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    Output: {
      fontFamily: '微软雅黑',
      fontSize: 14,
      padding: '16px 14px',

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


const processLines = (lines: AnalysedLine[], generalConfig: GeneralConfig): AnalysedLine[] => {
  let resultLines: AnalysedLine[] = lines;
  if (getGeneralConfig(generalConfig, 'removeLinesStartedWithParenthesis')) {
    resultLines = resultLines.filter((line: AnalysedLine) => {
      return !['（', '('].includes(line.content[0][0]);
    });
  }
  if (getGeneralConfig(generalConfig, 'removeLinesStartedWithDot')) {
    resultLines = resultLines.filter((line: AnalysedLine) => {
      return !['。', '.'].includes(line.content[0][0]);
    });
  }
  if (getGeneralConfig(generalConfig, 'removeLinesStartedWithLenticular')) {
    resultLines = resultLines.filter((line: AnalysedLine) => {
      return !['【'].includes(line.content[0][0]);
    });
  }
  if (getGeneralConfig(generalConfig, 'regularizeQuotes')) {
    resultLines = resultLines.map((line: AnalysedLine) => ({
      ...line,
      content: regularizeQuotes(line.content),
    }));
  }
  return resultLines;
};

interface SnackbarControl {
  body?: React.ReactNode;
  open: boolean;
}

export const StepResult: React.FC<StepResultProps> = (props: StepResultProps) => {
  const { initState, onPrevStep, onRestart } = props;
  const stepperClasses = useStepperStyles();
  const classes = useStyles();
  const oldConfig = useRef<Configuration>(initState.oldConfig);
  const playersConfig = useRef<Record<string, ConfigPlayer>>(initState.config.players || {});
  const [processedLines] = useState<AnalysedLine[]>(() => {
    return processLines(initState.lines, initState.config.general || {});
  });
  const [snackbarControl, setSnackbarControl] = useState<SnackbarControl>({
    open: false,
  });
  console.log(snackbarControl);
  const alertOnSnackbar = (body: React.ReactNode): void => {
    setSnackbarControl({ body, open: true });
  };
  const [clipboard] = useState<ClipboardJS>((): ClipboardJS => {
    const result: ClipboardJS = new ClipboardJS('#clipboard-button', {
      target: (): Element => {
        const element: Element | null = document.getElementById('result-body');
        if (element == null) {
          alertOnSnackbar('复制错误：找不到复制对象');
          throw new Error('找不到复制对象');
        }
        return element;
      },
    });
    result.on('success', () => {
      setImmediate(() => alertOnSnackbar('已复制到剪贴板！'));
    });
    result.on('error', (e: ClipboardJS.Event) => {
      alertOnSnackbar('复制错误！请双击文本框手动复制吧！');
      console.error(e);
    });
    return result;
  });

  useEffect(() => {
    return (): void => {
      clipboard.destroy();
    };
  });

  if (!props.show)
    return null;

  return (
    <Grid container className={stepperClasses.Container}>
      <Grid
        item
        xs={12}
        className={stepperClasses.Body}
      >
        <div
          className={classes.Output}
          onDoubleClick={(): void => {
            const selection = window.getSelection();
            if (!selection)
              return;
            const element = document.getElementById('result-body');
            if (!element)
              return;
            const range = document.createRange();
            range.selectNode(element);
            selection.removeAllRanges();
            selection.addRange(range);
          }}
          id='result-body'
        >
          <IconButton
            style={{
              float: 'right',
              marginTop: -15,
            }}
            id='clipboard-button'
          >
            <FileCopyIcon />
          </IconButton>
          {processedLines.map((line: AnalysedLine, paragraphId: number) => {
            const { playerId, content } = line;
            const player = playersConfig.current[playerId];
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
                  const newLine = contentId === 0 ? [] : [<br key={`br-${contentId}`}/>];
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
          onClick={(): void => {
            saveConfig(oldConfig.current);
            onPrevStep();
          }}
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarControl.open}
        autoHideDuration={6000}
        onClose={(): void => {
          console.trace();
          setSnackbarControl({
            ...snackbarControl,
            open: false,
          });
        }}
        message={snackbarControl.body}
      />
    </Grid>
  );
};