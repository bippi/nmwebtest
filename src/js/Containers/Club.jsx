import React, { Component } from "react";
import styles from "./less/team.less";
import Settings from "Settings";
import { Link } from "react-router-dom";
import Loader from "Components/Loader/Loader";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Club extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      club:null,
      teams:null,
      t2Teams:[]
      
    };
  }

  renderTeams() {
    this.state.teams.sort((a, b) => (a.club_team_number - b.club_team_number ));
    const teams = this.state.teams.map((team, key) => {
      return (
        <div key={key} className={styles.team}>
          <div className={styles.teamName}>
            {team.name} - {team.classification}
          </div>
          <div className={styles.gameDays}>
            <Link to={
              {
                pathname: `/lid/${this.state.club.key}/leikir/${team.id}`,
                ...team
              }
            } className={styles.day}>
              <span className={styles.shortName}>Dagskrá</span>
              <span className={styles.longName}>Dagskrá</span>
            </Link>
          </div>
        </div>
      );
    });
    return teams;
  }

  componentDidMount() {
    axios
      .get(Settings.dataUrl + "Teams/" + this.props.match.params.id)
      .then(response => {
        //console.log("bla");
        
        this.setState({
          club: response.data.club,
          teams: response.data.teams,
          numTeams: response.data.numTeams,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={styles.club}>
        {this.state.isLoading && <Loader />}
        {this.state.club && (
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={`/images/clubs/${this.state.club.key}.svg`} />
            </div>
            <div className={styles.info}>
              <h1>{this.state.club.name}</h1>
              {/* <div>Fjöldi leikmanna: {this.state.club.numPlayers}</div> */}
              
              <div>Fjöldi liða: {this.state.club.numTeams}</div>
              <div className={styles.gameDays}>
                <Link
                  to={`/lid/${this.state.club.key}/leikir/`}
                  className={styles.day}
                >
                  <span className={styles.shortName}>Leikir</span>
                  <span className={styles.longName}>Leikir</span>
                </Link>
                
               <div><a className={styles.day} href={`/csv/${this.state.club.key}-fos.csv`}>CSV-fös</a></div>
              </div>
            </div>
          </div>
        )}
        {this.state.teams && (
          <div className={styles.teams}>{this.renderTeams()}</div>
        )}
      </div>
    );
  }
}

export default withRouter(Club);
