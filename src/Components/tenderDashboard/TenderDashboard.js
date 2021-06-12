import { Box, Button, Input } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {url} from "../../Api/Api"
import FileBase from 'react-file-base64';

const TenderDashboard = () => {
    const [state, setstate] = useState(false)
    const [Data, setData] = useState(false)
    const [posterdata, setposterdata] = useState([])
    const [update, setupdate] = useState([])
    const [tenders, settenders] = useState([])
    const [price, setprice] = useState()
    const [bider, setbider] = useState("")
    const [some, setsome] = useState([])
    
    var email =  localStorage.getItem("user")
    console.log(email);
    useEffect(()=>{
    setprice({...price,bidderemail:email})
    },[])   
// get my bids
async  function getmybids(){
  try {
      const {data} = await axios.get(`${url}/getmybids/${email}`)
      console.log(data.data);
     
      
    } catch (error) {
      console.log(error)
  }
  
}

  // accecpt bid now
  async  function accept(id){
      const bid = {accepted:true}
      console.log(id)
    try {
        // const {data} = await axios.post(`${url}/accept/${id}`,bid)
        // console.log(data.data.tenderDetail[0].accepted)
      } catch (error) {
        console.log(error)
    }
    
 }
//check for hide an expired bid
async function checkbidders(id){
    try {
        console.log(id);
        const {data} = await axios.get(`${url}/getAllBidders/${id}`)
        // console.log(data)
       const bidder = data.user.tenderDetail[1].bidderemail
       setbider(bidder)
     } catch (error) {
        console.log(error)
    }  
 }
  // bid now
    async  function bid(id){
    try {
        const {data} = await axios.post(`${url}/firstbid/${id}`,price)
      } catch (error) {
        console.log(error)
    }
    
 }
     // update profile
    async  function updateProfile(){
        const {data} =await axios.put(`${url}/updateProfile/${email}`,update)
        console.log(data)
        
     }
// get all the tenders
    async  function allTenders(){
        const {data} =await axios.get(`${url}/getAllteders`)
        console.log(data.data)
        settenders(data.data)
     }
     //delete a single tender
 async  function viewSingleBid(id){
       const {data} =await axios.get(`${url}/deleteTender/${id}`)
    }
     async function postnewuser() {
        setstate(true);
    }
    // post tender data
   async function postenderdata() {
        try {
         const {data} = await axios.post(`${url}/tenderPostData`,{email,...Data})
         console.log(data)
          } catch (error) {
            
        }
    }
    // show me tender's data
    async function showtenderdata(){
        try {
            const {data} = await axios.get(`${url}/showtenderdata/${email}`)
            setposterdata(data.data)
            } catch (error) {
               console.log(error);
           }
    }
console.log(Data)
 // show tender's profile
 async function showprofile(){
    try {
        const {data} =await axios.get(`${url}/showtenderprofile/${email}`)
        console.log(data.data)
       } catch (error) {
        console.log(error);
       }
}

//time logic
function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    setData({...Data,expirytime:ts})
  };


     return (
        <div>
            welcome tender dashboard <br />
            <Button 
             onClick={postnewuser}
             variant="contained" color="primary">Post a new tender</Button>
             <br />
             <Box>
             <FileBase type="file" multiple={false}
              onDone={({ base64 }) => setData({ ...Data, selectedFile: base64 })} /> <br />
            <Input placeholder="title"  onChange={(e)=>setData({...Data,title:e.target.value})}/>    <br />
            <Input placeholder="descripteion"  onChange={(e)=>setData({...Data,description:e.target.value})}/>    <br />        
            <Input placeholder="initial price"  onChange={(e)=>setData({...Data,initialprice:e.target.value})}/> <br />
            <Input type="time" placeholder="pick time"  onChange={(e)=>tConv24(e.target.value)}/> <br />
            <Input type="date" placeholder="date"  onChange={(e)=>setData({...Data,expirydate:e.target.value})}/> <br />
             </Box>
             {/* this button will post data into database */}
             <Button style={{marginRight:"6px"}} 
             onClick={postenderdata}
             variant="contained" color="secondary">Post</Button>
              <br />
              <br />
             <Button
              onClick={showtenderdata}
              variant="contained" color="primary"
              >My Tender</Button>
              <br />
              <br />

             <Button
              onClick={showprofile}
              variant="contained" color="primary"
              >Profile</Button>
           {posterdata.map((val)=>(
               <>
            <li>{val.tenderDetail[0]._id}</li>
            <li>{val.tenderDetail[0].title}</li>
            <img src={val.tenderDetail[0].selectedFile} alt=""></img>
        <Button variant="contained"
          color="primary"
          onClick={()=>viewSingleBid(val.tenderDetail[0]._id)}>view</Button>
              </>
           ))}
        {/* next we have make the show all tenders so that every user can bid*/}
    <Button 
     onClick={allTenders}
     variant="contained" color="primary">Get all tenders only</Button>
     <br />
     {/* profile updata */}
 
     profile update
     <Box>
             <FileBase type="file" multiple={false}
              onDone={({ base64 }) => setupdate({ ...update, selectedFile: base64 })} /> <br />
              <Input placeholder="username"  onChange={(e)=>setupdate({...update,username:e.target.value})}/>    <br />
             <Input placeholder="phone"  onChange={(e)=>setupdate({...update,phone:e.target.value})}/>    <br />        
              </Box>
     <Button 
     onClick={updateProfile}
     variant="contained" color="primary">Upadte Profile</Button>

     {/* showing all tenders */}
{
    tenders.map((val,index)=>(
        <div key={index}>
        <Input placeholder="price"
         onChange={(e)=>setprice({...price,bidderprice:e.target.value})}/> <br />
         <li key>{val.tenderDetail[0].title}</li>
         <li>{val.tenderDetail[0].initialprice}</li>
         <Button
          onClick={()=>bid(val.tenderDetail[0]._id)}
           variant="contained" color="secondary"
         >Bid</Button>
         &nbsp;
         <Button
           onClick={()=>checkbidders(val.tenderDetail[0]._id)}
           variant="contained" color="secondary"
         >Check who has bidd?</Button>
       
        </div>

    ))
}
<br />
<br />
are you a bidder?
<Button 
 onClick={ getmybids }
 variant="contained" color="secondary">Get my bids</Button>
        </div>
    )


  }

export default TenderDashboard;
