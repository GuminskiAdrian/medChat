// App.tsx

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import ChatList from './components/ChatList';
import Register from './components/Register';
import ChatRoom from './components/ChatRoom';



const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/ChatList">
                    <ChatList />
                </Route>
                <Route path="/ChatRoom">
                    <ChatRoom />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
