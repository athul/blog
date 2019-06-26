import React from "react"
import { usestaticQuery,graphql } from "gatsby"

const Button=()=>{
	const b_data=useStaticQuery(graphql`
	query socialQuery{
	 site
	    siteMetadata{
	      author{
	        social{
		   twitter
		   github
		   }
	}
  }
}`
)
const {social}=b_data.site.siteMetada
return(
	
