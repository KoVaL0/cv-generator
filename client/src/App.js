import React from 'react';
import {Container, Fab, makeStyles, Snackbar, CssBaseline} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Alert} from "@material-ui/lab";
import Error404 from "./page/Error404";
import Main from "./page/Main";
import ViewCV from "./page/ViewCV";
import Header from "./components/Header";
import ModalCreateCV from "./components/ModalCreateCV";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

export default function App() {
  const [openModal, setOpenModal] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [contentAlert, setContentAlert] = React.useState({
    type: "error",
    message: "Что-то пошло не так! Попробуйте перезагрузить страницу."
  });
  const classes = useStyles();

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={contentAlert.type}>
            {contentAlert.message}
          </Alert>
        </Snackbar>

        <Switch>
          <Route exact path="/">
            <Header />
            <Main
              setContentAlert={setContentAlert}
              setOpenAlert={setOpenAlert}
            />
            <Fab
              className={classes.fab}
              color="primary"
              aria-label="add"
              onClick={() => handleClickOpenModal()}
            >
              <AddIcon />
            </Fab>
            <ModalCreateCV
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              setContentAlert={setContentAlert}
              setOpenAlert={setOpenAlert}
            />
          </Route>
          <Route path="/view">
            <Header back={true} />
            <ViewCV
              setContentAlert={setContentAlert}
              setOpenAlert={setOpenAlert}
            />
          </Route>
          <Route path="/">
            <Header />
            <Error404 />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};
