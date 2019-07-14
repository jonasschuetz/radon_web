import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

class Profile extends Component {
    render() {
        return(
            <div className="App">
                <Navbar/>
                <h1>Vorname Nachname</h1>
                <div>
                <Link to="/">
                    <button variant="raised">
                        Zurück
                    </button>
                </Link>
                </div>
            </div>
        )
    }
}

export default Profile;