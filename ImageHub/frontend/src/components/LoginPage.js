import React, { useState, useEffect } from "react";
import { FormControl, Grid, TextField, Button, Paper   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 700,
    margin: `${theme.spacing(50)}px auto`,
    padding: theme.spacing(2),
  },
  text: {
    minWidth: 400,
  },
  icon: {
    height: 80,
    width: 80
  }
}));

export default function LoginPage(props){
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState('');
    const [error, setError] = useState('');
    const [csrf, setCsrf] = useState('');
    
    useEffect(() => {
        console.log('we are at login page')
        getSession();
    }, []);

    function isResponseOk(response) {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }


    const getCSRF = () => {
        fetch("/api/csrf/", {
          credentials: "same-origin",
        })
        .then((res) => {
          let csrfToken = res.headers.get("X-CSRFToken");
          setCsrf(csrfToken);
          console.log(csrfToken);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    
    const getSession = () => {
        fetch("/api/session/", {
          credentials: "same-origin",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.isAuthenticated) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            getCSRF();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }

    const login = (event) => {
        event.preventDefault();
        fetch("/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf,
          },
          credentials: "same-origin",
          body: JSON.stringify({username: username, password: password}),
        })
        .then(isResponseOk)
        .then((data) => {
          console.log(data);
          setIsAuthenticated(true);
          setUsername("");
          setPassword("");
          setError("");
        })
        .catch((err) => {
          console.log(err);
          setError("Wrong username or password.");
        });
      }


    return  ( <div className={classes.root}>
                <Paper className={classes.paper}>
                <Grid  container direction="column"  spacing={2} alignItems="center" wrap="nowrap">
                          <Grid item lg={12} alignItems="center">
                              <AccountCircle color="secondary" className={classes.icon} />
                          </Grid>
                          <Grid  item lg={12}  direction="row">
                              <TextField 
                                  className={classes.text}
                                  label="Username"
                                  type="username"
                                  autoComplete="username"
                                  variant="outlined"
                                  onChange={onUsernameChange}
                              />
                              
                          </Grid>
                          <Grid item lg={12}  direction="row">
                              <TextField 
                                  className={classes.text}
                                  label="Password"
                                  type="password"
                                  autoComplete="current-password"
                                  variant="outlined"
                                  onChange={onPasswordChange}
                              />
                          </Grid>
                          <Grid item lg={12}  alignItems="center">
                              <Button onClick={login} size="large" variant="contained" color="primary">
                                  Login
                              </Button>
                          </Grid>
                          <Grid item lg={12} justify="flex-end"  direction="row">
                              <Link to={'/register'} >
                                  Don't have an account? Sign Up
                              </Link>
                        </Grid>
                      </Grid>

              </Paper>
              </div>
      
    )
}