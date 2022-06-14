import React from 'react'
import styles from './Burger.less'

const Burger = (props) => {
	const isOpen = props.navOpen ? styles.sidebarOpen :  styles.sidebarClose;
	return (
	 	<div onClick={props.toggle} className={styles.burger + ' ' + props.className + ' ' + isOpen}>
	 		<div></div>
	 		<div></div>
	 		<div></div>
	 	</div>
	)
}

export default Burger