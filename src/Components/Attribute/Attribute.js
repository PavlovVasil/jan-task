import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Test } from '../index'
import { useCardStyles } from './styles';
import PropTypes from 'prop-types'

export const Attribute = ({ attributeData, tests }) => {
  const classes = useCardStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.textContainer}>
          <div>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            Теsts
          </div>
          <div className={clsx(classes.descriptionContainer, classes.textContainer)}>
            <div>
              <Typography variant="body2" color="textSecondary" component="p">
                {attributeData.name}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="textSecondary" component="p">
                {attributeData.description}
              </Typography>
            </div>
          </div>
          <Test />
        </div>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  )
}

Attribute.propTypes = {
  attributeData: PropTypes.object.isRequired,
  tests: PropTypes.arrayOf(PropTypes.object)
}