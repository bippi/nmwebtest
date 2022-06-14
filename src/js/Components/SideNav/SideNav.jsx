import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styles from './SideNav.less'
import Burger from '../Burger/Burger'

export default class SideNav extends Component{
	constructor(){
		super()
	}
	
	render(){
		const isOpen = this.props.navOpen ? styles.sidebarOpen :  styles.sidebarClose;
		return(
			<div className={styles.sidebar + ' ' + isOpen}>
				<div className={styles.menuWrapper}>
					<ul className={styles.menu}>
						<li className={styles.menuItem}>
							<NavLink onClick={this.props.toggleSideNav} to="/lid">Félög</NavLink>
						</li>	
						<li className={styles.menuItem}>
							<NavLink onClick={this.props.toggleSideNav} to="/vellir">Vellir</NavLink>
						</li>	
						<li className={styles.menuItem}>
							<NavLink onClick={this.props.toggleSideNav} to="/ridill">Riðlar</NavLink>
						</li>
						<li className={styles.menuItem}>
							<NavLink onClick={this.props.toggleSideNav} to="/handbok">Handbók</NavLink>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}