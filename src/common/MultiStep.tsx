import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';

interface BaseStep {
  show: boolean;
}

interface WithOutArg<OutArg, Config> {
  onNextStep: (result: OutArg, config: Config) => void;
}

interface WithPrevStep<InArg> {
  args: InArg;
  onPrevStep: () => void;
}

interface WithRestart<Config> {
  onRestart: (config: Config) => void;
}

export type StartStepProps<O, Config> = BaseStep & WithOutArg<O, Config>;
export type MiddleStepProps<I, O, Config> = BaseStep & WithOutArg<O, Config> & WithPrevStep<I>;
export type EndStepProps<I, Config> = BaseStep & WithPrevStep<I> & WithRestart<Config>;

interface MultiStepProps<O1, O2, Config> {
  step1: React.ComponentType<StartStepProps<O1, Config>>;
  step2: React.ComponentType<MiddleStepProps<O1, O2, Config>>;
  step3: React.ComponentType<EndStepProps<O2, Config>>;
  initConfig: () => Config;
  saveConfig: (value: Config) => void;
}

const MultiStep = <O1, O2, Config>(
  props: MultiStepProps<O1, O2, Config>,
): React.ReactElement | null => {
  const { step1: Step1, step2: Step2, step3: Step3, initConfig, saveConfig } = props;
  // `session` is used to refresh steps (mostly step 1) on restart.
  const [session, setSession] = useState<number>(0);

  const [initStates, setInitStates] = useState<[O1?, O2?]>([]);
  const [o1, o2] = initStates;

  const [configStack, setConfigStack] = useState<Config[]>((): Config[] => {
    return [initConfig()];
  });
  function pushConfig(value: Config): void {
    saveConfig(value);
    setConfigStack([...configStack, value]);
  }
  function popConfig(): void {
    setConfigStack(configStack.slice(0, configStack.length - 1));
    saveConfig(configStack[configStack.length - 1]);
  }

  return (
    <Grid container xs={12}>
      <Step1
        key={`${session}-1`}
        show={initStates.length === 0}
        onNextStep={(result: O1, config: Config): void => {
          pushConfig(config);
          setInitStates([
            result,
          ]);
        }}
      />

      {o1 == null ? null : (
        <Step2
          key={`${session}-2`}
          show={initStates.length === 1}
          args={o1}
          onPrevStep={(): void => {
            popConfig();
            setInitStates([
            ]);
          }}
          onNextStep={(result: O2, config: Config): void => {
            pushConfig(config);
            setInitStates([
              initStates[0],
              result,
            ]);
          }}
        />
      )}

      {o2 == null ? null : (
        <Step3
          key={`${session}-3`}
          show={initStates.length === 2}
          args={o2}
          onPrevStep={(): void => {
            popConfig();
            setInitStates([
              initStates[0],
            ]);
          }}
          onRestart={(config: Config): void => {
            setInitStates([]);
            setSession(session + 1);
            setConfigStack([config]);
            saveConfig(config);
          }}
        />
      )}
    </Grid>
  );
};

export { MultiStep };
