import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Events from "./forApplication/Dashboard/Events.js";
import Navbar from "./forApplication/NavbarF/Navbar.js";
import EventWeb from "./forApplication/EventWebF/EventWeb.js";
import UserGroups from "./forApplication/UserGroupsF/UserGroups.js";
import Registration from "./forApplication/RegistrationAndLogin/Registration.js";
import Login from "./forApplication/RegistrationAndLogin/Login.js";

import EventListProvider from "./Technician/Providers/EventListProvider.js";
import EventProvider from "./Technician/Providers/EventProvider.js";
import LoggedUserProvider from "./Technician/Providers/LoggedUserProvider.js";
import GroupProvider from "./Technician/Providers/GroupProvider.js";

import { ColorPalletContext } from "./Technician/Contexts/ColorPalletContext.js";

const App = () => {
  const { colorPallet } = useContext(ColorPalletContext)
  

  return (
    <div className="main-div" style={ {backgroundColor: colorPallet.secondarycolor, minHeight: '100vh'}}>
        <div className="all-components">
          <LoggedUserProvider>
            <BrowserRouter>
              <Navbar />

              <Routes>
                <Route
                  path="/"
                  index
                  element={
                    <EventListProvider>
                      <Events />
                    </EventListProvider>
                  }
                />

                <Route
                  path="event/:id"
                  // id eventu
                  element={
                    <EventProvider>
                      <EventWeb />
                    </EventProvider>
                  }
                />

                <Route
                  path="user-groups/:id"
                  element={
                    // id usera
                    <GroupProvider>
                      <UserGroups />
                    </GroupProvider>
                  }
                />

                <Route path="login" element={<Login />} />

                <Route path="registration" element={<Registration />} />
              </Routes>
            </BrowserRouter>
          </LoggedUserProvider>
        </div>
    </div>
  );
};

export default App;
