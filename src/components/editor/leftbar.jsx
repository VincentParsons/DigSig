import { Container, makeStyles, TextField, Typography, Link } from "@material-ui/core";
import BrushSharpIcon from '@mui/icons-material/BrushSharp';
import EventIcon from '@mui/icons-material/Event';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import IndeterminateCheckBoxSharpIcon from '@mui/icons-material/IndeterminateCheckBoxSharp';
import { Draggable } from 'react-drag-and-drop';
import {
  
  ExitToApp,
  Home,
  Person,
  Settings,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export const Leftbar = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Link
        href={"/"}>
          <Home className={classes.icon} />
          <Typography className={classes.text}>Homepage</Typography>
        </Link>
      </div>
      {/* disabled until needed */}
      {/* <div className={classes.item}>
        <Person className={classes.icon} />
        <Typography className={classes.text}>Signers</Typography>
      </div>
      <Draggable type="fruit" data={TextField} isDragAndDropElement={true}>
        <div className={classes.item}>
          <BrushSharpIcon className={classes.icon} />
          <Typography className={classes.text}>Sign</Typography>
        </div>
      </Draggable>
      <div className={classes.item}>
        <EventIcon className={classes.icon} />
        <Typography className={classes.text}>Date signed</Typography>
      </div>
      <div className={classes.item}>
        <IndeterminateCheckBoxSharpIcon className={classes.icon} />
        <Typography className={classes.text}>TextBox</Typography>
      </div>
      <div className={classes.item}>
        <TextFormatIcon className={classes.icon} />
        <Typography className={classes.text}>initial</Typography>
      </div>

      <div className={classes.item}>
        <Settings className={classes.icon} />
        <Typography className={classes.text}>Settings</Typography>
      </div> */}
      <div className={classes.item}>
      <Link
        href={"/"}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text}>Logout</Typography>
      </Link>
      </div>
    </Container>
  );
};