import React, {useState, useEffect} from "react";
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
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

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
    const [csrf, setCsrf] = useState(props.csrf);
    const [name, setName] = useState(""); 
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [image, setImage] = useState(null);

    useEffect(() => {
     
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

      getCSRF();
    }, [])


    const handleItemButtonPressed = () => {

      let form_data = new FormData();
      form_data.append('image', image, image.name);
      form_data.append('name', name);
      form_data.append('price', price);
      form_data.append('description', description);
      form_data.append('discount_price', discount);
      console.log('form-data',form_data)
      // http://127.0.0.1:8000/
      axios.post('/api/create-item/', form_data, {
        headers: {
          'content-type': 'multipart/form-data',
          "X-CSRFToken": csrf
        }
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))



      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "multipart/form-data", "X-CSRFToken": csrf  },
      //   body: {
      //     name: name,
      //     description: description,
      //     price: price,
      //     discount: discount,
      //     file: selectedFile
      //   },
      //   credentials: "same-origin",
      // };
      // fetch("/api/create-item/", requestOptions)
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));
    };


    const handleImageChange = (e) => {
      setImage(e.target.files[0])
    };

    const onNameChange = (e) => {
      setName(e.target.value);
    }

    const onDescriptionChange = (e) => {
      setDescription(e.target.value);
    }

    const onPriceChange = (e) => {
      setPrice(e.target.value);
    }

    const onDiscountChange = (e) => {
      setDiscount(e.target.value);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography>Create Item To Sell</Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <FormControl component="fieldset">
                <input  type="file" id="image" ccept="image/png, image/jpeg" onChange={handleImageChange} required/>
                <TextField required={true} onChange={onNameChange} id="standard-basic" type="text" label="Name" helperText="Enter Item Name" />
                <TextField id="standard-basic" onChange={onDescriptionChange} type="text" label="Description" helperText="Enter Item Description" />
                <TextField 
                    required={true} 
                    defaultValue={1} inputProps={{
                      min: 1,
                      style: { textAlign: "center" },
                    }}  
                    onChange={onPriceChange} 
                    id="standard-basic" 
                    type="number" 
                    label="Price" 
                    helperText="Enter Item Description" 
                  />
                <TextField 
                  defaultValue={0}
                  id="standard-basic" 
                  inputProps={{
                    min: 1,
                    max:100,
                    style: { textAlign: "center" },
                  }} 
                  onChange={onDiscountChange} 
                  type="number" 
                  label="Discount" 
                  helperText="Enter Item Discount" />
              </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                color="primary"
                variant="contained"
                onClick={handleItemButtonPressed}
              >
                Create Item
              </Button>
            </Grid>
        </Grid>
      );
}