import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Divider,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: 360,
    margin: "auto",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

function Main({setOpenAlert, setContentAlert}) {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const createSkills = array => array.map(skill => " " + skill);

  useEffect(() => {
    fetch(`/api/cv/get/all`).then(res => {
      if (res.status !== 200) {
        console.log(res)
        throw new Error(res.status + " " + res.statusText);
      }

      return res.json();
    }).then(data => {
      setCvs(data);
      setLoading(false);
    }).catch((e) => {
      setContentAlert({type: "error", message: e.message})
      setOpenAlert(true)
    });
  }, []);

  return (
    <React.Fragment>
      <List className={classes.container}>
        {!loading && cvs ? (
          cvs.map((user) => {
            return (
              <Link
                to={`/view#${user._id}`}
                key={user._id}
                className={classes.link}
              >
                <ListItem>
                  <ListItemText
                    primary={`${user.first_name} ${user.last_name}`}
                    secondary={`( ${createSkills(user.skills)} ) ${user.current_position}`}
                  />
                </ListItem>
                <Divider />
              </Link>
            )
          })
        ) : (
          <React.Fragment>
            <Skeleton animation="wave" height={80} />
            <Skeleton animation="wave" height={80} />
            <Skeleton animation="wave" height={80} />
          </React.Fragment>
        )}
      </List>
    </React.Fragment>
  );
}

export default Main;
