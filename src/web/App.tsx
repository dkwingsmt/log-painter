import React from 'react';
import SVGInline from 'react-svg-inline';

import GithubIcon from 'simple-icons/icons/github';

import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './index.css';
import './App.css';
import { StepSource, StepSourceResult } from 'step-source';
import { StepConfig, StepConfigResult, Configuration } from 'step-config';
import { StepResult } from 'step-result';
import {
  MultiStep,
} from 'common';

const useHeaderStyles = makeStyles(() =>
  createStyles({
    logo: {
      marginRight: 15,
      backgroundColor: 'white',
    },
    horizontalFill: {
      flex: '1 0 auto',
    },
    toolbarIcon: {
      height: 24,
      width: 24,
      fill: 'white',
    },
  }),
);

interface HeaderProps {
  repoUrl: string;
}

const Header: React.FC<HeaderProps> = ({ repoUrl }: HeaderProps) => {
  const classes = useHeaderStyles();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Avatar alt="Logo" src="/android-chrome-512x512.png" className={classes.logo} />
        <Typography variant="h6" className={classes.horizontalFill}>
          DK的跑团记录着色器
        </Typography>
        <IconButton
          aria-label="GitHub"
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SVGInline
            svg={GithubIcon.svg}
            className={classes.toolbarIcon}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Main: React.FC<MainProps> = (props: MainProps) => {
  return (
    <MultiStep<StepSourceResult, StepConfigResult, Configuration>
      step1={StepSource}
      step2={StepConfig}
      step3={StepResult}
    />
  );
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#795548',
    },
    secondary: {
      main: '#00897b',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <Header
          repoUrl='https://github.com/dkwingsmt/log-painter'
        />
        <Container maxWidth='md' className='Body-container'>
          <Main />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
