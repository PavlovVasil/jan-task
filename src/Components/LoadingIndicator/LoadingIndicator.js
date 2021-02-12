import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLoadingIndicatorStyles } from './styles'

export const LoadingIndicator = () => {
    const classes = useLoadingIndicatorStyles()
    return (
        <div className={classes.loadingIndicatorContainer}>
            <CircularProgress />
        </div>
    )
}
