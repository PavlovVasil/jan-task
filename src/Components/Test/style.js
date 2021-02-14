import { makeStyles } from '@material-ui/core/styles';

export const useAccordionStyles = makeStyles({
    root: {
        width: '100%',
    },
    formControlContainer: {
        width: '100%',
    },
    warningIconContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    warning: {
        color: '#ffda6b'
    },
    critical: {
        color: '#ff939a'
    }
});