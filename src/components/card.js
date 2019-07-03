import React from "react"
import {rhythm} from "../utils/typography"
import {Link} from "gatsby"
import Proptypes from "prop-types"
class Card extends React.Component {
	render() {
		const { title,children,url,bg }=this.props
		const Head=(
			<h5 style={{
				marginTop:rhythm(.5),
				marginBottom:rhythm(1)
				}}>
				<Link style={{
					boxShadow:`toRight`,
					color:`white`}}
	to={url}>{title}</Link>
</h5>
		)
		const Desc=(
			<p style={{
				marginBottom:rhythm(.5),
				color:`white`
				}}>{children}</p>
		)
		return(
		<div style={{
			cursor:`pointer`,
			background:{bg},
			marginBottom:rhythm(1),
			marginTop:rhythm(.5)
			}}>
			<Head>{Head}</Head>
			<Desc>{Desc}</Desc>
		</div>
	)
	}
	/*Card.defaultProps={
		title: `Project Title`,
		url: `https:\\github.com/Athul-CA`,
		bg: `teal`
	}
	Card.propTypes={
		title:PropTypes.string.isRequired,
		bg:PropTypes.string,
	}*/
}
export default Card

