import React, { useRef, useState, useEffect, useContext } from 'react';
import ClipboardJS from 'clipboard';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import {
  useStepperStyles,
  EndStepProps,
  Configuration,
  PlayerConfig,
  configContext,
} from 'common';
import {
  AnalysedLine,
} from 'step-source';
import {
  StepConfigResult,
} from 'step-config';
import { renderContent, renderingSchemes } from 'common/renderers';

type StepRenderProps = EndStepProps<StepConfigResult, Configuration>;

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


interface SnackbarControl {
  body?: React.ReactNode;
  open: boolean;
}

export const StepRender: React.FC<StepRenderProps> = (props: StepRenderProps) => {
  const { args, onPrevStep, onRestart } = props;
  const config: Configuration = useContext<Configuration>(configContext);
  const stepperClasses = useStepperStyles();
  const classes = useStyles();
  const playersConfig = useRef<Record<string, PlayerConfig>>(config.players || {}).current;
  const [snackbarControl, setSnackbarControl] = useState<SnackbarControl>({
    open: false,
  });
  const alertOnSnackbar = (body: React.ReactNode): void => {
    setSnackbarControl({ body, open: true });
  };
  const scheme = renderingSchemes[config.general.rendererScheme];
  const lines = args.lines
    .filter((line: AnalysedLine) => playersConfig[line.playerId]?.enabled ?? true)
    .map((line: AnalysedLine) => ({
      content: line.content,
      playerName: playersConfig[line.playerId]?.displayName ?? '错误',
      playerColor: playersConfig[line.playerId]?.color ?? 'black',
    }));

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
          {renderContent(lines, scheme, false)}
        </div>
      </Grid>
      <Grid item xs={12} justifyContent="flex-end" className={stepperClasses.Control}>
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
          onClick={(): void => { onRestart(config); }}
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
