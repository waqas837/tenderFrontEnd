import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Box,
  Input,
} from "@material-ui/core";
import {
  TableContainer,
  Container,
  Divider,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Paper,
  OutlinedInput,
  DialogActions,
  DialogTitle,
  Typography,
  TextField,
} from "@material-ui/core";
import { pink, grey } from "@material-ui/core/colors";
import { url } from "../Api/Api";
import DrawerData from "./DrawerData/DrawerData";
import { useHistory } from "react-router-dom";
import { Menu,Delete } from "@material-ui/icons";

import { ClipLoader } from "react-spinners";
import axios from "axios";
import { IconButton, makeStyles, AppBar, Toolbar } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginRight: "auto",
    fontWeight: "bold",
  },
  titleTwo: {
    color: "white",
    fontStyle: "bold",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "90%",
    },
  },
  alignLeft: {
    textAlign: "left",
  },
  appBar: {
    marginBottom: "5px",
  },

  resposive: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  hover: {
    "&:hover": {
      background: grey[200],
    },
  },
}));
const ShowTenders = () => {
  const classes = useStyles();
  const [state, setstate] = useState([]);
  const [updateTender, setupdateTender] = useState([]);
  const [loading, setloading] = useState();
  const [open, setopen] = useState(false);
  const [opensingleAll, setopensingleAll] = useState(false);
  const [get, setget] = useState(false);
  const [loadingup, setloadingup] = useState(false);
  const [loadingups, setloadingups] = useState(false);
  const [loadingupall, setloadingupall] = useState(false);
  const [posterdata, setposterdata] = useState([]);
  const [showSingleAll, setshowSingleAll] = useState([]);
  const [opendrawer, setopendrawer] = useState(false);
  const [openfour, setopenfour] = useState(false);
  const [email, setemail] = useState("");
  const history = useHistory();


 


  //get a single record for next to edit
  const editRecord = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.get(`${url}/getAsingleUsr/${id}`);
      console.log(data);
      setget(data.user);
      setopen(true);
    } catch (error) {
      console.log(error);
    }
  };

  //  show all tenders for update
  const getallTender = async (email) => {
    try {
      setopensingleAll(true);
      setloadingupall(true);
      const { data } = await axios.get(`${url}/notifytender/${email}`);
      console.log(data);
      setshowSingleAll(data.data[0].tenderDetail);
      setloadingupall(false);
    } catch (error) {
      console.log(error);
    }
  };

  //  get all tenders for a single poster
  async function getAllTender(email) {
    try {
      setopenfour(true);
      setloadingups(true);
      const { data } = await axios.get(`${url}/showTendersForSingleTender/${email}`);
      setposterdata(data.data);
      setemail(data.email);
      console.log(data.data);
      setloadingups(false);
    } catch (error) {
      console.log(error);
    }
  }

  //  get one tender for update
  const getSingleTender = async (id) => {
    try {
      setopen(true);
      setloadingup(true);
      const { data } = await axios.get(`${url}/getSingleTender/${id}`);
      console.log(data);
      setupdateTender(data.user.tenderDetail[0]);
      setloadingup(false);
    } catch (error) {
      console.log(error);
    }
  };

  //  delete one tender for
  const deleteAllTendersForSingleUser = async (id) => {
    try {
      setloading(true);
      const { data } = await axios.delete(
        `${url}/deleteAllTendersForSingleUser/${id}`
      );
      console.log(data.data);
      window.location.reload();
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //get all the tenders
  const getAllteders = async () => {
    setloading(true);
    try {
      setloading(true);
      const { data } = await axios.get(`${url}/getAllteders`);
      console.log(data.data);
      setstate(data.data);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllteders();
  }, []);
  return (
    <div>
      {/* navbar */}
      <DrawerData opendrawer={opendrawer} setopendrawer={setopendrawer} />

      <AppBar position="static" color="inherit">
        <Toolbar>
          {/* menu icon button */}
          <IconButton onClick={() => setopendrawer(true)}>
            <Menu style={{ color: "rgb(254,170,2)" }} />
          </IconButton>
          {/* logo */}
          <Button
            style={{ width: "10%" }}
            size="small"
            onClick={() => history.push("/")}
            className={classes.title}
          >
            <Typography
              variant="h6"
              color="secondary"
              style={{ color: "hotpink" }}
              className={classes.titleTwo}
            ></Typography>
          </Button>
          {/* {admin ? (
            <Button
              onClick={logoutAdmin}
              variant="contained"
              size="small"
              style={{ background: "rgb(254,170,2)", color: "black" }}
            >
              Logout
            </Button>
          ) : null} */}
        </Toolbar>
      </AppBar>

      {/* this dialog is updating for the tenders+details */}

      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>
          <Typography variant="h4">First Tender for poster</Typography>
        </DialogTitle>
        {loadingup ? (
          <Typography
            style={{ margin: "30px" }}
            variant="h6"
            textAlign="center"
            component={Box}
          >
            Please wait...
          </Typography>
        ) : (
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                {" "}
                <p>title:</p>
                <Input defaultValue={updateTender.title} />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                {" "}
                <p>description:</p>
                <Input defaultValue={updateTender.description} />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                {" "}
                initialprice:
                <Input defaultValue={updateTender.initialprice} />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                {" "}
                image:
                <img
                  src={updateTender.selectedFile}
                  width="30px"
                  height="30px"
                  alt=""
                />
                <input type="file" />
              </Grid>

              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                {" "}
                expirytime:
                <Input defaultValue={updateTender.expirytime} />
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>

      {/* dialog for show all available tender */}
      <Dialog open={opensingleAll} onClose={() => setopensingleAll(false)}>
        <DialogTitle>
          <Typography variant="h4">All bidders for this tender</Typography>
        </DialogTitle>
        {loadingupall ? (
          <Typography
            style={{ margin: "30px" }}
            variant="h6"
            textAlign="center"
            component={Box}
          >
            Please wait...
          </Typography>
        ) : (
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <p>Bidder List:</p>
                {showSingleAll.map((val) => (
                  <>
                    <Button variant="outlined" color="secondary">
                      {val.bidderemail}
                    </Button>
                    <br />
                  </>
                ))}
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
      {/* end dialog for show all the avaible tender */}
      {/* last dialog */}

      <Dialog open={openfour} onClose={() => setopenfour(false)}>
        <DialogTitle>
          <Typography variant="h4">Current tender details</Typography>
        </DialogTitle>
        {loadingups ? (
          <Typography
            style={{ margin: "30px" }}
            variant="h6"
            textAlign="center"
            component={Box}
          >
            Please wait...
          </Typography>
        ) : (
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="body1" color="primary">
                  {" "}
                  Tender Name List
                </Typography>
                <Divider />
                <br />
                <br />
                {posterdata.map((val) =>
                 <>
                <li>{val._id}</li> 
                {/* <Button size="small"
                 onClick={()=>history.push(`/admin/updateSingleTender/${val._id}/${email}`)}
                 variant="contained">Edit</Button> */}
                  {/* <Button size="small"
                 variant="contained"><Delete/></Button> */}
                </>
                )}
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
      {/* end last dialog */}
      <Typography component={Box} textAlign="center" variant="h2">
        Tenders
      </Typography>
      <Container maxWidth="md"></Container>
      {loading ? (
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>loading...</h2>
      ) : (
        <Container>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead style={{ background: "black" }}>
                <TableRow>
                  <TableCell style={{ color: "white", fontWeight: "bolder" }}>
                    Tender's Email
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bolder" }}>
                    title
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bolder" }}>
                    description
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bolder" }}>
                    expiry time
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bolder" }}>
                    expiry date
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bolder" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.tenderDetail[0].title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.tenderDetail[0].description}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.tenderDetail[0].expirytime}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.tenderDetail[0].expirydate}
                    </TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteAllTendersForSingleUser(row._id)}
                      align="center"
                    >
                      Delete
                    </Button>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => getSingleTender(row._id)}
                      align="center"
                    >
                      Edit
                    </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => getAllTender(row.email)}
                      align="center"
                    >
                      show all tenders
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => getallTender(row.email)}
                      align="center"
                    >
                      See who has bid?
                    </Button>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </div>
  );
};

export default ShowTenders;
