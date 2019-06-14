import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = () => (
  <header className="main-nav">
    <nav>
        <NavLink to="/moon_info" exact activeClassName="active">Moon Info</NavLink>
        <NavLink to="/lunar_club" activeClassName="active"><span>Lunar Club</span></NavLink>
        <NavLink to="/lunar_club_ii" activeClassName="active">Lunar II Club</NavLink>
    </nav>
  </header>
)

export default MainNav