import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";

export default function({
  id,
  name,
  picture,
  age,
  breed,
  location,
  adopted,
  onClick
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={name} />
      <CardMedia className={classes.media} image={picture} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Breed</strong>: <span>{breed}</span>
          <br />
          <strong>Age</strong>: <span>{age}</span>
          <br />
          <strong>Location</strong>: <span>{location}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {adopted ? (
          <span>{name} has a home now</span>
        ) : (
          <Button size="large" color="primary" value={id} onClick={onClick}>
            Adopt
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
