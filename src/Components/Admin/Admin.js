import React, { useEffect, useState } from "react";
import { pink, grey } from "@material-ui/core/colors";
import logo from "../../images/logo.jpg";
import {url} from "../../Api/Api"
import {
  Update,
  Check,
  PersonAdd,
  MailOutline,
  VisibilityOff,
  Menu,
  Lock,
  Drafts,
  LockOpenTwoTone,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import {
  IconButton,
  Box,
  Grid,
  Paper,
  Container,
  Typography,
  Divider,
  Dialog,
  Button,
  Input,
  DialogContentText,
  DialogTitle,
  makeStyles,
  AppBar,
  Toolbar,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import DrawerData from "../DrawerData/DrawerData";
import AdminSignUp from "./AdminSignUp";
// import AddHotelManager from "./AddHotelManger/AddHotelManager";
const useStyles = makeStyles((theme) => ({
  root: {},
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
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
var token = localStorage.getItem("token")
const Admin = () => {
  const classes = useStyles();
  const history = useHistory();
   
  
  const admin = localStorage.getItem("admin");
  const [state, setstate] = useState([]);
  const [stateS, setstateS] = useState([]);
  const [loadingS, setloadingS] = useState(false);
  const [loading, setloading] = useState(false);
  const [opentwo, setOpentwo] = useState(false);
  const [openthree, setOpenthree] = useState(false);
  // this is for add hotel manager
  const [openfour, setopenfour] = useState(false);
  const [id, setid] = useState();
  const [update, setupdate] = useState();
  const [emailpattern, setemailpattern] = useState(true);
  const [opendrawer, setopendrawer] = useState(false);
  const [opendrawertwo, setopendrawertwo] = useState(false);
  const [OpenAdmin, setOpenAdmin] = useState(false);
  const [statenew, setstatenew] = useState();
 
  // admin logout
  const logoutAdmin = () => {
    localStorage.removeItem("admin");
    window.location.reload();
  };
  // add a new user
  async function userSignsUp(e) {
    e.preventDefault();
    try {
      setloadingS(true);
      // if (stateS.email === undefined) {
      //   toast.error("Don't left any field empty");
      // }

      const { data } = await axios.post(
        `${url}/signup`,
        stateS
      );
      console.log(data);
      setloadingS(false);
      //here is the error to check whether response data is coming
      //handle this one
      //  setdupUser(data.driver)
      if (data.passerr) {
        toast.error("Password and confirm password must be same");
      }
      if (data.code) {
        toast.error("User already exists try different one");
      }
      if (data.name === "ValidationError") {
        setemailpattern(false);
        toast.error("Put a valid email");
      }
      if (!data.errors && !data.passerr && !data.code) {
        localStorage.setItem("user", data);
        setloadingS(false);
        toast.success("New user Added");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setloadingS(false);
      toast.error("All fields are mandatory to fill");
    }
  }
  // admin login
   const adminSignsIn = async () => {
    setloading(true);
    const { data } = await axios.post(
      `${url}/signin`,statenew,
      {
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
              },
      }
    );
    console.log(data)
    setloading(false);
    if (data.success) {
      localStorage.setItem("user", data.user.email);
      toast.success("Thanks for login");
      // window.location.reload();
    }
    if (data.err) {
      toast.error("Invalid email or passoword");
    }
  };
  // getall data
  //notice that data which is coming from the backend is always inside an object
  //show full list data get

  // sent value of the tender and token from here to backend for verify
  
  //   array of an object
  function handleCloseTwo() {
    setOpentwo(false);
  }
  async function edit(id) {
    setOpentwo(true);
    setid(id);
    const { data } = await axios.get(
      `${url}/findSingleUser/${id}`
    );
    // console.log(data.data);
    const totalData = data.data;
    setupdate(totalData);
  }
  // UPDATE User
  async function updateUser() {
    setloadingS(true);
    const { data } = await axios.put(
      `${url}/udpateUser/${id}`,
      stateS
    );
    const userConfirmed = data.data.email;
    if (userConfirmed) {
      toast.success("User updated succeed");
      setloadingS(false);
      window.location.reload();
    }
  }

  //DELETE USER
  async function delet(id) {
    const { data } = await axios.delete(
      `${url}/deleteUser/${id}`
    );
    console.log(data.success);
    if (data.success) {
      toast.success("User deleted");
      localStorage.removeItem("user");
      window.location.reload();
    }
  }
  return (
    <div>
      <Toaster />
      <AdminSignUp OpenAdmin={OpenAdmin} setOpenAdmin={setOpenAdmin} />
      <DrawerData opendrawer={opendrawer} setopendrawer={setopendrawer} />
      {/* add the hotel manager */}
      {/* <AddHotelManager openfour={openfour} setopenfour={setopenfour}/> */}
      {/* navbar */}
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
            >
              <img width="80px" src={logo} alt="" />
            </Typography>
          </Button>
          {admin ? (
            <Button
              onClick={logoutAdmin}
              variant="contained"
              size="small"
              style={{ background: "rgb(254,170,2)", color: "black" }}
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      {/* Add new user by admin dialgue */}

      <Dialog
        onClose={() => setOpenthree(false)}
        aria-labelledby="simple-dialog-title"
        open={openthree}
      >
        <Toaster />
        <DialogTitle>
          <IconButton
            style={{ padding: "0px" }}
            onClick={() => setOpenthree(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContentText>
          <Box mb={1} mt={1}>
            <Typography
              variant="h4"
              color="primary"
              style={{ textAlign: "center" }}
            >
              Register
            </Typography>
          </Box>
          <Divider />

          <Container
            maxWidth="md"
            style={{ paddingLeft: "70px", paddingRight: "70px" }}
          >
            <Box mt={1} textAlign="center">
              <Box>
                <PersonAdd
                  style={{ color: pink[500], width: "50px", height: "50px" }}
                />
              </Box>
              <Divider />
              <br />
              <Input
                onChange={(e) =>
                  setstateS({ ...stateS, username: e.target.value })
                }
                endAdornment={<MailOutline color="primary" fontSize="small" />}
                type="email"
                placeholder="Enter Email"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              <Input
                onChange={(e) =>
                  setstateS({ ...stateS, email: e.target.value })
                }
                endAdornment={<MailOutline color="primary" fontSize="small" />}
                type="email"
                placeholder="Enter Email"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              <Input
                onChange={(e) =>
                  setstateS({ ...stateS, password: e.target.value })
                }
                endAdornment={
                  <VisibilityOff color="primary" fontSize="small" />
                }
                type="password"
                placeholder="Enter Password"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              <Input
                onChange={(e) =>
                  setstateS({ ...stateS, cpassword: e.target.value })
                }
                endAdornment={
                  <VisibilityOff color="primary" fontSize="small" />
                }
                type="password"
                placeholder="Confirm Password"
              />

              <br />
              <br />
              {loadingS ? (
                <Box>
                  <ClipLoader color="blue" />
                </Box>
              ) : (
                <>
                <Button
                  style={{ marginBottom: "10px" }}
                  color="primary"
                  variant="contained"
                  onClick={userSignsUp}
                >
                 
                  Sign up
                </Button>
        
</>
              )}
            </Box>
          </Container>
        </DialogContentText>
      </Dialog>

      {/* update a user dialouge */}
      <Dialog
        onClose={handleCloseTwo}
        aria-labelledby="simple-dialog-title"
        open={opentwo}
      >
        <Toaster />
        <DialogTitle>
          <IconButton
            style={{ padding: "0px" }}
            onClick={() => setOpentwo(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContentText>
          <Box mb={1} mt={1}>
            <Typography
              variant="h4"
              color="primary"
              style={{ textAlign: "center" }}
            >
              Update User
            </Typography>
          </Box>
          <Divider />

          <Container
            maxWidth="md"
            style={{ paddingLeft: "70px", paddingRight: "70px" }}
          >
            <Box mt={1} textAlign="center">
              <Box>
                <Update
                  style={{ color: pink[440], width: "50px", height: "50px" }}
                />
              </Box>
              <Divider />
              <br />

              {update === undefined ? (
                <ClipLoader />
              ) : (
                <>
                  <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, email: e.target.value })
                    }
                    type="email"
                    placeholder="Update User Email"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.email}
                    required="true"
                  />
                  <br />
                  <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, password: e.target.value })
                    }
                    type="password"
                    placeholder="Update Password"
                    style={{ marginBottom: "10px" }}
                    defaultValue={update.password}
                    required="true"
                  />
                  <br />
                  <Input
                    onChange={(e) =>
                      setstateS({ ...stateS, cpassword: e.target.value })
                    }
                    defaultValue={update.cpassword}
                    type="password"
                    placeholder="Update Confirm Password"
                  />
                </>
              )}

              <br />
              <br />
              {loadingS ? (
                <Box>
                  <ClipLoader color="blue" />
                </Box>
              ) : (
                <Button
                  style={{ marginBottom: "10px" }}
                  color="primary"
                  variant="contained"
                  onClick={updateUser}
                >
                  <Check /> Update User
                </Button>
              )}
            </Box>
          </Container>
        </DialogContentText>
      </Dialog>

      {admin ? (
        <Typography
        variant="h5"
        color="secondary"
        style={{textAlign:"center"}}
        >welcome admin</Typography>
      ) : (
        <Container maxWidth="sm">
          <Grid container component={Box} my={3}>
            <Divider />

            <Grid container>
              <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                <Paper elevation={5} style={{ height: "110%", width: "200%" }}>
                  <Box
                    style={{ backgroundColor: "rgb(254,170,2)", height: "20%" }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        style={{
                          color: "white",
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        <Lock fontSize="small" /> tender/bidder login
                      </Typography>
                    </Box>
                  </Box>
                  <Box textAlign="center">
                    <Box mb={1}>
                    <br />
                      <Input
                        placeholder="username"
                        onChange={(e) =>
                          setstatenew({ ...statenew, username: e.target.value })
                        }
                        type="text"
                        endAdornment={
                          <Drafts fontSize="small" color="primary" />
                        }
                      />
                      <br />
                      <Input
                        placeholder="Email"
                        onChange={(e) =>
                          setstatenew({ ...statenew, email: e.target.value })
                        }
                        type="email"
                        endAdornment={
                          <Drafts fontSize="small" color="primary" />
                        }
                      />
                    </Box>
                    <Box>
                      <Input
                        placeholder="Password"
                        type="password"
                        onChange={(e) =>
                          setstatenew({ ...statenew, password: e.target.value })
                        }
                        endAdornment={
                          <LockOpenTwoTone fontSize="small" color="primary" />
                        }
                      />
                    </Box>
                    <br />
                    <Box>
                      {loading ? (
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "rgb(254,170,2)",
                            width: "30%",
                            color: "white",
                          }}
                        >
                          ...
                        </Button>
                      ) : (
                        <>
                        <Button
                          onClick={adminSignsIn}
                          variant="contained"
                          style={{
                            backgroundColor: "rgb(254,170,2)",
                            width: "30%",
                            color: "white",
                          }}
                        >
                          Login
                        </Button>
  
          </>             )}
                    </Box>
                    <br />
                    Not already have an account?{" "}
                    <Button
                      size="small"
                      onClick={() => setOpenAdmin(true)}
                      style={{ color: "rgb(254,170,2)",border:"1px solid rgb(254,170,2)"  }} 
                      component={Box}
                      variant="outlined"
                    >
                      Sign up
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Admin;
