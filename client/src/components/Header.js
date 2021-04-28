import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {Toolbar, Button} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {NavLink} from "react-router-dom";
import Logo from '../img/logo.svg'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `2px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: 'flex-start',
  },
  logo: {
    margin: "auto",
  },
  button: {
    position: "absolute",
  },
  textDecoration: {
    textDecoration: "none",
  }
}));

function Header(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.button}>
          {props.back ?
            <NavLink to="/" className={classes.textDecoration}>
              <Button>
                <ArrowBackIcon/>
              </Button>
            </NavLink> : null
          }
        </div>
        <NavLink to={'/'} className={classes.logo}>
          <img alt="Logo" src={Logo} width={100}/>
        </NavLink>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
