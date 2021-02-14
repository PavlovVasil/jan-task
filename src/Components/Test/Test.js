import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useAccordionStyles } from './style'

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
                        control={<Checkbox checked={config.enabled}/>}
                        label={config.name}
                    />
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