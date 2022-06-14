import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styles from './less/standingsrow.less'


export default class StandingsRow extends Component{

    render(){
        const {
           draw,
           goals_conceded,
           goals_scored,
           lost,
           won,
           order,
           points,
           team_name,
           club_id,
           team_id,
           selectedID
        } = this.props

        const activeTeam = selectedID == team_id;

        return (
            <Link to={`/lid/${club_id}/leikir/${team_id}`} className={[styles.row, activeTeam ? styles.active: ''].join(' ')}>
                <div>{order}</div>
                <div className={styles.club}>
                    <div className={styles.logo}>
                        <img src={`/images/clubs/${club_id}.svg`} />
                    </div>
                    <div>{team_name}</div>
                </div>
                <div>{won+lost+draw}</div>
                <div>{won}</div>
                <div>{draw}</div>
                <div>{lost}</div>
                <div>{goals_scored} : {goals_conceded}</div>
                <div>{points}</div>
            </Link>
        )
    }
}