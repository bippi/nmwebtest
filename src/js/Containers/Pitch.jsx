import React, { Component } from 'react'
import styles from './less/pitch.less'
import Settings from 'Settings'
import Loader from 'Components/Loader/Loader'
import MatchRow from 'Components/Match/MatchRow'
import axios from 'axios'


export default class Pitch extends Component {

	constructor(props){
		super(props)

		this.state = {
			isLoading: true,
            matches : null,
            pitchName: '',
            structureName: '',
            noData: true
		}
	}

    renderMatches(){
       
		const matches = this.state.matches.map((match, key) => {
           // console.log(match) 
           
			return <MatchRow showClassification={true}  key={key} {...match}/>
		})
		return matches
    }

	
	componentDidMount(){
		axios.get(Settings.dataUrl + 'Matches?pitchID='+ this.props.match.params.id)
		.then((response) => {
			//console.log(response);
            if(response.data){
                this.setState({
                    matches:response.data, 
                    isLoading: false,
                    pitchName: response.data[0].playing_field_name,
                   
                    noData: false
                });
            }
            else{
                this.setState({
                    isLoading: false,
                    noData: true
                })
            }
		})
		.catch((error) => {
			console.log(error)
		});
	}

	render(){
		return(
			<div className={styles.pitch}>
                {this.state.isLoading && <Loader />}
                {this.state.noData && !this.state.isLoading && <div>Enginn leikur skráður fyrir þennan völl</div>}
                {this.state.pitchName && <div>
					<h1>{this.state.pitchName} </h1>
				</div>}
				{this.state.matches && <div>
					{this.renderMatches()}
				</div>}
			</div>
		)
	}
}

