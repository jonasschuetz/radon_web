import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Navbar extends Component {
    render() {
       return(
            <div>
             <nav className="navbar navbar-expand-lg NavBarBackground">
                    <ul className="navbar-nav mr-auto">
                        <li><Link to={'/'} className="nav-link">Mitarbeiter</Link></li>
                        <li><Link to={'/profil'} className="nav-link">Profil</Link></li>
                        <li><Link to={'/anlagen'} className="nav-link">Anlagen</Link></li>
                        <li><Link to={'/reports'} className="nav-link">Reports</Link></li>
                    </ul>
                </nav>
            </div>
       ) 
    }
}
export default Navbar;