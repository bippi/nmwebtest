import React, { Component } from "react";
import styles from "./less/group.less";
import standingsStyles from "Components/Standings/less/standingsrow.less";
import Settings from "Settings";
import Loader from "Components/Loader/Loader";
import MatchRow from "Components/Match/MatchRow";
import StandingsRow from "Components/Standings/StandingsRow";
import axios from "axios";

export default class Group extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      matches: null,
      teams: null,
      noData: true,
      groupInfo: null,
      groupClass: null,
      teamId: null,
      tournamentId: null
    };
  }

  renderMatches() {
    const matches = this.state.matches.map((match, key) => {
      // console.log(match)
      const homeClubID = this.getClubId(match.home_team_internal_id);
      const awayClubID = this.getClubId(match.away_team_internal_id);
      const homeGroupTeamID = this.getTeamGroupID(match.home_team_id);
      const awayGroupTeamID = this.getTeamGroupID(match.away_team_id);
      return (
        <MatchRow
          homeGroupTeamID={homeGroupTeamID}
          awayGroupTeamID={awayGroupTeamID}
          homeClubID={homeClubID}
          awayClubID={awayClubID}
          selectedID={this.state.teamId}
          key={key}
          {...match}
        />
      );
    });
    return matches;
  }

  getClubId(teamId) {
    //console.log("teamId", teamId);
    const team = this.state.teams.find(team => {
      return team.team_internal_id == teamId;
    });

    return team ? team.club_id : null;
  }

  getTeamGroupID(teamId) {
    const team = this.state.teams.find(team => {
      return team.team_internal_id == teamId;
    });
    return team ? team.team_id : null;
  }

  renderStandings() {
    this.state.teams.sort((a, b) => (a.rank - b.rank ));
    const teams = this.state.teams.map((team, key) => {
      return (
        <StandingsRow selectedID={this.state.teamId} key={key} order={key + 1} {...team} />
      );
    });
    return teams;
  }

  componentDidMount() {
    axios
      .get(
        `${Settings.dataUrl}Groups/${this.props.match.params.id}`
      )
      .then(response => {
        const respObj = response.data;
        // console.log(respObj);
        if (respObj.group) {
          const group = respObj.group;
          //const classification = respObj.NAM[0].classification[0].classification;
          const matches = respObj.matches;
          const teams = respObj.teams;
          // console.log(teams);
          if (group) {
            this.setState({
              matches: matches,
              teams: teams ? teams : null,
              //groupClass: classification,
              groupInfo: group,
              teamId: this.props.match.params.id,
              noData: false,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
              noData: true
            });
          }
        } else {
          this.setState({
            isLoading: false,
            noData: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={styles.group}>
        {this.state.isLoading && <Loader />}
        {this.state.noData && !this.state.isLoading && (
          <div>Leikjaröðun ekki tilbúin</div>
        )}
        {this.state.groupInfo && (
          <div className={styles.info}>
            {this.state.groupInfo.name}
          </div>
        )}
        {this.state.matches && (
          <div className={styles.matches}>
            <h1>Leikir</h1>
            <div>{this.renderMatches()}</div>
          </div>
        )}
        {this.state.teams && (
          <div className={styles.standings}>
            <h1>Staða</h1>
            <div className={standingsStyles.row}>
              <div>#</div>
              <div className={standingsStyles.club}>Lið</div>
              <div>L</div>
              <div>U</div>
              <div>J</div>
              <div>T</div>
              <div>M</div>
              <div>S</div>
            </div>
            {  this.renderStandings()}
          </div>
        )}
      </div>
    );
  }
}
