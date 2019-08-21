import React from "react";
import { NavLink } from "react-router-dom";

import "./MainNav.css";

import moon_info_tab from "../images/moon_info_tab.png";
import lunar_club_tab from "../images/lunar_club_tab.png";
import lunar_2_club_tab from "../images/lunar_2_tab.png";

function MainNav() {
  return (
    <header className="w3-container w3-center main-nav">
      <nav>
        <NavLink to="/moon_info" exact activeClassName="active">
          <div className="w3-container w3-cell w3-center">
            <img
              className="main-nav-img"
              src={moon_info_tab}
              alt="Moon Info Tab"
            />
            Moon Info
          </div>
        </NavLink>
        <NavLink to="/lunar_club" activeClassName="active">
          <div className="w3-container w3-cell w3-center">
            <img
              className="main-nav-img"
              src={lunar_club_tab}
              alt="Lunar Club Tab"
            />
            Lunar Club
          </div>
        </NavLink>
        <NavLink to="/lunar_ii_club" activeClassName="active">
          <div className="w3-container w3-cell w3-center">
            <img
              className="main-nav-img"
              src={lunar_2_club_tab}
              alt="Lunar 2 Club Tab"
            />
            Lunar II Club
          </div>
        </NavLink>
      </nav>
    </header>
  );
}

export default MainNav;
