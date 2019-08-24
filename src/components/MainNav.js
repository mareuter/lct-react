import React from "react";
import { NavLink } from "react-router-dom";

import "./MainNav.css";

import moon_info_tab from "../images/moon_info_tab.png";
import moon_info_tab_sel from "../images/moon_info_tab_sel.png";
import lunar_club_tab from "../images/lunar_club_tab.png";
import lunar_club_tab_sel from "../images/lunar_club_tab_sel.png";
import lunar_2_club_tab from "../images/lunar_2_tab.png";
import lunar_2_club_tab_sel from "../images/lunar_2_tab_sel.png";

function clickHandler(event) {
  let target = event.target ? event.target : event.srcElement;
  let image;
  // console.log(target.nodeName);
  if (target.nodeName === "P") {
    image = target.previousSibling;
  }
  if (target.nodeName === "IMG") {
    image = target;
  }
  if (target.nodeName === "DIV") {
    image = target.childNodes[0];
  }
  const pos = image.alt.lastIndexOf(" ");
  let linkName = image.alt.slice(0, pos);
  switch (linkName) {
    case "Moon Info":
      image.src = moon_info_tab_sel;
      break;
    case "Lunar Club":
      image.src = lunar_club_tab_sel;
      break;
    case "Lunar 2 Club":
      image.src = lunar_2_club_tab_sel;
      break;
    default:
      break;
  }
}

function blurHandler(event) {
  let target = event.target ? event.target : event.srcElement;
  let image = target.childNodes[0].childNodes[0];
  const pos = image.alt.lastIndexOf(" ");
  let linkName = image.alt.slice(0, pos);
  switch (linkName) {
    case "Moon Info":
      image.src = moon_info_tab;
      break;
    case "Lunar Club":
      image.src = lunar_club_tab;
      break;
    case "Lunar 2 Club":
      image.src = lunar_2_club_tab;
      break;
    default:
      break;
  }
}

function MainNav() {
  return (
    <header className="w3-container w3-center main-nav">
      <nav>
        <NavLink
          to="/moon_info"
          exact
          activeClassName="active"
          onClick={clickHandler}
          onBlur={blurHandler}
        >
          <div className="w3-container w3-cell w3-center">
            <img
              className="main-nav-img"
              src={moon_info_tab}
              alt="Moon Info Tab"
            />
            <p className="main-nav-p">Moon Info</p>
          </div>
        </NavLink>
        <NavLink
          to="/lunar_club"
          activeClassName="active"
          onClick={clickHandler}
          onBlur={blurHandler}
        >
          <div className="w3-container w3-cell w3-center">
            <img
              className="main-nav-img"
              src={lunar_club_tab}
              alt="Lunar Club Tab"
            />
            <p className="main-nav-p">Lunar Club</p>
          </div>
        </NavLink>
        <NavLink
          to="/lunar_ii_club"
          activeClassName="active"
          onClick={clickHandler}
          onBlur={blurHandler}
        >
          <div className="w3-container w3-cell w3-center">
            <img
              className="main-nav-img"
              src={lunar_2_club_tab}
              alt="Lunar 2 Club Tab"
            />
            <p className="main-nav-p">Lunar II Club</p>
          </div>
        </NavLink>
      </nav>
    </header>
  );
}

export default MainNav;
