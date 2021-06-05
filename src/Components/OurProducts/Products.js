import React, { useState,useEffect } from 'react'
import {makeStyles, Divider, Grid, Typography,Container, Button, Card,CardMedia, CardContent, Dialog,DialogTitle,CardActionArea, CardActions, Box, IconButton} from "@material-ui/core";
import { ShoppingCart,Grade, Close, CheckCircle, PriorityHigh, CheckCircleOutline} from "@material-ui/icons";
import toast, {Toaster} from "react-hot-toast";
import {useHistory} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import * as action from "../../Components/Redux/actions/Actions"
import {ClipLoader} from "react-spinners"
import axios from "axios";
import {useCookies} from "react-cookie"
const useStyles = makeStyles(theme=>({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  card: {
    height:"100%"
  },

  media: {
    height: 140
  },
  buttonResp:{
   [theme.breakpoints.down('sm')]:{
    fontSize:"60%"
   }
  },
  titleResp:{
    [theme.breakpoints.down('sm')]:{
      fontSize:"100%"
    }
  }

}));
//main
const Products = () => {
  const classes=useStyles()
  // states
  const[loading,setloading] = useState(false)
  const [state, setstate] = useState([])
  const [update, setupdate] = useState([])
  const [id, setid] = useState([]);
  const [addtocart, setaddtocart] = useState(null);
  const [addtocarttwo, setaddtocarttwo] = useState(null);
  const history = useHistory();
  const user = localStorage.getItem("user");

//  only get for length

 //get all data of products
 useEffect(()=>{
 getData(); 
 },[])
//  adding a single product in the database
async function addSingleProduct(ourdata) {
  try {
    // setloadingS(true);

    const { data } = await axios.post(
      "http://localhost:1000/user/addtocartSingle",
      ourdata
    );
    // setloadingS(false);
    if (data.err === "err") {
      setaddtocart(false)
      setaddtocarttwo(true)
    }
    else {
      setaddtocart(true)
    }
    
  } catch (error) {
    console.log(error);
    // setloadingS(false);
    toast.error("All fields are mandatory to fill");
  }
}
// find single product from the old database
const addToCart = async (itemID)=>{
    const { data } = await axios.get(
      `http://localhost:1000/user/findSingleProduct/${itemID}`
    );
   const ourdata = data.data
    // write error here for duplocate data
    addSingleProduct(ourdata);
   

}

 //api call for all data of products
  const getData = async () => {
  setloading(true);
  const { data } = await axios.get("http://localhost:1000/user/getProduct");
  setstate(data.data);
  setloading(false);
};
// close dislgoue
const closeDialog= ()=>{
  setaddtocart(false);
  
  
}
const closeDialogtwo= ()=>{
  setaddtocarttwo(false)
}
// we are going to disable button when user added an item to vat

  function showProductDetails(id) {

    history.push(`/BuyProducts/${id}`);
  }
    return (
        <div style={{paddingTop:"12px",backgroundColor:"white"}}>
        <Toaster/>
        {/* Dialogue for succeed added to cart the items */}
        <Dialog
        open={addtocart}
        onClose={closeDialog}
        >
          <DialogTitle>
         <IconButton onClick={closeDialog} style={{marginLeft:"230px"}}>
         <Close/>
         </IconButton>
          </DialogTitle>
          <CheckCircle fontSize="large" style={{color:"rgb(254,181,2)",marginLeft:"80px",fontSize:"150px"}}/>
          <Typography      
         variant="h4" style={{padding:"50px"}}>Added to cart</Typography>
        </Dialog>
         {/* Dialogue for duplicate added cart item */}
         <Dialog
        open={addtocarttwo}
        onClose={closeDialogtwo}
        >
          <DialogTitle>
         <IconButton onClick={closeDialogtwo} style={{marginLeft:"230px"}}>
         <Close/>
         </IconButton>
          </DialogTitle>
          <PriorityHigh fontSize="large" style={{color:"rgb(254,181,2)",marginLeft:"80px",fontSize:"150px"}}/>
          <Typography      
         variant="h4" style={{padding:"50px"}}>You have already this item!</Typography>
        </Dialog>
        {/* first line */}
        <Grid container style={{padding:"20px"}}> 
        {/* our Products heading */}
        <Grid style={{textAlign:"center"}} item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography style={{fontWeight:"bolder",color:"rgb(254,181,2)"}} variant="h4" color="initial">Our Products</Typography>
        <Divider style={{backgroundColor:"rgb(254,181,2)",width:"10%",height:"2px",marginLeft:"auto",marginRight:"auto",marginTop:"10px",marginBottom:"10px"}}/>
        </Grid>
        </Grid>   
       {
         loading?<Box textAlign="center" mb={9}><ClipLoader size="10"/></Box>:
         <Container maxWidth="md">
       <Grid container spacing={5}>
      
      { state.map((val)=>(
        <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
        <Card className={classes.card}>
       <CardActionArea>
     <CardMedia
     className={classes.media}
     image={val.selectedFile}
     title="shopping"
     />
     <CardContent>
         <Typography className={classes.titleResp} variant="h5">
            {val.title}
         </Typography>
       
     <Grade style={{color:"rgb(254,181,2)"}}/>
     <Grade style={{color:"rgb(254,181,2)"}}/>
     <Grade style={{color:"rgb(254,181,2)"}}/>
     <Grade style={{color:"rgb(254,181,2)"}}/>
     <Grade style={{color:"rgb(254,181,2)"}}/>
     </CardContent>
     </CardActionArea> 
         <CardActions>
        
         <Button 
          className={classes.buttonResp}
          style={{ backgroundColor:"rgb(0,8,45)",
          color:"rgb(254,170,2)",borderRadius:"0px"}}
         fullWidth size="small" color="primary"
         onClick={()=>showProductDetails(val._id)}
         >
          Details
        </Button>
       
        <Button
          className={classes.buttonResp}
          startIcon={<ShoppingCart fontSize="small"/>}
          style={{ backgroundColor:"rgb(254,170,2)",
          color:"black",borderRadius:"0px"}} 
          fullWidth size="small" color="primary"
          onClick={()=>addToCart(val._id)}
          >
          Add to cart
        </Button>
      
       
       
       
        {/* {cookies.price} we can show cookies data like this almost like a localstorage */}
         </CardActions>
   
       </Card>
       </Grid>
      ))}
  
    
  
      </Grid> 
        </Container>   
       } 
        </div>
    )
}

export default Products;