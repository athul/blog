import React from "react"
import {graphql} from "gatsby"
import {rhythm} from "../utils/typography"
import Layout from "../components/layout"

class njan extends React.Component {
	render(){
		const {data}=this.props
		const siteTitle=data.site.siteMetadata.title
		return(
			<body style={{
				background:`grey`
				}}>
			<Layout location={this.props.location} >
				<h1 style={{
	marginBottom: rhythm(1/4),
					color:`white`}}>I am Athul Cyriac Ajay</h1>
					<p>I am a GitHub Campus Expert🚩🚩,Hackathon Organizer, Developer, and moreover a Human Being😊</p> 
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
