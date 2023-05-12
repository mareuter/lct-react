import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import '../styles/MainNav.scss';

import { useModal } from './Hooks';
import DateTimeChangeDialog from './DateTimeChangeDialog';

import moon_info_tab from '../images/moon_info_tab.png';
import moon_info_tab_sel from '../images/moon_info_tab_sel.png';
import lunar_club_tab from '../images/lunar_club_tab.png';
import lunar_club_tab_sel from '../images/lunar_club_tab_sel.png';
import lunar_2_club_tab from '../images/lunar_2_tab.png';
import lunar_2_club_tab_sel from '../images/lunar_2_tab_sel.png';

function clickHandler(event) {
  let navs = document.getElementsByTagName('a');
  for (var i = 0; i < navs.length; i++) {
    if (navs[i].className === 'active') {
      let activemage = navs[i].childNodes[0];
      // console.log("A:", activemage.alt);
      changeSelectedIcon(activemage, false);
    }
  }
  let target = event.target ? event.target : event.srcElement;
  let image;
  // console.log("B:", target.nodeName);
  if (target.nodeName === 'P') {
    image = target.previousSibling;
  }
  if (target.nodeName === 'IMG') {
    image = target;
  }
  if (target.nodeName === 'A') {
    image = target.childNodes[0];
  }
  changeSelectedIcon(image, true);
}

function changeSelectedIcon(img, isSelected) {
  let name = getLinkName(img);
  switch (name) {
    case 'Moon Info':
      if (isSelected) {
        img.src = moon_info_tab_sel;
      } else {
        img.src = moon_info_tab;
      }
      break;
    case 'Lunar Club':
      if (isSelected) {
        img.src = lunar_club_tab_sel;
      } else {
        img.src = lunar_club_tab;
      }
      break;
    case 'Lunar 2 Club':
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
  const pos = img.alt.lastIndexOf(' ');
  return img.alt.slice(0, pos);
}

function onClickHamburger(event) {
  let div = document.getElementById('menu');
  if (div.className.search('dropdown-hide') === -1) {
    div.className = 'dropdown-hide';
  } else {
    div.className = 'dropdown-show';
  }
}

function MainNav() {
  let [isShowing, toggle] = useModal();

  useEffect(() => {
    let navs = document.getElementsByTagName('a');
    for (var i = 0; i < navs.length; i++) {
      if (navs[i].className === 'active') {
        let activemage = navs[i].childNodes[0];
        changeSelectedIcon(activemage, true);
      }
    }
  });

  function showDateTimeChange(event) {
    onClickHamburger(event);
    toggle();
  }

  return (
    <div className="main-nav">
      <DateTimeChangeDialog isShowing={isShowing} hide={toggle} />
      <div className="nav-item">
        <NavLink to="/moon_info" activeclassname="active" onClick={clickHandler}>
          <img src={moon_info_tab} alt="Moon Info Tab" />
          <p>Moon Info</p>
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/lunar_club" activeclassname="active" onClick={clickHandler}>
          <img src={lunar_club_tab} alt="Lunar Club Tab" />
          <p>Lunar Club</p>
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/lunar_ii_club" activeclassname="active" onClick={clickHandler}>
          <img src={lunar_2_club_tab} alt="Lunar 2 Club Tab" />
          <p>Lunar II Club</p>
        </NavLink>
      </div>
      <div className="hamburger-menu">
        <button className="hamburger-button" onClick={onClickHamburger}>
          <FontAwesomeIcon icon={faBars} className="bars" />
        </button>
        <div id="menu" className="dropdown-hide">
          <button className="menu-button" onClick={showDateTimeChange}>
            <FontAwesomeIcon icon={faCalendarAlt} className="calendar" />
            <span className="change">Change</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainNav;
