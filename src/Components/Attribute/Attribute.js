import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WarningIcon from '@material-ui/icons/Warning';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import debounce from 'lodash.debounce';
import { Test } from '../index'
import { useCardStyles } from './styles';
import PropTypes from 'prop-types';

export const Attribute = ({ attributeData, tests }) => {
  const classes = useCardStyles();

  const possibleTests = tests.filter(test =>
    test.typecastScope.includes(attributeData.typecast));

  // This keeps the possible tests for this attribute, some of which might
  // be pre-configured
  const configuredTests = attributeData.channels[0].tests.map(test => {
    const details = possibleTests.filter(testDetails =>
      testDetails.code === test.code)[0]
    return {
      ...test,
      id: details.id,
      enabled: true,
      error: false,
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
        error: false,
        name: possibleTest.name,
        description: possibleTest.description,
        expanded: false,
        seq: null
      }
      configuredTests.push(newConfiguredTest)
    }
  });

  const [testsState, setTestsState] = useState(configuredTests);

  const sendData = (newTestsState) => {
    try {
      fetch(`http://localhost:3001/attributes/${attributeData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTestsState)
      })
     
    } catch (e) {
      console.log(e)
    }
  }

  const debouncedSendData = useRef(debounce((newTestsState) => 
  sendData(newTestsState), 500)).current;

  // When a test gets enabled/disabled
  const toggleTestEnabled = (e, testName) => {
    e.stopPropagation();
    const newTestsState = [...testsState];
    const index = newTestsState.findIndex(element => element.name === testName);
    newTestsState[index].enabled = !newTestsState[index].enabled;
    setTestsState(newTestsState);
    debouncedSendData(newTestsState);
  }


  // When the test level changes
  const handleLevelChange = (event, testName) => {
    const newValue = event.target.value;
    const newTestsState = [...testsState];
    const index = newTestsState.findIndex(element => element.name === testName);
    newTestsState[index].level = newValue;
    setTestsState(newTestsState);
    debouncedSendData(newTestsState);
  }

  // When something in the blacklist changes
  const handleBlacklistChange = (event) => {
    const newValue = event.target.value.split(', ');
    const newTestsState = [...testsState];
    const index = newTestsState.findIndex(element => element.name === 'Blacklist');
    newTestsState[index].params[0].value = newValue;
    setTestsState(newTestsState);
    debouncedSendData(newTestsState);
  }

  // When something in the range values changes
  const handleRangeChange = (event, type) => {
    const newValue = parseInt(event.target.value, 10);
    const newTestsState = [...testsState];
    const index = newTestsState.findIndex(element => element.name === 'Range');

    newTestsState[index].params[type === "From"? 0 : 1].value = newValue;
    if(type === "To") {
      const hasError = parseInt(newTestsState[index].params[0].value, 10) > 
        parseInt(newTestsState[index].params[1].value, 10);        
      newTestsState[index].params[1].error = hasError;
    }
    setTestsState(newTestsState);
    debouncedSendData(newTestsState);
  }

  // This renders the different test inputs and dropdows with its options
  const renderTestConfig = (test) => {
    return (
      // Render the test's level select
      <div className={classes.testOptionsContainer}>
        <div className="warning-container">
        <FormControl variant="outlined" size="small" >
          <InputLabel
            htmlFor="warning-select"
            id="outlined-level-native-simple">Level
          </InputLabel>
          <Select
            id="warning-select"
            label="Level"
            labelId="outlined-level-native-simple"
            value={test.level}
            onChange={event => handleLevelChange(event, test.name)}
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
        </div>
        {test.name === 'Blacklist' &&
          <TextField
            id="outlined-multiline-static"
            label="List of words"
            multiline
            rows={4}
            value={test.params[0] &&
              test.params[0].value.join(', ')
            }
            variant="outlined"
            onChange={handleBlacklistChange}
          />
        }
        {test.name === 'Range' &&
          <div className={classes.rangeInputsContainer}>
            <TextField
              size="small"
              label="From"
              type="number"
              variant="outlined"
              value={test.params[0] && parseInt(test.params[0].value, 10)}
              onChange={(e) => handleRangeChange(e, "From")}
            />
            <TextField
              error={test.params[1] && test.params[1].error}
              size="small"
              label="To"
              type="number"
              variant="outlined"
              helperText={test.params[1] &&
                test.params[1].error &&
                "Input has to be bigger than From"
              }
              value={test.params[1] && parseInt(test.params[1].value, 10)}
              onChange={(e) => handleRangeChange(e, "To")}
            />
          </div>
        }
      </div>
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
          {testsState.map(test =>
            <Test
              onToggleTest={e => toggleTestEnabled(e, test.name)}
              testDetails={test}
              key={`${attributeData.id}${test.id}`}
              renderTestConfig={() => renderTestConfig(test)}
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