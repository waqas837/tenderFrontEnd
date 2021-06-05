import React,{useEffect,useState} from 'react'
import {Button, Dialog, Input} from "@material-ui/core"
import {url} from "../Api/Api"
import axios from "axios"
const ShowTenders = () => {
   const [state,setstate] = useState([])
   const [updateTender,setupdateTender] = useState([])
   const [loading,setloading] = useState()
   const [open,setopen] = useState(false)
//  get one tender for update
const getSingleTender = async (id) =>{
    console.log(id);
    try {
        setopen(true)
     const {data} = await axios.get(`${url}/getSingleTender/${id}`)
     setupdateTender(data.user)
     
 
    } catch (error) {
        console.log(error);
    }
 }
//  delete one tender for 
const deleteAllTendersForSingleUser = async (id) =>{
     
    try {
     setloading(true)
     const {data} = await axios.delete(`${url}/deleteAllTendersForSingleUser/${id}`)
     console.log(data.data);
     window.location.reload()
     setloading(false)
    } catch (error) {
        console.log(error);
    }
 }


   //get all the tenders
    const getAllteders = async () =>{
       setloading(true)
       try {
        setloading(true)
        const {data} = await axios.get(`${url}/getAllteders`)
        console.log(data.data);
        setstate(data.data)
        setloading(false)
    
       } catch (error) {
           console.log(error);
       }
    }
    useEffect(()=>{
        getAllteders()
    },[])
    return (
        <div>
        {/* this dialog is updating for the tenders+details */}
        <Dialog
        open={open}
        onClose={()=>setopen(false)}
        >
             
        </Dialog>
             {loading?<h2 style={{textAlign:"center",marginTop:"50px"}}>loading...</h2>:
             state.map((val,index)=>
             <>
            <div key={index}>
            <li>{val.email}</li>
             <li>{val.tenderDetail[0].title}</li>
             <li>{val.tenderDetail[0].description}</li>
            <li>{val.tenderDetail[0].expirytime}</li>
             <li>{val.tenderDetail[0].expirydate}</li>
             <Button
             size="small"
             variant="contained"
             color="primary"
             onClick={()=>getSingleTender(val._id)}
             >Edit</Button>
             &nbsp;
             <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={()=>deleteAllTendersForSingleUser(val._id)}
             >DeleteTender</Button>
            </div>
             </>
             )}
        </div>
    )
}

export default ShowTenders;
