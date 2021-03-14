import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStepperStyles = makeStyles((/*theme: Theme*/) =>
  createStyles({
    Control: {
      display: 'flex',
      marginTop: 20,
    },
    Body: {
    },
    Container: {
      paddingTop: 10,
    },
    ControlButton: {
      width: 100,
      marginLeft: 10,
    }
  }),
);
