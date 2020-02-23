import React, { useState } from 'react';
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

import { useStepperStyles } from './App-classes';
import { getGeneralConfig, Configuration, AnalysedLine, DescribedColor, ConfigPlayer, presetDescribedColors, GeneralConfig } from 'common';

export interface StepConfigInitState {
  lines: AnalysedLine[];
  playerIds: string[];
  config: Configuration;
}

export interface StepConfigResult {
  newConfig: Configuration;
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

const PlayerConfig: React.FC<PlayerConfigProps> = (props: PlayerConfigProps) => {
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
                  {presetDescribedColors.map((describedColor: DescribedColor): React.ReactNode => {
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

interface SourceInputProps {
  getInitState: () => StepConfigInitState;
  onPrevStep: () => void;
  onNextStep: (result: StepConfigResult) => void;
}

interface StepConfigPlayersProps {
  playerIds: string[];
  players: Record<string, ConfigPlayer>;
  setPlayer: (id: string, value: ConfigPlayer) => void;
}

const StepConfigPlayers: React.FC<StepConfigPlayersProps> = (props: StepConfigPlayersProps) => {
  const { playerIds, players, setPlayer } = props;
  return (
    <Grid container>
      {playerIds.map((playerId: string) => {
        const player = players[playerId];
        return (
          <PlayerConfig
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

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={getGeneralConfig(value, 'removeLinesStartedWithBracket')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setValue({
                ...value,
                removeLinesStartedWithBracket: event.target.checked,
              });
            }}
            color="primary"
          />
        }
        label="去掉以（开头的行"
      />
      <FormControlLabel
        control={
          <Switch
            checked={getGeneralConfig(value, 'removeLinesStartedWithDot')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setValue({
                ...value,
                removeLinesStartedWithDot: event.target.checked,
              });
            }}
            color="primary"
          />
        }
        label="去掉以。开头的行"
      />
    </FormGroup>
  );
};

export const StepConfig: React.FC<SourceInputProps> = (props: SourceInputProps) => {
  const { getInitState, onPrevStep, onNextStep } = props;
  const { config, playerIds } = getInitState();
  const stepperClasses = useStepperStyles();
  const [players, setPlayers] = useState<Record<string, ConfigPlayer>>(config.players || {});
  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>(config.general || {});
  function setPlayer(id: string, value: ConfigPlayer): void {
    setPlayers({ ...players, [id]: value });
  }
  return (
    <Grid container className={stepperClasses.Container}>
      <Grid item xs={12} className={stepperClasses.Body}>
        <StepConfigGeneral
          value={generalConfig}
          setValue={setGeneralConfig}
        />
        <StepConfigPlayers
          playerIds={playerIds}
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
            console.log({
              players,
              general: generalConfig,
            });
            onNextStep({
              newConfig: {
                players,
                general: generalConfig,
              },
            });
          }}
        >
          下一步
        </Button>
      </Grid>
    </Grid>
  );
};