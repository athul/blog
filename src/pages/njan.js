import React from "react"
import {graphql} from "gatsby"
import {rhythm} from "../utils/typography"
import Layout from "../components/layout"
import Card from "../components/card"   

class njan extends React.Component {
	render(){
		const {data}=this.props
		const siteTitle=data.site.siteMetadata.title
	}
		return(
			<body style={{
				background:`grey`
				}}>
			<Layout location={this.props.location} >
				<h1 style={{
	marginBottom: rhythm(1/4),
	color:`white`}}>I am Athul Cyriac Ajay</h1>
	<p>I am a <strong>GitHub Campus Expert</strong>🚩🚩,Hackathon Organizer, Developer, and moreover a Human Being😊</p> 
	<p style={{color:`azure`}}> Made this Blog with The Blog Starter from Gatsby</p>
	<Card title="Hackathon Sponsor Searches" url="https://github.com/hackathon-sponsor-searches" bg="purple">
		Some potential Hackathon Sponsors
	</Card>
			</Layout>
		</body>
		)
	}
}
export default njan

export const njanq=graphql`
query{
 site{
  siteMetadata{
   title
   }
  }
}`
