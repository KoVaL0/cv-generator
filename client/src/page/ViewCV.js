import React, {useEffect, useState} from 'react';
import {
  Container,
  Typography,
  makeStyles,
  Divider,
  Button,
  CircularProgress
} from '@material-ui/core';
import {saveAs} from 'file-saver';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "20px",
  },
  button__print: {
    display: 'flex',
    justifyContent: "flex-end",
  },
  project: {
    paddingLeft: '10px'
  },
  divider: {
    marginBottom: '20px'
  },
  loading: {
    margin: "auto"
  }
}));


const createSkills = (array) => {
  return array.map(skill => " " + skill);
}

function ViewCV({setOpenAlert, setContentAlert}) {
  const [cv, setCv] = useState()
  const [loading, setLoading] = useState(true)
  const [loadingDownload, setLoadingDownload] = useState(false)
  const classes = useStyles();

  const id_cv = window.location.hash.slice(1);

  const handlerError = (e) => {
    setContentAlert({type: "error", message: e.message});
    setOpenAlert(true);
  };

  const createPdf = async () => {
    try {
      setLoadingDownload(true);
      await fetch(`/api/cv/create-pdf?id=${id_cv}`).then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status + " " + res.statusText);
        }

        return res.blob()
      }).then((data) => {
        saveAs(data, `${id_cv}.pdf`);
      })
    } catch (e) {
      handlerError(e);
    }
    setLoadingDownload(false);
  };

  useEffect(() => {
    fetch(`/api/cv/get?id=${id_cv}`).then((res) => {
      if (res.status !== 200) {
        throw new Error(res.status + " " + res.statusText);
      }

      return res.json();
    }).then((data) => {
      setCv(data);
      setLoading(false);
    }).catch((e) => handlerError(e));
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="md" className={classes.container}>
        {!loading ? (
          <React.Fragment>
            <div className={classes.button__print}>
              <Button variant={"outlined"} onClick={() => createPdf()}>
                {loadingDownload ? "Loading..." : "Print"}
              </Button>
            </div>
            <Typography variant="h6">
              {cv.first_name} {cv.last_name} ({cv.current_position})
            </Typography>
            <Divider className={classes.divider} />
            <Typography>
              {`Core skills is ${createSkills(cv.skills)}`}
            </Typography>
            <Divider className={classes.divider} />
            <Typography>
              Projects
            </Typography>
            <Divider className={classes.divider} />
            {cv.projectActivities.map((project, id) => (
              <div key={project._id} className={classes.project}>
                <Typography>
                  {id + 1 + ". " + project.position}{project.description ? (", " + project.description) : ("")}
                </Typography>
                {project.techs.map((tech, id) => (
                  <Typography key={id} className={classes.project}>
                    - {tech}
                  </Typography>
                ))}
                <Divider className={classes.divider} />
              </div>
            ))}
          </React.Fragment>) : (
          <CircularProgress className={classes.loading} />
        )}
      </Container>
    </React.Fragment>
  );
}

export default ViewCV;
