import React from 'react'
import styles from './Loader.less'

const Loader = (props) => {
	return (
	 	<div className={styles.loader}>
	 		<div className={styles.spinner}></div>
	 	</div>
	)
}


export default Loader