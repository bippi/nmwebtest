import React, { Component } from 'react'

export default class Contacts extends Component {

	constructor(props){
		super(props)
	}

    
	render(){
		return(
			<div>
				{this.props.contacts.map((contact, key) =>{
                    return <div key={key}>
                        {contact.contact.name} - {contact.contact.type}<br />
                        {contact.contact.emailAddress}<br />
                        {contact.contact.mobile}
                    </div>
                })}
			</div>
		)
	}
}

