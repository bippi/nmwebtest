import React, { Component } from "react";
import { Router, Route, Link, Redirect, Switch } from "react-router-dom";

import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";
import SideNav from "Components/SideNav/SideNav";
import Team from "./Containers/Club";
import Clubs from "./Containers/Clubs";
import Handbok from "./Components/Handbok";
import Ridlar from "./Components/Ridlar";
import Deildir from "./Components/Deildir";
import Pitches from "./Containers/Pitches";
import Pitch from "./Containers/Pitch";
import Group from "./Containers/Group";
import Groups from "./Containers/Groups";
import ClubGames from "./Containers/ClubGames";
import TeamGames from "./Containers/TeamSchedule";
import ScrollToTop from "./Containers/ScrollToTop";
import styles from "./layout.less";
import NothingFound from "./Components/404";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();
let isProd = window.location.hostname.indexOf("kfia") != -1 ? true : false;

if (isProd && window.ga) {
  window.ga("create", "UA-120264031-1", "auto");
}

history.listen(location => {
  if (isProd && window.ga) {
    window.ga("set", "page", location.pathname + location.search);
    window.ga("send", "pageview", location.pathname + location.search);
  }
});

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      sideNavOpen: false
    };
    this.toggleSideNavState = this.toggleSideNavState.bind(this);
  }

  toggleSideNavState() {
    this.setState({ sideNavOpen: this.state.sideNavOpen ? false : true });
  }

  render() {
    return (
      <Router forceRefresh={false} basename="/" history={history}>
        <ScrollToTop>
          <div className={styles.wrap}>
            <SideNav
              navOpen={this.state.sideNavOpen}
              toggleSideNav={this.toggleSideNavState}
            />
            <Header
              navOpen={this.state.sideNavOpen}
              toggleSideNav={this.toggleSideNavState}
            />
            <div className={styles.content}>
              <Switch>
                <Redirect exact from="/" to="/lid" />
              
                <Route
                  exact
                  path="/lid/"
                  render={routeProps => <Clubs {...routeProps} />}
                />
                <Route
                  exact
                  path="/lid/:id"
                  render={routeProps => <Team {...routeProps} />}
                />
                <Route
                  exact
                  path="/lid/:id/leikir/"
                  render={routeProps => <ClubGames {...routeProps} />}
                />
                <Route
                  exact
                  path="/lid/:id/leikir/:teamid"
                  render={routeProps => <TeamGames {...routeProps} />}
                />
                <Route
                  exact
                  path="/ridlar"
                  render={routeProps => <Ridlar {...routeProps} />}
                />
                <Route
                  exact
                  path="/deildir"
                  render={routeProps => <Deildir {...routeProps} />}
                />
                <Route
                  exact
                  path="/ridill/"
                  render={routeProps => <Groups {...routeProps} />}
                />
                <Route
                  exact
                  path="/ridill/:id"
                  render={routeProps => <Group {...routeProps} />}
                />
                <Route
                  exact
                  path="/dagur/:dagur/lid/:id"
                  render={routeProps => <Group {...routeProps} />}
                />
                <Route
                  exact
                  path="/vellir"
                  render={routeProps => <Pitches {...routeProps} />}
                />
                <Route
                  exact
                  path="/vellir/:id"
                  render={routeProps => <Pitch {...routeProps} />}
                />
                 <Route
                  exact
                  path="/handbok"
                  render={routeProps => <Handbok {...routeProps} />}
                />
                <Route component={NothingFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}