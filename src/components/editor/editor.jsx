import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, makeStyles } from "@material-ui/core";
import { Preview } from "./preview";
import {Leftbar} from "./leftbar";
import {Rightbar} from "./rightbar";
import { Navbar } from "./navbar";
import {Container} from "./container";
import {Add} from "./add"

const useStyles = makeStyles((theme) => ({
    right: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  }));

export const Editor = () => {
    const [files,setFiles] = useState([]);
    const onSuccess = (savedfiles)=>{
        setFiles(savedfiles)
    };
    // eslint-disable-next-line no-unused-vars
    const classes = useStyles();
    
    return (
        <div>
            <div>
                <ToastContainer/>
            </div>
            <Navbar />
            <Grid container>
                <Grid item sm={2} xs={2}>
                    <Leftbar />
                </Grid>
                <Grid item sm={7} xs={10}>
                    <Container onSuccess={onSuccess}/>
                    <Grid item sm={7} xs={4}>
                    <Preview files={files}/>
                </Grid>
                </Grid>

                <Grid item sm={2} xs={2}>
                    <Rightbar/>
                </Grid>
            </Grid>
            <Add />
        </div>
    )
}