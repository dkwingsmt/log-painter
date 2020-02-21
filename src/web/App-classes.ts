import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

export const useStepperStyles = makeStyles((_theme: Theme) =>
  createStyles({
    Control: {
      display: 'flex',
      marginTop: 20,
    },
    Body: {
    },
    Container: {
    },
    ControlButton: {
      width: 100,
      marginLeft: 10,
    }
  }),
);