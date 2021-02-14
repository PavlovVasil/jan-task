import { makeStyles } from '@material-ui/core/styles';
//import { red } from '@material-ui/core/colors';

export const useCardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: '16px auto',
    position: 'relative',
    '-webkit-box-shadow': '-3px 3px 7px 0px rgba(0,0,0,0.28)',
    '-moz-box-shadow': '-3px 3px 7px 0px rgba(0,0,0,0.28)',
    boxShadow: '-3px 3px 7px 0px rgba(0,0,0,0.28)',
    '&::before': {
      content: '""',
      width: '100%',
      background: '#2254ae',
      height: '3px',
      position: 'absolute',
      top: '0px',
      left: '0px'
    }
  },
  content: {
    padding: '8px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: 'rgba(0, 0, 0, 0.54)',
    '& > div': {
      textAlign: 'left'
    }
  },
  descriptionContainer: {
    marginTop: '16px',
    marginBottom: '16px'
  }
}));