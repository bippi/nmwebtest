import React, { Component } from "react";
import { Link } from "react-router-dom";
import Settings from "Settings";
import styles from "./less/pitches.less";
import Loader from "Components/Loader/Loader";
import axios from "axios";

export default class Pitches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      pitches: null
    };
  }

  renderGroups() {
    const groups = this.state.groups.map((group, key) => {
      return (
        <Link to={`/ridill/${group.id}`} key={key}>
          <span className={styles.name}>{group.name.substring(0, 16)}</span>
        </Link>
      );
    });
    return groups;
  }

  componentDidMount() {
    axios
      .get(`${Settings.dataUrl}Groups`)
      .then(response => {
        //console.log(response);
        this.setState({
          groups: response.data,
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

        <h1>Riðlar</h1>
        {this.state.groups && (
          <div className={styles.pitches}>
            <div>{this.renderGroups()}</div>
          </div>
        )}
      </div>
    );
  }
}
