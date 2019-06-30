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
				}}
			<Layout location={this.props.location} title=`About me`>
				<h1 style={{
	marginBottom: rhythm(1/4),
	color:`fuschia`
				}}>I am Athul Cyriac Ajay</h1>
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
