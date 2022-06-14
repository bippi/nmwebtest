import React, { Component } from "react";
import { Router, Route, Link, Redirect, Switch } from "react-router-dom";

import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";
import Pitches from "./Containers/Admin/Pitches";
import Pitch from "./Containers/Admin/Pitch";
import ScrollToTop from "./Containers/ScrollToTop";
import styles from "./layout.less";
import NothingFound from "./Components/404";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();
let isProd = window.location.hostname.indexOf("kfia") != -1 ? true : false;

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      sideNavOpen: false,
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
            <Header
              navOpen={this.state.sideNavOpen}
              toggleSideNav={this.toggleSideNavState}
            />
            <div className={styles.content}>
              <Switch>
                <Redirect exact from="/admin" to="/admin/vellir" />
                <Redirect exact from="/" to="/admin" />

                <Route
                  exact
                  path="/admin/vellir"
                  render={(routeProps) => <Pitches {...routeProps} />}
                />
                <Route
                  exact
                  path="/admin/vellir/:id"
                  render={(routeProps) => <Pitch {...routeProps} />}
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
