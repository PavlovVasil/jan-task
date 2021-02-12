import { makeStyles } from '@material-ui/core/styles';

export const useLoadingIndicatorStyles = makeStyles(() => ({
  loadingIndicatorContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));