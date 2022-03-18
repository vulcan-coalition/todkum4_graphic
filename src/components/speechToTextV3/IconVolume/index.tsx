import React, { } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(5),
      height: theme.spacing(7),
    },
  }),
);

interface Props {
  color: any,
  height: any

}

const IconVolume: React.FC<Props> = ({
  color,
  height
}) => {
  const classes = useStyles()
  return (
    <>
      <Icon className={classes.large}>
        <svg width="10" height={height} viewBox="0 0 10 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="30" rx="5" fill={color} />
        </svg>
      </Icon>
    </>
  );
}

export default IconVolume;