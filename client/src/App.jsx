import React, { Component } from 'react';
import{ Route, Switch } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Employee from './pages/Employee';
import Reports from './pages/Reports';
import Anlagen from './pages/Anlagen';
import Profil from './pages/Profile';

class App extends Component {

   

    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path ='/' component={Home}/>
                    <Route path='/reports' component={Reports}/>
                    <Route path='/anlagen' component={Anlagen}/>
                    <Route path='/profil' component={Profil}/>
                    {/* TODO: Durchgehend umbenennen auf mitarbeiter in URL*/}
                    <Route path ='/employee/:id' component={Employee}/>
                </Switch>
            </div>
        )
        return(
            <Switch>
                <App/>
            </Switch>
        );

    }
}

export default App;