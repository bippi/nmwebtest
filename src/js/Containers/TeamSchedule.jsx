import React, { Component } from 'react'
import Settings from 'Settings'
import styles from './less/clubgames.less'
import Loader from 'Components/Loader/Loader'
import MatchRow from 'Components/Match/MatchRow'
import EventRow from 'Components/Event/EventRow'
import axios from 'axios'


export default class TeamSchedule extends Component {

	constructor(props){
		super(props)
		this.state = {
			isLoading: true,
			events : null,
            noData: true,
            team: null,
		}
	}

	renderMatches(){
       
		const matches = this.state.matches.map((match, key) => {
           
			return <MatchRow showClassification={true} key={key} {...match}/>
		})
		return matches
    }

    getClubId(teamId){
        const team = this.state.teams.find((team)=>{
     
            return team.group_team_id == teamId
        })
       
        return team.club_id;
    }

    getTeamGroupID(teamId){
        const team = this.state.teams.find((team)=>{
           // console.log(team)
            return team.group_team_id == teamId
        })
        return team.team_id;
    }

    renderSchedule(matches, events) {
        const schedule = [];
        matches.map((match, key) => {
            match.type = "match";
            schedule.push(match);
        });
        events && events.map((event, key) => {
            event.type = "event";
            schedule.push(event);
        });
        
        schedule.sort((a, b) => (a.day.localeCompare(b.day) || a.start_timestamp.localeCompare(b.start_timestamp) ));
      
		const scheduled = schedule.map((item, key) => {
            // console.log(item);
            if (item.type === "event") {
                return <EventRow key={key} {...item}/>
            }
            else {
                return <MatchRow showClassification={true} key={key} {...item}/>
            }

        });
		return scheduled;
    }
    
	
	componentDidMount(){
        axios.get(`${Settings.dataUrl}Program/Team/${this.props.match.params.teamid}`)
        .then((response) => {
            if(response.data.matches){
                this.setState({
                    matches: response.data.matches,
                    events: response.data.events,
                    noData: false,
                    team: response.data.team,
                    isLoading: false
                })
            }
            else{
                this.setState({
                    noData: true,
                    isLoading: false
                }) 
            }
		})
		.catch((error) => {
			console.log(error)
		});
	}


	render(){
		return(
            <div className={styles.group}>
            {this.state.isLoading && <Loader />}
            {this.state.noData && !this.state.isLoading && <div>Leikjaröðun ekki tilbúin</div>}
           
            {this.state.matches && <div className={styles.matches}>
                <h1>Dagskrá <span>{this.state.team.name}</span></h1>
                <div>
                    {this.renderSchedule(this.state.matches, this.state.events)}
                </div>
            </div>}
			</div>
		)
	}
}

