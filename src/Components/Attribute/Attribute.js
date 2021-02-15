import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WarningIcon from '@material-ui/icons/Warning';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
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
      id: details.id,
      enabled: true,
      name: details.name,
      description: details.description,
      expanded: false
    }
  });

  possibleTests.forEach(possibleTest => {
    if (configuredTests.filter(test => test.code === possibleTest.code).length === 0) {
      const newConfiguredTest = {
        id: possibleTest.id,
        code: possibleTest.code,
        level: possibleTest.defaultLevel,
        params: [],
        enabled: false,
        name: possibleTest.name,
        description: possibleTest.description,
        expanded: false,
        seq: null
      }
      configuredTests.push(newConfiguredTest)
    }
  });

  const [testsState, setTestsState] = useState(configuredTests);

  const toggleTestEnabled = (e, testName) => {
    e.stopPropagation();
    const newTestsState = [...testsState]
    const index =  newTestsState.findIndex(element => element.name === testName)
    newTestsState[index].enabled = !newTestsState[index].enabled;
    // send new test to server
    setTestsState(newTestsState);
  }

  const handleChange = (event, testName) => {
    const newValue = event.target.value;
    const newTestsState = [...testsState]
    const index =  newTestsState.findIndex(element => element.name === testName)
    newTestsState[index].level = newValue;
    // send new level to server
    setTestsState(newTestsState);
  }

  const renderTestConfig = (testDetails) => {
    return (
      <FormControl variant="outlined" size="small">
        <InputLabel id="outlined-level-native-simple">Level</InputLabel>
        <Select
          labelId="outlined-level-native-simple"
          value={testDetails.level}
          onChange={event => handleChange(event, testDetails.name)}
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
              onToggleTest={e => toggleTestEnabled(e, test.name)}
              testDetails={test}
              key={`${attributeData.id}${test.id}`}
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