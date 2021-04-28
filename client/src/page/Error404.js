import React from 'react';
import {Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
  },
}));

function Error404() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant={"h1"} className={classes.container}>
        Error 404
      </Typography>
    </React.Fragment>
  );
}

export default Error404;
