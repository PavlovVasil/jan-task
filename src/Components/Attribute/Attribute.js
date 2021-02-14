import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WarningIcon from '@material-ui/icons/Warning';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import { Test } from '../index'
import { useCardStyles } from './styles';
import PropTypes from 'prop-types';

export const Attribute = ({ attributeData, tests }) => {
  const classes = useCardStyles();

  const possibleTests = tests.filter(test =>
    test.typecastScope.includes(attributeData.typecast));

  const configuredTests = attributeData.channels[0].tests.map(test => {
    const details = possibleTests.filter(testDetails =>
      testDetails.code === test.code)[0]
    return {
      ...test,
      enabled: true,
      name: details.name,
      description: details.description,
      expanded: false
    }
  });

  possibleTests.forEach(possibleTest => {
    if (configuredTests.filter(test => test.code === possibleTest.code).length === 0) {
      const newConfiguredTest = {
        code: possibleTest.code,
        level: possibleTest.defaultLevel,
        params: [],
        enabled: false,
        name: possibleTest.name,
        description: possibleTest.description,
        expanded: false,
        seq: configuredTests === []
          ? 1
          : configuredTests[configuredTests.length - 1].seq + 1
      }
      configuredTests.push(newConfiguredTest)
    }
  });

  const renderTestConfig = (config) => {
    return (
      <FormControl variant="outlined" size="small">
        <InputLabel id="outlined-level-native-simple">Level</InputLabel>
        <Select
          labelId="outlined-level-native-simple"
          value={config.level}
        //onChange={handleChange}
        >
          <MenuItem value='warning'>
            <div className={classes.menuItemContent}>
              <WarningIcon className={classes.warning} />
              <span>Warning</span>
            </div>
          </MenuItem>
          <MenuItem value='critical'>
            <div className={classes.menuItemContent}>
            <WarningIcon className={classes.critical} />
            <span>Critical</span>
          </div>
          </MenuItem>
        </Select>
      </FormControl>
    )
  }

  const [testsState, setTestsState] = useState(configuredTests);

  const setTestEnabled = (e, seq) => {
    e.stopPropagation();
    debugger
  }

  return (
    <Card className={classes.root}>
      <CardContent classes={{ root: classes.content }}>
        <div className={classes.textContainer}>
          <div>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            Теsts
          </div>
          <div className={clsx(classes.descriptionContainer, classes.textContainer)}>
            <div>
              {attributeData.name}
            </div>
            <div>
              {attributeData.description}
            </div>
          </div>
          {/* Filter only the tests for this specific attribute */}
          {testsState.map(test =>
            <Test
              onToggleTest={e => setTestEnabled(e, test.seq)}
              config={test}
              key={test.seq}
              renderTestConfig={renderTestConfig}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

Attribute.propTypes = {
  attributeData: PropTypes.object.isRequired,
  tests: PropTypes.arrayOf(PropTypes.object)
}