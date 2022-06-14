import React, { useState } from "react";
import axios from 'axios';
import styles from "./less/matchrow.less";
import moment from "moment";
let errorCount = 0;

const MatchRow = ({ 
  away_club_id,
      home_club_id,
      away_team_name,
      home_team_name,
      start_timestamp,
      match_id,
      day,
      homeClubID,
      awayClubID,
      homeGroupTeamID,
      awayGroupTeamID,
      selectedID,
      actual_score,
})=>{

    const [home_score, setHomeScore] = useState(actual_score ? actual_score.home_team_goals : '');
    const [away_score, setAwayScore] = useState(actual_score ? actual_score.away_team_goals : '');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    

    const activeTeam =
    selectedID &&
    (selectedID == homeGroupTeamID || selectedID == awayGroupTeamID);

   const onLogoError = (e)=> {
      errorCount: errorCount + 1;
      if (errorCount < 10) {
        e.target.src = "/images/clubs/nologo.svg";
      }
    }


    const onHomeScoreChange = (e)=>{
      if(!isNaN(e.target.value)){
        setHomeScore(e.target.value )
      }
      console.log(e.target.value);
    }

    const onAwayScoreChange = (e)=>{
      if(!isNaN(e.target.value)){
        setAwayScore(e.target.value )
      }
      console.log(e.target.value);
    }

    const onReset = ()=>{
      axios.post('/admin/resetMatch', {match_id})
      .then(response=>{
       setShowSuccess(true);
       setShowError(false);
       setHomeScore('');
       setAwayScore('');
       setTimeout(()=>{
        setShowSuccess(false);
       },2000)
      })
      .catch(err =>{
        console.log(err)
        setShowError(true);
      })
    }

    const onSubmit = ()=>{
      axios.post('/admin/match', {home_score, away_score, match_id})
      .then(response=>{
       setShowSuccess(true);
       setShowError(false);
       setTimeout(()=>{
        setShowSuccess(false);
       },2000)
      })
      .catch(err =>{
        console.log(err)
        setShowError(true);
      })
    }


    return (
      <div
        className={[styles.matchrow, styles.schedulerow, activeTeam ? styles.active : "", showSuccess && styles.success, showError && styles.error].join(" ")}
      >
        <div className={styles.upperrow}>
          <span>
            <button tabIndex="-1" className={[styles.button, styles.reset]} onClick={onReset}>E</button>
          </span>
          <span>{day} {moment(`2018-06-09 ${start_timestamp}`).format("HH:mm")}</span>
          <span>
           
          </span>
        </div>
        <div className={styles.home}>
          <div className={styles.logo}>
            <img
              
              src={`/images/clubs/${
                home_club_id ? home_club_id : homeClubID
              }.svg`}
            />
          </div>
          <div>{home_team_name}</div>
        </div>
        <div className={styles.score}>
          <div><input onChange={onHomeScoreChange} value={home_score} /></div>
          <div>-</div>
          <div><input onChange={onAwayScoreChange} value={away_score} /></div>
        </div>
        <div className={styles.away}>
          <div className={styles.logo}>
            <img
              onError={onLogoError}
              src={`/images/clubs/${
                away_club_id ? away_club_id : awayClubID
              }.svg`}
            />
          </div>
          <div>{away_team_name}</div>
         
        </div>
        <button className={styles.button} onClick={onSubmit}>Uppfæra</button>
        
      </div>
    );

}

export default  MatchRow;
