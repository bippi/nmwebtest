import React, { Component } from "react";
import { Link } from "react-router-dom";
import Settings from "Settings";
import styles from "./less/pitches.less";
import Loader from "Components/Loader/Loader";
import MatchRow from "Components/Match/MatchRow";
import axios from "axios";

export default class Pitches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      pitches: null
    };
  }

  renderPitches() {
    const pitches = this.state.pitches.map((pitch, key) => {
      return (
        <Link to={`/vellir/${pitch.id}`} key={key}>
          <span className={styles.name}>{pitch.name}</span>
          <span className={styles.structure}>{pitch.structure_name}</span>
        </Link>
      );
    });
    return pitches;
  }

  componentDidMount() {
    axios
      .get(`${Settings.dataUrl}Pitch`)
      .then(response => {
        //console.log(response);
        this.setState({
          pitches: response.data,
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

        <h1>Vellir</h1>
        {this.state.pitches && (
          <div className={styles.pitches}>
            <div>{this.renderPitches()}</div>
          </div>
        )}
      </div>
    );
  }
}
