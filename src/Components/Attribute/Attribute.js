import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Test } from '../index'
import { useCardStyles } from './styles';
import PropTypes from 'prop-types'

export const Attribute = ({ attributeData, tests }) => {
  const classes = useCardStyles();

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
          <Test />
        </div>
      </CardContent>
    </Card>
  )
}

Attribute.propTypes = {
  attributeData: PropTypes.object.isRequired,
  tests: PropTypes.arrayOf(PropTypes.object)
}