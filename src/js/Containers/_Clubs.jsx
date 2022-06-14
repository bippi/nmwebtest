import React, { Component } from 'react'
import styles from '../Global.less'
import Settings from 'Settings'
import Loader from 'Components/Loader/Loader'
//import ClubInfo from 'Components/Club/ClubInfo'
import Contacts from 'Components/Club/Contacts'
import axios from 'axios'


export default class Clubs extends Component {

	constructor(props){
		super(props)

		this.state = {
			isLoading: true,
			clubs : null
		}
	}


	
	componentDidMount(){
		axios.get(Settings.dataUrl + 'Clubs')
		.then((response) => {
			//this.setState({clubs:response.data.NÁM[0].clubs, isLoading: false});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	


	render(){
		return(
			<div className={styles.teams}>
				{this.state.isLoading && <Loader />}
				{this.state.clubs && <div>
					{this.renderClubs()}
				</div>}
			</div>
		)
	}
}

