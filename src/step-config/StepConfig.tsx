import React, { useState, useRef, useContext } from 'react';
import Color from 'color';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';

import {
  useStepperStyles,
  MiddleStepProps,
  configContext,
  Configuration,
  PlayerConfig,
  GeneralConfig,
} from 'common';
import {
  AnalysedLine,
  StepSourceResult,
} from 'step-source';
import {
  DescribedColor,
  bbsColors,
} from './colors';

export interface StepConfigResult {
  lines: AnalysedLine[];
}

interface PlayerConfigProps {
  name: string;
  color: string;
  enabled: boolean;
  setName: (value: string) => void;
  setColor: (value: string) => void;
  setEnabled: (value: boolean) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    PlayerConfig: {
    },
    Center: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

const PlayerConfigDashboard: React.FC<PlayerConfigProps> = (props: PlayerConfigProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={6}>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            defaultValue={props.name}
            variant="outlined"
            fullWidth
            onBlur={(event: React.FocusEvent<HTMLInputElement>): void => {
              props.setName(event.target.value || '');
            }}
          />
        </Grid>
        <Grid item xs={4} className={classes.Center}>
          <Grid container>
            <FormGroup row className={classes.Center}>
              <FormControl>
                <Switch
                  checked={props.enabled}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
                    props.setEnabled(checked);
                  }}
                  value="primary"
                />
              </FormControl>
              <FormControl style={props.enabled ? {} : { visibility: 'hidden' }}>
                <Select
                  style={{
                    backgroundColor: props.color,
                    color: Color(props.color).isLight() ? 'black' : 'white',
                    padding: 4,
                  }}
                  native
                  value={props.color}
                  onChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
                    props.setColor(event.target.value as string);
                  }}
                >
                  {bbsColors.map((describedColor: DescribedColor): React.ReactNode => {
                    const { value, name, isLight } = describedColor;
                    return (
                      <option
                        key={value}
                        value={value}
                        style={{
                          backgroundColor: value,
                          color: isLight ? 'black' : 'white',
                        }}
                      >
                        {name || value}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface StepConfigPlayersProps {
  playerIds: string[];
  players: Record<string, PlayerConfig>;
  setPlayer: (id: string, value: PlayerConfig) => void;
}

const StepConfigPlayers: React.FC<StepConfigPlayersProps> = (props: StepConfigPlayersProps) => {
  const { playerIds, players, setPlayer } = props;
  return (
    <Grid container style={{ overflowY: 'auto' }}>
      {playerIds.map((playerId: string) => {
        const player = players[playerId];
        return (
          <PlayerConfigDashboard
            key={playerId}
            name={player.displayName}
            setName={(value: string): void => {
              setPlayer(playerId, {
                ...player,
                displayName: value,
              });
            }}
            enabled={player.enabled}
            setEnabled={(value: boolean): void => {
              setPlayer(playerId, {
                ...player,
                enabled: value,
              });
            }}
            color={player.color}
            setColor={(value: string): void => {
              setPlayer(playerId, {
                ...player,
                color: value,
              });
            }}
          />
        );
      })}
    </Grid>
  );
};

interface StepConfigGeneralProps {
  value: GeneralConfig;
  setValue: (value: GeneralConfig) => void;
}

const StepConfigGeneral: React.FC<StepConfigGeneralProps> = (props: StepConfigGeneralProps) => {
  const { value, setValue } = props;
  const config = useContext<Configuration>(configContext);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={config.general.removeLinesStartedWithParenthesis}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setValue({
                ...value,
                removeLinesStartedWithParenthesis: event.target.checked,
              });
            }}
            color="primary"
          />
        }
        label="去掉以(（开头的行"
      />
      <FormControlLabel
        control={
          <Switch
            checked={config.general.removeLinesStartedWithDot}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setValue({
                ...value,
                removeLinesStartedWithDot: event.target.checked,
              });
            }}
            color="primary"
          />
        }
        label="去掉以.。开头的行"
      />
      <FormControlLabel
        control={
          <Switch
            checked={config.general.removeLinesStartedWithLenticular}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setValue({
                ...value,
                removeLinesStartedWithLenticular: event.target.checked,
              });
            }}
            color="primary"
          />
        }
        label="去掉以【开头的行"
      />
      <FormControlLabel
        control={
          <Switch
            checked={config.general.regularizeQuotes}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setValue({
                ...value,
                regularizeQuotes: event.target.checked,
              });
            }}
            color="primary"
          />
        }
        label="自动纠正前后引号"
      />
    </FormGroup>
  );
};

type StepConfigProps = MiddleStepProps<StepSourceResult, StepConfigResult, Configuration>;

export const StepConfig: React.FC<StepConfigProps> = (props: StepConfigProps) => {
  const { args, onPrevStep, onNextStep } = props;
  const config = useContext<Configuration>(configContext);
  const stepperClasses = useStepperStyles();
  const [players, setPlayers] = useState<Record<string, PlayerConfig>>(
    () => config.players || {},
  );
  const playerIds = useRef<string[]>(args.playerIds);
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>(
    () => config.general || {},
  );
  const lines = useRef<AnalysedLine[]>(args.lines);
  function setPlayer(id: string, value: PlayerConfig): void {
    setPlayers({ ...players, [id]: value });
  }

  if (!props.show)
    return null;

  return (
    <Grid container className={stepperClasses.Container}>
      <Grid item xs={12} className={stepperClasses.Body}>
        <StepConfigGeneral
          value={generalConfig}
          setValue={setGeneralConfig}
        />
        <StepConfigPlayers
          playerIds={playerIds.current}
          players={players}
          setPlayer={setPlayer}
        />
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
          color="primary"
          className={stepperClasses.ControlButton}
          onClick={(): void => {
            onNextStep(
              {
                lines: lines.current,
              },
              {
                players,
                general: generalConfig,
              },
            );
          }}
        >
          下一步
        </Button>
      </Grid>
    </Grid>
  );
};