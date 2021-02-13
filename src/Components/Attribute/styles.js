import { makeStyles } from '@material-ui/core/styles';
//import { red } from '@material-ui/core/colors';

export const useCardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  descriptionContainer: {
    marginTop: '16px',
    marginBottom: '16px'
  }
}));