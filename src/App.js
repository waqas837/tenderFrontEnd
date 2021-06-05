import "./App.css";
import React from "react";
import {createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TenderDashboard from "./Components/tenderDashboard/TenderDashboard"
import Admin from "./Components/Admin" 
import Users from "./Components/UserPanel/Users";
import AllUsers  from "./Components/Users"
import Dashboard from "./Components/UserDashboard/Dashboard"
import ShowTenders from "./Components/ShowTenders"
import Adminis from "./Components/Admin/Admin"
const font = "'Roboto', sans-serif;";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    button: {
      textTransform: "capitalize",
    },
  },
});
function App() {
  return (
        <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Route exact path="/">
          <Adminis/>
          </Route>
          <Route exact path="/tenderdashboard">
          <TenderDashboard/>
          </Route>

          <Route exact path="/users">
            <Users/>
          </Route>
          <Route exact path="/userDashboard">
            <Dashboard/>
          </Route>
          
          <Route exact path="/admin">
           <Admin/>
          </Route>
          <Route exact path="/admin/allusers">
           <AllUsers/>
          </Route>
          {/* get all tenders */}
          <Route exact path="/admin/alltenders">
           <ShowTenders/>
          </Route>
         
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
