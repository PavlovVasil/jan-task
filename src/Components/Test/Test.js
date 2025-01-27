import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WarningIcon from '@material-ui/icons/Warning';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useAccordionStyles } from './style';
import PropTypes from 'prop-types';

// Overriding Material UI's ugly pink checkbox :)
const GreenCheckbox = withStyles({
    root: {
      '&$checked': {
        color: "#48cfad",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


// This better be kept as a presentational/dumb component
export const Test = ({ testDetails, onToggleTest, renderTestConfig }) => {
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
                        control={<GreenCheckbox checked={testDetails.enabled} />}
                        label={testDetails.name}
                        className={classes.formControlContainer}
                    />
                    <div className={classes.warningIconContainer}>
                        <WarningIcon className={classes[testDetails.level]}/>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                   {renderTestConfig()}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

Test.propTypes = {
    testDetails: PropTypes.object.isRequired,
    onToggleTest: PropTypes.func.isRequired,
    renderTestConfig: PropTypes.func.isRequired
}