import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  afterDisc: {
      color: 'red'
  },
  beforeDisc: {
    textDecoration: "line-through",
  }
});

export default function SellPage(props){
    const classes = useStyles();

    function handleItemButtonPressed() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votes_to_skip: this.state.votesToSkip,
          guest_can_pause: this.state.guestCanPause,
        }),
      };
      fetch("/api/create-item", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    };


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography>Create Item To Sell</Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <FormControl component="fieldset">

              </FormControl>
            </Grid>

        </Grid>
      );
}