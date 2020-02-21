import React, { useState, useRef } from 'react';
import Store from 'store';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Configuration, AnalysedLine } from 'common';
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

const Main: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const sourceText = useRef<string>('');
  const oldConfig = useRef<Configuration>(emptyConfiguration);

  function onSourceNextStep(result: StepSourceResult): void {
    sourceText.current = result.text;
    oldConfig.current = loadConfig();
    setStep(step+1);
  }

  function onConfigPrevStep(): void {
    setStep(step-1);
  }

  const newConfig = useRef<Configuration>(emptyConfiguration);
  const lines = useRef<AnalysedLine[]>([]);
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
            const convertResult = convert(sourceText.current, oldConfig.current);
            lines.current = convertResult.lines;
            return {
              lines: convertResult.lines,
              playerIds: convertResult.playerIds,
              config: convertResult.nextConfig,
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
              lines: lines.current,
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
  return (
    <div className="root">
      <Header />
      <Container maxWidth='md' className='Body-container'>
        <Grid container xs={12}>
          <Main />
        </Grid>
      </Container>
    </div>
  );
};

export default App;
