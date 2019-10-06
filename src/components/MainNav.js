import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import "../styles/MainNav.scss";

import { useModal } from "./Hooks";
import DateTimeChangeDialog from "./DateTimeChangeDialog";

import moon_info_tab from "../images/moon_info_tab.png";
import moon_info_tab_sel from "../images/moon_info_tab_sel.png";
import lunar_club_tab from "../images/lunar_club_tab.png";
import lunar_club_tab_sel from "../images/lunar_club_tab_sel.png";
import lunar_2_club_tab from "../images/lunar_2_tab.png";
import lunar_2_club_tab_sel from "../images/lunar_2_tab_sel.png";

function clickHandler(event) {
  let navs = document.getElementsByTagName("a");
  for (var i = 0; i < navs.length; i++) {
    if (navs[i].className === "active") {
      let activemage = navs[i].childNodes[0].childNodes[0];
      // console.log(activemage.alt);
      changeSelectedIcon(activemage, false);
    }
  }
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
  changeSelectedIcon(image, true);
}

function changeSelectedIcon(img, isSelected) {
  let name = getLinkName(img);
  switch (name) {
    case "Moon Info":
      if (isSelected) {
        img.src = moon_info_tab_sel;
      } else {
        img.src = moon_info_tab;
      }
      break;
    case "Lunar Club":
      if (isSelected) {
        img.src = lunar_club_tab_sel;
      } else {
        img.src = lunar_club_tab;
      }
      break;
    case "Lunar 2 Club":
      if (isSelected) {
        img.src = lunar_2_club_tab_sel;
      } else {
        img.src = lunar_2_club_tab;
      }
      break;
    default:
      break;
  }
}

function getLinkName(img) {
  const pos = img.alt.lastIndexOf(" ");
  return img.alt.slice(0, pos);
}

function onClickHamburger(event) {
  let div = document.getElementById("menu");
  if (div.className.search("dropdown-hide") === -1) {
    div.className = "dropdown-hide";
  } else {
    div.className = "dropdown-show";
  }
}

function MainNav() {
  let [isShowing, toggle] = useModal();

  useEffect(() => {
    let navs = document.getElementsByTagName("a");
    for (var i = 0; i < navs.length; i++) {
      if (navs[i].className === "active") {
        let activemage = navs[i].childNodes[0].childNodes[0];
        changeSelectedIcon(activemage, true);
      }
    }
  });

  function showDateTimeChange(event) {
    onClickHamburger(event);
    toggle();
  }

  return (
    <div className="w3-top main-nav">
      <DateTimeChangeDialog isShowing={isShowing} hide={toggle} />
      <div className="w3-bar">
        <div className="w3-bar-item">
          <NavLink
            to="/moon_info"
            exact
            activeClassName="active"
            onClick={clickHandler}
          >
            <div className="w3-container w3-cell w3-center">
              <img
                src={moon_info_tab}
                alt="Moon Info Tab"
              />
              <p>Moon Info</p>
            </div>
          </NavLink>
        </div>
        <div className="w3-bar-item">
          <NavLink
            to="/lunar_club"
            activeClassName="active"
            onClick={clickHandler}
          >
            <div className="w3-container w3-cell w3-center">
              <img
                src={lunar_club_tab}
                alt="Lunar Club Tab"
              />
              <p>Lunar Club</p>
            </div>
          </NavLink>
        </div>
        <div className="w3-bar-item">
          <NavLink
            to="/lunar_ii_club"
            activeClassName="active"
            onClick={clickHandler}
          >
            <div className="w3-container w3-cell w3-center">
              <img
                src={lunar_2_club_tab}
                alt="Lunar 2 Club Tab"
              />
              <p>Lunar II Club</p>
            </div>
          </NavLink>
        </div>
        <div className="w3-bar-item w3-right hamburger-menu">
          <button className="hamburger-button" onClick={onClickHamburger}>
            <FontAwesomeIcon icon={faBars} className="bars" />
          </button>
          <div id="menu" className="dropdown-hide">
            <button className="menu-button" onClick={showDateTimeChange}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span className="change">Change</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNav;
