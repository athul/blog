import React from "react"
import {rhythm} from "../utils/typography"
import {Link} from "gatsby"

class Card extends React.Component{
	render(){
		const {title,children,url,bg}=this.props
		const Head=(
			<h5 style={{
				marginTop:rhythm(.5),
				marginBottom:rhythm(1)
				}}>
				<Link style={{
					boxShadow:`toRight`,
	color:`aqua`}}
	to={url}>{title}</Link>
</h5>
		)
		const Desc=(
			<p style={{
				marginBottom:rhythm(.5),
				color:`azure`,
				background:{bg}
				}}>{children}</p>
		)}

	return(
		<div 
		style={{
			display;`flex`,
			marginBottom:rhythm(1.5)
			}}>
			<Head>{Head}</Head>
			<Desc>{Desc}</Desc>
		</div>
	)
	export default Card1

