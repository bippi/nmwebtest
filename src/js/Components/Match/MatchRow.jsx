import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./less/matchrow.less";
import moment from "moment";
let errorCount = 0;

const MatchRow = ({
  away_club_id,
  home_club_id,
  away_team_name,
  home_team_name,
  start_timestamp,
  playing_field_name,
  playing_field_id,
  day,
  homeClubID,
  awayClubID,
  homeGroupTeamID,
  awayGroupTeamID,
  selectedID,
  group_id,
  team_classification_id,
  showClassification,
  calculated_score,
})=>{
  const activeTeam =
  selectedID &&
  (selectedID == homeGroupTeamID || selectedID == awayGroupTeamID);

  const onLogoError =(e)=> {
    errorCount: errorCount + 1;
    if (errorCount < 10) {
      e.target.src = "/images/clubs/nologo.svg";
    }
  }


  return (
    <div
      className={[styles.matchrow, styles.schedulerow, activeTeam ? styles.active : ""].join(" ")}
    >
      <div className={styles.upperrow}>
        <span>
        {showClassification && day === 'Fös' && (
          <Link to={`/ridill/${group_id}`}>
            <span className={styles.cl}>
              <span className={styles.long}>
                Riðill {group_id} 
              </span>
              <span className={styles.short}>{team_classification_id}</span>
            </span>
          </Link>
        )}
        {day !== 'Fös' && ( <span className={styles.cl}>
              <span className={styles.long}>
                Deild {group_id} 
              </span>
              <span className={styles.short}>{team_classification_id}</span>
            </span>)}
        </span>
        <span>{day} {moment(`2018-06-09 ${start_timestamp}`).format("HH:mm")}</span>
       
        <span>
          <Link to={`/vellir/${playing_field_id}`}>
            {playing_field_name}
          </Link>
        </span>
      </div>
      <div className={styles.home}>
        <div className={styles.logo}>
          <img
            onError={onLogoError}
            src={`/images/clubs/${
              home_club_id ? home_club_id : homeClubID
            }.svg`}
          />
        </div>
        <div>{home_team_name}</div>
      </div>
      <div className={styles.score}>
        <div>{calculated_score && calculated_score.home_team_goals}</div>
        <div>-</div>
        <div>{calculated_score && calculated_score.away_team_goals}</div>
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
    </div>
  );
}

export default MatchRow;

// export default class MatchRow extends Component {
//   onLogoError(e) {
//     errorCount: errorCount + 1;
//     if (errorCount < 10) {
//       e.target.src = "/images/clubs/nologo.svg";
//     }
//   }

//   render() {
//     const {
//       away_club_id,
//       home_club_id,
//       away_team_name,
//       home_team_name,
//       timestamp_start,
//       playing_field_name,
//       playing_field_id,
//       day,
//       homeClubID,
//       awayClubID,
//       homeGroupTeamID,
//       awayGroupTeamID,
//       selectedID,
//       group_id,
//       team_classification_id,
//       showClassification,
//       calculated_score
//     } = this.props;

//     const activeTeam =
//       selectedID &&
//       (selectedID == homeGroupTeamID || selectedID == awayGroupTeamID);

//     return (
//       <div
//         className={[styles.matchrow, styles.schedulerow, activeTeam ? styles.active : ""].join(" ")}
//       >
//         <div className={styles.upperrow}>
//           <span>
//           {showClassification && (
//             <Link to={`/ridill/${group_id}/${team_classification_id}`}>
//               <span className={styles.cl}>
//                 <span className={styles.long}>
//                   Riðill {group_id} 
//                 </span>
//                 <span className={styles.short}>{team_classification_id}</span>
//               </span>
//             </Link>
//           )}
//           </span>
//           <span>{day} {moment(`2018-06-09 ${timestamp_start}`).format("HH:mm")}</span>
         
//           <span>
//             <Link to={`/vellir/${playing_field_id}`}>
//               {playing_field_name}
//             </Link>
//           </span>
//         </div>
//         <div className={styles.home}>
//           <div className={styles.logo}>
//             <img
//               onError={this.onLogoError}
//               src={`/images/clubs/${
//                 home_club_id ? home_club_id : homeClubID
//               }.svg`}
//             />
//           </div>
//           <div>{home_team_name}</div>
//         </div>
//         <div className={styles.score}>
//           <div>{calculated_score && calculated_score.home_team_goals}</div>
//           <div>-</div>
//           <div>{calculated_score && calculated_score.away_team_goals}</div>
//         </div>
//         <div className={styles.away}>
//           <div className={styles.logo}>
//             <img
//               onError={this.onLogoError}
//               src={`/images/clubs/${
//                 away_club_id ? away_club_id : awayClubID
//               }.svg`}
//             />
//           </div>
//           <div>{away_team_name}</div>
//         </div>
//       </div>
//     );
//   }
// }
