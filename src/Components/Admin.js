import { Box, Button, Input, Paper, Typography } from '@material-ui/core';
import {useHistory} from "react-router-dom"
import React,{useState} from 'react'
import {url} from "../Api/Api";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
const Admin = () => {
    const [state,setstate] = useState();
    const history = useHistory();
    const admin = localStorage.getItem("admin")
    const Logout = () =>{
      localStorage.removeItem("admin")
      window.location.reload()
    }
    // 1.sing in admin
    const signAdmin = async() =>{
        try {
           const {data} = await axios.post(`${url}/adminSignIn`,state)
           console.log(data);
           if(data.success){
              toast.success("Admin logged in!")
              localStorage.setItem("admin",data.user.email)
              history.push("/admin/allusers")
              
           }
           if(data.err){
              toast.error("invalid email/password!")
           }
        } catch (error) {
            console.log(error);
        }
    }
    // 2.find all the tenders and bidders
     return (
        <div >
            {/* 1.sigin in admin; */}
           
          {admin?<Box style={{marginTop:"100px"}} textAlign="center"><Button
           onClick={Logout}
           variant="outlined" color="primary">Logout Admin</Button></Box>:
            <Box m={5} component={Paper} elevation={7}>
           <Box  textAlign="center"><Typography variant="h4">Admin login</Typography></Box>
           <Box m={3} textAlign="center">
           <Toaster></Toaster>
           <Input
                    onChange={(e) =>
                      setstate({ ...state, email: e.target.value })
                    }
                    type="email"
                    placeholder="email"
                    style={{ marginBottom: "10px" }}
                     required="true"
                  />
                  <br />
                  <Input
                    onChange={(e) =>
                      setstate({ ...state, password: e.target.value })
                    }
                     type="password"
                    placeholder="Update Confirm Password"
                  />
                  <br />
                  <Button
                   onClick ={signAdmin}
                   variant="contained">Login</Button>
           </Box>
           <Toaster/>
           </Box>}
            {/* 2.find all the tenders and bidders */}
                        
            {/* 3.show all the tenders which are posted */}
        </div>
    )
}

export default Admin
