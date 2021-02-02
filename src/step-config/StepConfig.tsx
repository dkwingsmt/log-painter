import React, { useState, useRef, useContext } from 'react';
import Color from 'color';

import fromPairs from 'lodash/fromPairs';
import mapValues from 'lodash/mapValues';
import reverse from 'lodash/reverse';
import uniq from 'lodash/uniq';

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
  AnalysedPlayer,
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
                  {Object.values(bbsColors()).map((describedColor: DescribedColor): React.ReactNode => {
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
  players: Record<string, ConfigPlayer>;
  setPlayer: (id: string, value: ConfigPlayer) => void;
}

const StepConfigPlayers: React.FC<StepConfigPlayersProps> = (props: StepConfigPlayersProps) => {
  const { players, setPlayer } = props;
  return (
    <Grid container style={{ overflowY: 'auto' }}>
      {Object.values(players).map((player: ConfigPlayer) => {
        return (
          <PlayerConfigDashboard
            key={player.id}
            name={player.name}
            setName={(value: string): void => {
              setPlayer(player.id, {
                ...player,
                name: value,
              });
            }}
            enabled={player.enabled}
            setEnabled={(value: boolean): void => {
              setPlayer(player.id, {
                ...player,
                enabled: value,
              });
            }}
            color={player.color}
            setColor={(value: string): void => {
              setPlayer(player.id, {
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

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={value.removeLinesStartedWithParenthesis}
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
            checked={value.removeLinesStartedWithDot}
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
            checked={value.removeLinesStartedWithLenticular}
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
            checked={value.regularizeQuotes}
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

interface ConfigPlayer {
  id: string;
  name: string;
  nameCandidates: string[];
  color: string;
  enabled: boolean;
}

function initializePlayers(
  analysePlayers: AnalysedPlayer[],
  playerConfigs: Record<string, PlayerConfig>,
  colors: Record<string, DescribedColor>,
): ConfigPlayer[] {
  const availableColors = {...colors};
  return analysePlayers.map((source: AnalysedPlayer) => {
    const existingConfig = playerConfigs[source.playerId];
    const sourceNames = reverse(Array.from(source.names));
    const result: ConfigPlayer = existingConfig != null ? {
      id: source.playerId,
      name: existingConfig.displayName,
      nameCandidates: uniq([existingConfig.displayName, ...sourceNames]),
      color: existingConfig.color,
      enabled: existingConfig.enabled,
    } : {
      id: source.playerId,
      name: sourceNames[0],
      nameCandidates: sourceNames,
      color: '',
      enabled: true,
    };
    if (!(result.color in colors)) {
      const color = Object.keys(availableColors)[0];
      delete availableColors[color];
      result.color = color;
    }
    return result;
  });
}

export const StepConfig: React.FC<StepConfigProps> = (props: StepConfigProps) => {
  const { args, onPrevStep, onNextStep } = props;

  const config = useContext<Configuration>(configContext);
  const stepperClasses = useStepperStyles();
  const [players, setPlayers] = useState<Record<string, ConfigPlayer>>(
    () => fromPairs(
      initializePlayers(args.players, config.players, bbsColors())
      .map((player: ConfigPlayer) => [player.id, player]),
    ),
  );
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>(
    () => config.general || {},
  );
  const lines = useRef<AnalysedLine[]>(args.lines);

  function setPlayer(id: string, value: ConfigPlayer): void {
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
                players: mapValues(players, (player: ConfigPlayer): PlayerConfig => ({
                  displayName: player.name,
                  color: player.color,
                  enabled: player.enabled,
                })),
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
