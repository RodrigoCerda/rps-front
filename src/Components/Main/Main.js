import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Moves from "../Moves/Moves";
import Game from "../Game/Game";
const Main = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/moves" component={Moves} />
            <Route path="/game" component={Game} />
        </Switch>
    </div>
);
export default Main;
