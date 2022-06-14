import React, { Component } from 'react'

export default class ClubInfo extends Component {

	constructor(props){
		super(props)
	}

    
	render(){
		return(
			<div>
				{this.props.id} <br />
				{this.props.name} <br />
				{this.props.id}<br />
				{this.props.numPlayers}<br />
				{this.props.numTeams}
			</div>
		)
	}
}

