import React from 'react'

const NothingFound = (match) => {
	return (
	 	<h1>Þessi síða finnst ekki {match.location.pathname}</h1>
	)
}


export default NothingFound