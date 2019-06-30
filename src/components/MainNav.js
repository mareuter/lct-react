import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNav.css';

import moon_info_tab from '../images/moon_info_tab.png'

const MainNav = () => (
  <header className="w3-container w3-center main-nav">
    <nav>
        <NavLink to="/moon_info" exact activeClassName="active">
          <div className="w3-container w3-cell w3-center">
            <img className="main-nav-img" src={moon_info_tab} alt="Moon Info Tab" />
          </div>
          <div>Moon Info</div>
        </NavLink>
        <NavLink to="/lunar_club" activeClassName="active"><span>Lunar Club</span></NavLink>
        <NavLink to="/lunar_club_ii" activeClassName="active">Lunar II Club</NavLink>
    </nav>
  </header>
)

export default MainNav