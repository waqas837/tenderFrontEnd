import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../Api/Api";
import axios from "axios";
import Filebase from "react-file-base64";
import {
  Container,
  Grid,
  Input,
  Paper,
  Button,
  Box,
  Typography,
  LinearProgress,
} from "@material-ui/core";
const UpdateVerySingleTender = () => {
  const { _id, email } = useParams();
  const [state, setstate] = useState([]);
  const [update, setupdate] = useState();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getRequired();
  }, []);
//update a record
const updateRecord = async (title) =>{
    try {
     const {data}  = await axios.post(`${url}/updateVerysingleTender/${title}`,update)
    } catch (error) {
        console.log(error);
    }
}
  const getRequired = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(`${url}/getRequired/${_id}/${email}`);
      setstate(data.data.tenderDetail[0]);
      console.log(data.data.tenderDetail[0]);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={5}>
          <Box textAlign="center">
            <Typography variant="h5" color="secondary">
              Update a single tender
            </Typography>
          </Box>

          {loading ? (
            <LinearProgress color="primary" />
          ) : (
            <>
              <Grid container>
                <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                  <p>Title:</p>
                  <Input onChange={(e)=>setupdate({...update,title:e.target.value})} 
                  defaultValue={state.title} />
                </Grid>

                <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                  <p>Description:</p> <Input onChange={(e)=>setupdate({...update,description:e.target.value})} 
                  defaultValue={state.description} />
                </Grid>

                <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                  <p>expirydate:</p> <Input onChange={(e)=>setupdate({...update,expirydate:e.target.value})} 
                  defaultValue={state.expirydate} />
                </Grid>

                <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                  <p>expirytime:</p> <Input onChange={(e)=>setupdate({...update,expirytime:e.target.value})} 
                  defaultValue={state.expirytime} />
                </Grid>

                <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                  <p>initialprice:</p>{" "}
                  <Input onChange={(e)=>setupdate({...update,initialprice:e.target.value})} 
                  defaultValue={state.initialprice} />
                </Grid>

                <Grid item xs={6} sm={6} lg={6} md={6} xl={6}>
                  <p>Image:</p>{" "}
                  <img
                    width="100px"
                    height="100px"
                    src={state.selectedFile}
                    alt=""
                  />
                  <Filebase
                    onDone={({ base64 }) =>
                      setupdate({ ...update, selectedFile: base64 })
                    }
                  />
                </Grid>
              </Grid>
              <Box my={1}>
            <Button
              onClick={()=>updateRecord(state.title)}
              style={{ marginLeft: "200px" }}
              variant="contained"
              color="secondary"
            >
              Update
            </Button>
          </Box>
            </>
          )}

          
        </Paper>
      </Container>
    </div>
  );
};

export default UpdateVerySingleTender;
