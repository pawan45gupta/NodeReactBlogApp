import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, deepPurple, green } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 'auto',
    width: '50%',
    padding: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
   }
}));

export default function RecipeReviewCard({ blog, isAdmin, onDeleteBlog }) {
  const classes = useStyles();
  const avatarClasses = ["avatar","greenAvatar","purpleAvatar"];

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes[avatarClasses[Math.floor(Math.random() * 3)]]}>
            {blog.title.charAt(0).toLocaleUpperCase()}
          </Avatar>
        }
        action={
            isAdmin ?
            <IconButton aria-label="Delete">
            <DeleteIcon id={blog.id} onClick={onDeleteBlog}/>
            </IconButton> : null
        }
        title={blog.title}
        subheader={new Date().toJSON().slice(0,10).replace(/-/g,'-')}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {blog.description}
        </Typography>
      </CardContent>
    </Card>
  );
}