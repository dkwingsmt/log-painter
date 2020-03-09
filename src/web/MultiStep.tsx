import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';

interface BaseStep<InArg> {
  show: boolean;
  initState: InArg;
}

interface WithOutArg<OutArg> {
  onNextStep: (result: OutArg) => void;
}

interface WithPrevStep {
  onPrevStep: () => void;
}

interface WithRestart {
  onRestart: () => void;
}

interface MultiStepProps<I1, O1, I2, O2, I3> {
  onInit1: () => I1;
  step1: React.ComponentType<BaseStep<I1> & WithOutArg<O1>>;
  onInit2: (o: O1) => I2;
  step2: React.ComponentType<BaseStep<I2> & WithOutArg<O2> & WithPrevStep>;
  onInit3: (o: O2) => I3;
  step3: React.ComponentType<BaseStep<I3> & WithPrevStep & WithRestart>;
}

const MultiStep = <I1, O1, I2, O2, I3>(
  props: MultiStepProps<I1, O1, I2, O2, I3>,
): React.ReactElement | null => {
  const { onInit1, step1: Step1, onInit2, step2: Step2, onInit3, step3: Step3 } = props;
  // `session` is used to refresh steps (mostly step 1) on restart.
  const [session, setSession] = useState<number>(0);
  const [initStates, setInitStates] = useState<[I1?, I2?, I3?]>([]);

  const handleRestart = (): void => {
    setSession(session + 1);
    setInitStates([
      onInit1(),
    ]);
  };

  if (initStates.length == 0) {
    handleRestart();
  }

  return (
    <Grid container xs={12}>
      {initStates[0] == null ? null : (
        <Step1
          key={`${session}-1`}
          show={initStates.length === 1}
          initState={initStates[0]}
          onNextStep={(result: O1): void => {
            setInitStates([
              initStates[0],
              onInit2(result),
            ]);
          }}
        />
      )}

      {initStates[1] == null ? null : (
        <Step2
          key={`${session}-2`}
          show={initStates.length === 2}
          initState={initStates[1]}
          onPrevStep={(): void => {
            setInitStates([
              initStates[0],
            ]);
          }}
          onNextStep={(result: O2): void => {
            setInitStates([
              initStates[0],
              initStates[1],
              onInit3(result),
            ]);
          }}
        />
      )}

      {initStates[2] == null ? null : (
        <Step3
          key={`${session}-3`}
          show={initStates.length === 3}
          initState={initStates[2]}
          onPrevStep={(): void => {
            setInitStates([
              initStates[0],
              initStates[1],
            ]);
          }}
          onRestart={handleRestart}
        />
      )}
    </Grid>
  );
};

export default MultiStep;