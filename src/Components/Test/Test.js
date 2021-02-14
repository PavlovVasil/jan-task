import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WarningIcon from '@material-ui/icons/Warning';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useAccordionStyles } from './style'

const GreenCheckbox = withStyles({
    root: {
      '&$checked': {
        color: "#48cfad",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export const Test = ({ config, onToggleTest }) => {
    const classes = useAccordionStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >
                    <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={e => onToggleTest(e)}
                        onFocus={(event) => event.stopPropagation()}
                        control={<GreenCheckbox checked={config.enabled} />}
                        label={config.name}
                        className={classes.formControlContainer}
                    />
                    <div className={classes.warningIconContainer}>
                        <WarningIcon className={classes[config.level]}/>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography color="textSecondary">
                        {config.name}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}