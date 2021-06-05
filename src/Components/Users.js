import React,{useEffect,useState} from 'react'
import {url} from "../Api/Api"
import axios from "axios"
import {useHistory} from "react-router-dom"
import Typography from '@material-ui/core/Typography'
import { Button, Dialog } from '@material-ui/core'
const Users = () => {
    useEffect(() => {
    getUsers()
    }, [])
   const [state, setstate] = useState([])
   const [getted, setgetted] = useState([])
   const [open, setopen] = useState([])
   const [edited, setedited] = useState([])
 const history = useHistory()
  //delete now
  const deleteNow =async(id)=>{
    try {
     const {data}= await axios.delete(`${url}/deleteUsers/${id}`)
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
        <Dialog
        open={open}
        onClose={()=>setopen(false)}
        >
             <input onChange={(e)=>setedited({...edited,usenname:e.target.value})} defaultValue={getted.username} type="text" />
             <input onChange={(e)=>setedited({...edited,email:e.target.value})} defaultValue={getted.email} type="text" />
            <input onChange={(e)=>setedited({...edited,password:e.target.value})} defaultValue={getted.password} type="text" />
            <input onChange={(e)=>setedited({...edited,status:e.target.value})} defaultValue={getted.status} type="text" />
             <button
             onClick={()=>updateNow(getted._id)}
             >update</button>
        </Dialog>
        <Button variant="contained" onClick={()=>history.push("alltenders")}>Goto tender</Button>
           <Typography variant="h4" color="initial">GetAllUsers</Typography>
           {state.map((val)=>(
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
           ))}
        </div>
    )
}

export default Users

