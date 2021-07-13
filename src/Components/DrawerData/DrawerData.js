import React from "react";
import {useHistory} from "react-router-dom"
import logo from "../../images/logo.jpeg";
import {
  Home,
  CloseOutlined,
  Group,Lock,LockOpen
} from "@material-ui/icons";
import {
  Box,
  Divider,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
const DrawerData = ({ opendrawer, setopendrawer }) => {
  const history = useHistory()
  const admin = localStorage.getItem("admin")

  return (
    <div>
      <SwipeableDrawer
        open={opendrawer}
        onClose={() => setopendrawer(false)}
        anchor="left"
      >
        <List  style={{width:"270px"}} >
          {/* logo */}
          <ListItem button>
            <img src={logo} width="100px" height="60px" alt="" />
            <IconButton
              style={{ marginLeft: "auto" }}
              onClick={() => setopendrawer(false)}
            >
              <CloseOutlined />
            </IconButton>
          </ListItem>
          
          <Divider />
          {/* Home */}
          {admin?<ListItem button  onClick={()=>history.push("/admin")}>
            <ListItemIcon>
              <LockOpen />
            </ListItemIcon>
            <ListItemText primary="Admin Home" />
          </ListItem>:<ListItem button  onClick={()=>history.push("/admin")}>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Admin Home" />
          </ListItem>}
          
          {/* all tenders*/}
          {admin?<><ListItem button onClick={()=>history.push("/admin/alltenders")}>
            <ListItemIcon>
            <Group fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Show all tenders" />
          </ListItem>
     
        <ListItem button onClick={()=>history.push("/admin/allusers")}>
            <ListItemIcon>
            <Group fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem></>:null}
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default DrawerData;
