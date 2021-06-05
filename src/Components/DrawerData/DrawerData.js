import React from "react";
import {useHistory} from "react-router-dom"
import logo from "../../images/logo.jpg";
import {
  Home,
  CloseOutlined,
  Group,
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
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {/* Add new user*/}
          <ListItem button onClick={()=>history.push("/admin/users")}>
            <ListItemIcon>
            <Group fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
       
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default DrawerData;
