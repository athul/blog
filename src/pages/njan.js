import React from "react"
import {rhythm} from "../utils/typography"
import Layout from "../components/layout"
import Card from "rebass"   

class njan extends React.Component {
	render(){
	return(
			<body style={{
				background:`grey`
				}}>
			
				<h1 style={{
	marginBottom: rhythm(1/4),
	color:`white`}}>I am Athul Cyriac Ajay</h1>
	<p>I am a <strong>GitHub Campus Expert</strong>🚩🚩,Hackathon Organizer, Developer, and moreover a Human Being😊</p> 
	<p style={{color:`azure`}}> Made this Blog with The Blog Starter from Gatsby</p>
	<Card
		fontSize={6}
  fontWeight='bold'
  width={[ 1, 1, 1/2 ]}
  p={5}
  my={5}
  bg='#f6f6ff'
  borderRadius={8}
  boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'> 
		Some potential Hackathon Sponsors
	</Card>
		</body>
		)
	}
}

export default njan
