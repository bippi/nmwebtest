import React, { Component } from 'react'
import { Link } from "react-router-dom";
import styles from '../less/pitch.less'
import Settings from 'Settings'
import Loader from 'Components/Loader/Loader'
import MatchRow from 'Components/Admin/Match/MatchRow'
import axios from 'axios'


export default class Pitch extends Component {

	constructor(props){
		super(props)

		this.state = {
			isLoading: true,
            matches : null,
            pitchName: '',
            structureName: '',
			pitches: null,
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
		axios
		.get(`${Settings.dataUrl}Pitch`)
		.then(response => {
			//console.log(response);
			this.setState({
			pitches: response.data,
			isLoading: false
			});
			console.log(response.data);
		})
		.catch(error => {
			console.log(error);
		});

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
	componentDidUpdate(prevProps) {
		console.log(prevProps);

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
					matches: null,
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
				{!this.state.noData && this.state.pitchName && this.state.pitches && <div className={styles.jumpPitch}>
					<div>
						{parseInt(this.state.pitchName.substring(7)) >= 2 && <Link to={`/admin/vellir/${this.state.pitches[parseInt(this.state.pitchName.substring(7)) - 2].id}`} className={styles.jumpLeft}>
							{this.state.pitches[parseInt(this.state.pitchName.substring(7)) - 2].name}
						</Link>}
					</div>
					<div>
						<Link to={`/admin/vellir/`} className={styles.jumpAll}>
							Allir vellir
						</Link>
					</div>
					<div>
						<Link to={`/admin/vellir/${this.state.pitches[parseInt(this.state.pitchName.substring(7))].id}`} className={styles.jumpRight}>
							{this.state.pitches[parseInt(this.state.pitchName.substring(7))].name}
						</Link>
					</div>
				</div>}
                {!this.state.noData && this.state.pitchName && <div>
					<h1>{this.state.pitchName} </h1>
				</div>}
				{!this.state.noData && this.state.matches && <div>
					{this.renderMatches()}
				</div>}
			</div>
		)
	}
}

