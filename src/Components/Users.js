import React,{useEffect,useState} from 'react'
import {url} from "../Api/Api"
import axios from "axios"
import {useHistory} from "react-router-dom"
import Typography from '@material-ui/core/Typography'
import {
  makeStyles,AppBar,Toolbar,
  IconButton,
  Dialog,
  DialogContent,
  Grid,
  Box,
  Input,
  Button,TableContainer,Container,Table,TableCell,TableRow,TableBody,TableHead,Paper,OutlinedInput,DialogActions,DialogTitle } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Menu } from '@material-ui/icons'
import DrawerData from './DrawerData/DrawerData'
import toast from 'react-hot-toast'
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
const Users = () => {
  const classes= useStyles()
    useEffect(() => {
    getUsers()
    }, [])
   const [state, setstate] = useState([])
   const [getted, setgetted] = useState([])
   const [open, setopen] = useState([])
   const [edited, setedited] = useState([])
  const [opendrawer,setopendrawer] =useState(false)

 const history = useHistory()
  //delete now
  const deleteNow =async(id)=>{
    try {
     const {data}= await axios.delete(`${url}/deleteUsers/${id}`)
     toast.success("User deleted")
     window.location.reload()

     console.log(data);
    } catch (error) {
        console.log(error)
    }
}
   //update now
  const updateNow =async(id)=>{
      try {
       const {data}= await axios.put(`${url}/updateUsers/${id}`,edited)
       console.log(data);
      } catch (error) {
          console.log(error)
      }
  }
  //get a single record for next to edit
   const editRecord = async(id)=>{
       try {

       const {data} =  await axios.get(`${url}/getAsingleUsr/${id}`)
       console.log(data.user) 
       setgetted(data.user)
       setopen(true)
       } catch (error) {
       console.log(error) 
       }
   }
//    get all the users
    const getUsers = async () =>{
try {
const {data} = await  axios.get( `${url}/getAllUsers`)
setstate(data.user)
console.log(data);
} catch (error) {
    
}
    }
    return (
        <div>

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
      >
       </Typography>
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

        <Dialog
        open={open}
        onClose={()=>setopen(false)}
        >
        <DialogTitle style={{marginLeft:"60px",marginRight:"60px"}}>
            Update tender
        </DialogTitle>
             <OutlinedInput onChange={(e)=>setedited({...edited,usenname:e.target.value})} defaultValue={getted.username} type="text" />
             <OutlinedInput onChange={(e)=>setedited({...edited,email:e.target.value})} defaultValue={getted.email} type="text" />
            <OutlinedInput onChange={(e)=>setedited({...edited,password:e.target.value})} defaultValue={getted.password} type="text" />
            <OutlinedInput onChange={(e)=>setedited({...edited,status:e.target.value})} defaultValue={getted.status} type="text" />
            <DialogActions>
            <Button
            variant='contained'
            color="primary"
             onClick={()=>updateNow(getted._id)}
             >update</Button>
            </DialogActions>
        </Dialog>
            <Typography variant="h4" color="initial">GetAllUsers</Typography>
        <Container>
           <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead style={{background:"black",}}>
          <TableRow >
            <TableCell style={{color:"white",fontWeight:"bolder"}} >email</TableCell>
            <TableCell style={{color:"white",fontWeight:"bolder"}}>Password</TableCell>
            <TableCell style={{color:"white",fontWeight:"bolder"}}>Status</TableCell>
            <TableCell style={{color:"white",fontWeight:"bolder"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((row,index) => (
            <TableRow key={index}>
            <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.password}
              </TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <Button variant="contained" color="secondary"  onClick={()=>deleteNow(row._id)} align="center">Delete</Button>
              <Button variant="contained" color="primary" onClick={()=>editRecord(row._id)} align="center">Edit</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Container>







           {/* {state.map((val)=>(
              <>
              <li>{val.email}</li>
              <li>{val.password}</li>
              <li>{val.status}</li>
              <Button
              onClick={()=>editRecord(val._id)}
              color="primary"
              variant="contained"
              >Edit this record</Button>
              <Button
              onClick={()=>deleteNow(val._id)}
              color="primary"
              variant="contained"
              >Delete</Button>
               </>
           ))} */}
        </div>
    )
}

export default Users

