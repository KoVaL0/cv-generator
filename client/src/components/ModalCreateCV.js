import React from 'react';
import {
  Button,
  IconButton,
  Typography,
  Chip,
  makeStyles,
  Dialog,
  Slide,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import {Form, FieldArray, Formik} from "formik";
import Person from "@material-ui/icons/Person";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as Yup from 'yup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
  },
  input: {
    margin: "10px",
    maxWidth: 150,
  },
  button__cancel: {
    display: "inline-block",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  button__add: {
    margin: "auto 0",
    padding: 0,
  },
  input__add: {
    display: "flex",
    maxHeight: 65,
    alignItems: "flex-start",
  },
  input__block: {
    display: "flex",
    width: "100%",
    maxWidth: "240px",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  label: {
    display: "flex",
    width: "100%",
    maxWidth: 240,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
}));

const initialValues = {
  first_name: '',
  last_name: '',
  current_position: '',
  skill: '',
  skills: [],
  projectActivities: [
    {
      id: 0,
      position: '',
      tech: '',
      techs: [],
      description: '',
    },
  ],
};

const ValidateSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .trim()
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .trim()
    .required('Required'),
  current_position: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .trim()
    .required('Required'),
  skill: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .trim(),
  skills: Yup.array().min(1, 'Add skill').required('Required'),
  projectActivities: Yup.array().of(Yup.object().shape({
    position: Yup.string()
      .min(2, 'Too Short!')
      .max(40, 'Too Long!')
      .trim()
      .required('Required'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .trim()
      .max(40, 'Too Long!'),
    techs: Yup.array().min(1, 'Add tech').required('Required'),
  })),
});

export default function ModalCreateCV({openModal, handleCloseModal, setOpenAlert, setContentAlert}) {
  const classes = useStyles();

  const submitCv = (values) => {
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      current_position: values.current_position,
      skills: values.skills,
      projectActivities: values.projectActivities.map((project) => ({
        techs: project.techs,
        position: project.position,
        description: project.description,
      })),
    };
    fetch(`/api/cv/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status !== 201) {
        throw new Error();
      }

      return res.json();
    }).then((data) => {
      setContentAlert({type: "success", message: data});
      setOpenAlert(true);
    }).catch(() => {
      setContentAlert({type: "error", message: "CV no has been created"});
      setOpenAlert(true);
    });
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
    >
      <div className={classes.header}>
        <DialogTitle id="form-dialog-title">
        <span>
          Create CV
        </span>
        </DialogTitle>
        <DialogActions className={classes.button__cancel}>
          <Button
            size="small"
            color="primary"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </DialogActions>
      </div>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidateSchema}
          onSubmit={(values, actions) => {
            submitCv(values);
            actions.resetForm();
            handleCloseModal();
          }}
        >
          {({values, errors, touched, handleBlur, handleChange}) => (
            <Form className={classes.container}>
              <div className={classes.label}>
                <Typography variant={"h6"}>Person information</Typography>
              </div>
              <div className={classes.input__block}>
                <TextField
                  type="text"
                  label="Name"
                  size="small"
                  name="first_name"
                  variant="outlined"
                  id="outlined-basic"
                  value={values.first_name}
                  onFocus={handleBlur}
                  onChange={handleChange}
                  className={classes.input}
                  error={errors.first_name && touched.first_name}
                  helperText={(errors.first_name && touched.first_name) ? errors.first_name : ""}
                />
              </div>
              <div className={classes.input__block}>
                <TextField
                  type="text"
                  label="Surname"
                  size="small"
                  name="last_name"
                  variant="outlined"
                  id="outlined-basic"
                  value={values.last_name}
                  onFocus={handleBlur}
                  onChange={handleChange}
                  className={classes.input}
                  error={errors.last_name && touched.last_name}
                  helperText={(errors.last_name && touched.last_name) ? errors.last_name : ""}
                />
              </div>
              <div className={classes.input__block}>
                <TextField
                  type="text"
                  label="Сurrent position"
                  size="small"
                  name="current_position"
                  variant="outlined"
                  id="outlined-basic"
                  value={values.current_position}
                  onFocus={handleBlur}
                  onChange={handleChange}
                  className={classes.input}
                  error={errors.current_position && touched.current_position}
                  helperText={(errors.current_position && touched.current_position) ? errors.current_position : ""}
                />
              </div>
              <FieldArray name="skills">
                {({insert, remove}) => (
                  <div className={classes.input__block}>
                    <div>
                      {values.skills.length > 0 &&
                      <React.Fragment>
                        <div>
                          Core Skills
                        </div>
                        {values.skills.map((skill, index) => (
                          <span key={skill}>
                              <Chip
                                key={skill}
                                label={skill}
                                onDelete={() => remove(index)}
                              />
                            </span>
                        ))}
                      </React.Fragment>
                      }
                      <div className={classes.input__add}>
                        <TextField
                          type="text"
                          label="Skill"
                          size="small"
                          name='skill'
                          variant="outlined"
                          id="outlined-basic"
                          value={values.skill}
                          onFocus={handleBlur}
                          onChange={handleChange}
                          className={classes.input}
                          error={errors.skills && touched.skill}
                          helperText={(errors.skills && touched.skill) ? errors.skills : ""}
                        />
                        <IconButton
                          name='skills'
                          className={classes.button__add}
                          disabled={values.skill.length <= 1 || !values.skill.trim()}
                          onClick={() => insert(values.skills.length, values.skill)}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                )}
              </FieldArray>
              {values.projectActivities.map((project, id) => (
                <React.Fragment key={project.id}>
                  <div className={classes.label}>
                    <Typography variant={"h6"}>Project Activities</Typography>
                    <FieldArray name={`projectActivities`}>
                      {({remove}) => (
                        (id !== 0) ? (
                          <IconButton
                            className={classes.button__add}
                            onClick={() => remove(id)}
                          >
                            <DeleteForeverIcon style={{color: "#d04123"}}/>
                          </IconButton>
                        ) : ""
                      )}
                    </FieldArray>
                  </div>
                  <div className={classes.input__block}>
                    <TextField
                      type="text"
                      size="small"
                      label="Position"
                      variant="outlined"
                      id="outlined-basic"
                      name={`projectActivities[${id}].position`}
                      className={classes.input}
                      onFocus={handleBlur}
                      onChange={handleChange}
                      value={project.position}
                      error={(
                        errors?.projectActivities && errors.projectActivities[id]?.position
                      ) && (
                        touched?.projectActivities && touched.projectActivities[id]?.position
                      )}
                      helperText={(
                        errors?.projectActivities && errors.projectActivities[id]?.position
                      ) && (
                        touched?.projectActivities && touched.projectActivities[id]?.position
                      ) ? errors.projectActivities[id].position : ""}
                    />
                    <FieldArray name="projectActivities">
                      {({replace}) => (
                        <React.Fragment>
                          {project.techs.length > 0 &&
                          <span>
                            <div>
                              Techs
                            </div>
                            {project.techs.map((tech, index) => (
                              <FieldArray name={`projectActivities[${id}].techs`} key={tech + index}>
                                {({remove}) => (
                                  <Chip
                                    key={tech}
                                    label={tech}
                                    onDelete={() => remove(index)}
                                  />
                                )}
                              </FieldArray>
                            ))}
                          </span>
                          }
                          <div className={classes.input__add}>
                            <TextField
                              type="text"
                              label="Tech"
                              size="small"
                              variant="outlined"
                              id="outlined-basic"
                              name={`projectActivities[${id}].tech`}
                              value={project.tech}
                              className={classes.input}
                              onFocus={handleBlur}
                              onChange={handleChange}
                              error={(
                                errors?.projectActivities && errors.projectActivities[id]?.techs
                              ) && (
                                touched?.projectActivities && touched.projectActivities[id]?.tech
                              )}
                              helperText={(
                                errors?.projectActivities && errors.projectActivities[id]?.techs
                              ) && (
                                touched?.projectActivities && touched.projectActivities[id]?.tech
                              ) ? errors.projectActivities[id].techs : ""}
                            />
                            <IconButton
                              className={classes.button__add}
                              disabled={values.projectActivities[id].tech.length <= 1 || !values.projectActivities[id].tech.trim()}
                              onClick={() => replace(id, {...project, techs: [...project.techs, project.tech]})}>
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </div>
                          <div>
                            <TextField
                              rows={2}
                              multiline
                              type="text"
                              size="small"
                              variant="outlined"
                              label="Description"
                              id="outlined-multiline-static"
                              name={`projectActivities[${id}].description`}
                              value={values.projectActivities[id].description}
                              className={classes.input}
                              onFocus={handleBlur}
                              onChange={handleChange}
                              error={(
                                errors?.projectActivities && errors.projectActivities[id]?.description
                              ) && (
                                touched?.projectActivities && touched.projectActivities[id]?.description
                              )}
                              helperText={(
                                errors?.projectActivities && errors.projectActivities[id]?.description
                              ) ? errors.projectActivities[id]?.description : ""}
                            />
                          </div>
                        </React.Fragment>
                      )}
                    </FieldArray>
                  </div>
                </React.Fragment>
              ))}
              <FieldArray name={"projectActivities"}>
                {({push}) => (
                  <IconButton
                    onClick={() => {
                      push({
                        id: values.projectActivities.length,
                        position: '',
                        tech: '',
                        techs: [],
                        description: '',
                      });
                    }}
                  >
                    <AddCircleOutlineIcon fontSize="large" />
                  </IconButton>
                )}
              </FieldArray>
              <Button variant="contained" type="submit">
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
