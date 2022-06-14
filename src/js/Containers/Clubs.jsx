import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./less/teams.less";
import Settings from "Settings";
import Loader from "Components/Loader/Loader";
import axios from "axios";

export default class Clubs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      clubs: null
    };
  }

  renderClubs() {
    const clubs = this.state.clubs.map((club, key) => {
     
      return (
        <div key={key} className={styles.team}>
          <Link to={`/lid/${club.key}`}>
            <div className={styles.logo}>
              <img src={`/images/clubs/${club.key}.svg`} />
            </div>
            <div>{club.name}</div>
          </Link>
        </div>
      );
    });
    return clubs;
  }

  componentDidMount() {
    axios
      .get(Settings.dataUrl + "Clubs")
      .then(response => {
       
        const sortedClubs = response.data.sort((a, b) => {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
         
          return nameA.localeCompare(nameB);
          });
         
        this.setState({
          clubs: sortedClubs,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <Loader />}
        {this.state.clubs && (
          <div className={styles.teams}>{this.renderClubs()}</div>
        )}
      </div>
    );
  }
}
