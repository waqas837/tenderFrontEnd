import React, { useState,useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import {url} from "../../Api/Api"
import {
  Close
} from "@material-ui/icons";
import {
  Typography,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContentText,
  Input,
  Divider,
  Container,
  CssBaseline,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const AdminSignUp = ({setOpenAdmin,OpenAdmin}) => {
  const [emailpattern, setemailpattern] = useState(true);
  const [loadingSS, setloadingSS] = useState(false);
  const [stateS, setstateS] = useState();
    // 
    useEffect(()=>{
      setstateS({...stateS,status:value});
    },[])
// setup tender and bidder radio buttons
const [value, setValue] = React.useState('tender');

 const handleChange = (event) => {
  setValue(event.target.value);
 
};
// add a new user
async function AdminSUp(e) {
    e.preventDefault();
    try {
      setloadingSS(true);
      // if (stateS.email === undefined) {
      //   toast.error("Don't left any field empty");
      // }

      const {data} = await axios.post(
        `${url}/signup/`,
        stateS,
      );
      console.log(data)
       setloadingSS(false);
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
        localStorage.setItem("token", data.token);
        setloadingSS(false);
        toast.success("Admin sign up succeed");
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setloadingSS(false);
      toast.error("All fields are mandatory to fill");
    }
  }
    return (
        <div>
        <CssBaseline/>
              <Dialog
        onClose={()=>setOpenAdmin(false)}
        aria-labelledby="simple-dialog-title"
        open={OpenAdmin}
      >
        <Toaster />
        <DialogTitle>
          <Grid container>
            <Grid item>
              <Typography
                variant="h4"
                color="primary"
                style={{ textAlign: "left" }}
              >
                Tender/bidder Account
              </Typography>
              <Box style={{ marginLeft: "300px", marginTop: "-35px" }}>
                <IconButton
                  style={{ padding: "0px" }}
                  onClick={() => setOpenAdmin(false)}
                >
                  <Close />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContentText>
          <Divider />

          <Container>
            <Box mt={1} textAlign="center">
             
              <br />

              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, username: e.target.value })
                }
                endAdornment={
                  <MailOutlineIcon color="primary" fontSize="small" />
                }
                type="email"
                placeholder="Enter username"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, email: e.target.value })
                }
                endAdornment={
                  <MailOutlineIcon color="primary" fontSize="small" />
                }
                type="email"
                placeholder="Enter Email"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, password: e.target.value })
                }
                endAdornment={
                  <VisibilityOffIcon color="primary" fontSize="small" />
                }
                type="password"
                placeholder="Enter Password"
                style={{ marginBottom: "10px" }}
                required="true"
              />
              <br />
              <Input
                fullWidth
                onChange={(e) =>
                  setstateS({ ...stateS, cpassword: e.target.value })
                }
                endAdornment={
                  <VisibilityOffIcon color="primary" fontSize="small" />
                }
                type="password"
                placeholder="Confirm Password"
              />

              <br />
              <br />
              {loadingSS ? (
                <Button
                  fullWidth
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                 startIcon={<ClipLoader size="10" color="black"/>}
                >
                  Signing up...
                </Button>
              ) : (
                <>
                <Button
                  fullWidth
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "rgb(254,181,2)",
                    color: "black",
                  }}
                  color="primary"
                  onClick={AdminSUp}
                >
                  Sign up
                </Button>
                <FormControl component="fieldset" style={{display:"flex"}}>
  <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
    <FormControlLabel value="tender" control={<Radio />} label="tender" />
    <FormControlLabel value="bidder" control={<Radio />} label="bidder" />
   </RadioGroup>
</FormControl>
</>
              )}
            </Box>
          </Container>
        </DialogContentText>
      </Dialog>
        </div>
    )
}

export default AdminSignUp
