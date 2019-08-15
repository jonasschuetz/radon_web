import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

class Anlagen extends Component {
    render() {
        return(
            <div className="radonContainer">
                <Navbar/>
                <h1>Anlagen</h1>
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

export default Anlagen;