import React, { useState, useRef } from 'react';
import Store from 'store';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Configuration, AnalyseResult } from 'common';
import { convert } from 'parser';

import './index.css';
import './App.css';
import { StepSource, StepSourceResult, StepSourceInitState } from './StepSource';
import { StepConfig, StepConfigResult, StepConfigInitState } from './StepConfig';
import { StepResult, StepResultInitState } from './StepResult';

interface HeaderProps {
}

const Header: React.FC = (props: HeaderProps) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h6">
          跑团记录着色器
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const emptyConfiguration: Configuration = { players: {} };

function loadConfig(): Configuration {
  return Store.get('config') || emptyConfiguration;
}

function saveConfig(config: Configuration): void {
  Store.set('config', config);
}

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  body: React.ReactNode;
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

interface MainProps {
  setError: (body: React.ReactNode) => void;
}

const Main: React.FC<MainProps> = ({ setError }: MainProps) => {
  const [step, setStep] = useState<number>(1);

  const sourceText = useRef<string>('');
  const oldConfig = useRef<Configuration>(emptyConfiguration);
  const lastConvertResult = useRef<AnalyseResult>({ lines: [], playerIds: [], nextConfig: emptyConfiguration });

  function onSourceNextStep(result: StepSourceResult): void {
    sourceText.current = result.text;
    oldConfig.current = loadConfig();

    const convertResult = convert(sourceText.current, oldConfig.current);
    if (convertResult.lines.length === 0 || convertResult.playerIds.length === 0) {
      setError('无法从这段记录中找到可识别的部分！请检查后再试一次吧！');
      return;
    }
    lastConvertResult.current = convertResult;
    setStep(step+1);
  }

  function onConfigPrevStep(): void {
    setStep(step-1);
  }

  const newConfig = useRef<Configuration>(emptyConfiguration);
  function onConfigNextStep(result: StepConfigResult): void {
    saveConfig(result.newConfig);
    newConfig.current = result.newConfig;
    setStep(step+1);
  }

  function onResultPrevStep(): void {
    saveConfig(oldConfig.current);
    setStep(step-1);
  }

  function onResultRestart(): void {
    sourceText.current = '';
    setStep(1);
  }

  switch (step) {
    case 1:
      return (
        <StepSource
          key={step}
          getInitState={(): StepSourceInitState => ({
            text: sourceText.current,
          })}
          onNextStep={onSourceNextStep}
        />
      );
    case 2:
      return (
        <StepConfig
          key={step}
          getInitState={(): StepConfigInitState => {
            return {
              lines: lastConvertResult.current.lines,
              playerIds: lastConvertResult.current.playerIds,
              config: lastConvertResult.current.nextConfig,
            };
          }}
          onPrevStep={onConfigPrevStep}
          onNextStep={onConfigNextStep}
        />
      );
    case 3:
      return (
        <StepResult
          key={step}
          getInitState={(): StepResultInitState => {
            return {
              lines: lastConvertResult.current.lines,
              config: newConfig.current,
            };
          }}
          onPrevStep={onResultPrevStep}
          onRestart={onResultRestart}
        />
      );
  }
  return (
    <div>
      Unexpected step {step}
    </div>
  );
};

const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<React.ReactNode | null>();
  return (
    <div className="root">
      <Header />
      <Container maxWidth='md' className='Body-container'>
        <Grid container xs={12}>
          <Main
            setError={setErrorMessage}
          />
        </Grid>
      </Container>
      <AlertDialog
        open={!!errorMessage}
        onClose={(): void => setErrorMessage(null)}
        body={errorMessage}
      />
    </div>
  );
};

export default App;
