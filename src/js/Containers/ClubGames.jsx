import React, { Component } from 'react'
import Settings from 'Settings'
import styles from './less/clubgames.less'
import Loader from 'Components/Loader/Loader'
import MatchRow from 'Components/Match/MatchRow'
import axios from 'axios'


export default class ClubGames extends Component {

	constructor(props){
		super(props)

		this.state = {
			isLoading: true,
			matches : null,
            noData: true,
		}
	}

	renderMatches(){
       
		const matches = this.state.matches.map((match, key) => {
           // console.log(match) 
           
			return <MatchRow showClassification={true} key={key} {...match}/>
		})
		return matches
    }

    getClubId(teamId){
        const team = this.state.teams.find((team)=>{
           // console.log(team)
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
    
	
	componentDidMount(){
        axios.get(`${Settings.dataUrl}Program/Club/${this.props.match.params.id}/`)
        .then((response) => {
            if(response.data.matches){
                this.setState({
                    matches: response.data.matches, 
                    noData: false,
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
                <h1>Leikir</h1>
                <div>
                    {this.renderMatches()}
                </div>
            </div>}
           
			</div>
		)
	}
}

