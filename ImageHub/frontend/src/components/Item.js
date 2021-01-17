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

export default function Item(props){
    const classes = useStyles();
    // should come from props
    // const itemProps = {
    //     url: props.url,
    //     name: props.name,
    //     price: props.price,
    //     discount: props.discount
    // }

    const itemProps = {
        url: 'https://uploads7.wikiart.org/images/leonardo-da-vinci/mona-lisa.jpg',
        name: 'Mona Lisa',
        price: 100521.23,
        discount: 0
    }

    function getPriceWithDiscount(){
        let price = itemProps.price;
        if (itemProps.discount > 0){
            return ""+price - price*itemProps.discount;
        }

        return ""+price
    }

    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`${itemProps.url}`}
              title={`${itemProps.name}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {itemProps.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {itemProps.discount > 0
                    ?   <Typography variant="body2" color="textSecondary" component="p">
                            {`${itemProps.price}$`}
                        </Typography>
                    :   <>
                            <Typography className={classes.afterDisc} variant="body2" color="textSecondary" component="p">
                                {this.getPriceWithDiscount()}
                            </Typography>
                            <Typography className={classes.beforeDisc} variant="body2" color="textSecondary" component="p">
                                {`${itemProps.price}$`}
                            </Typography>
                        </>
                        
                }
            </Grid>
          </CardActions>
        </Card>
      );
}