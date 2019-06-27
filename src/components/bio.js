/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {

  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Personal Blog of <strong>{author}</strong> who is an Undergraduate Engineering Student in 
        College of Engineering Kidangoor, a <i>GitHub Campus Expert</i> and a Python, Js lover.<br></br>
        {` `}
	You can find him on<br></br>
	<span style={{background:`azure`}}>
		<a href="https://github.com/Athul-CA"><img src="https://cdn.svgporn.com/logos/github-icon.svg" height="32px" width="32px"/></a>
	</span>
	<span>
		<a href="https://twitter.com/athulcajay">"<img src="https://cdn.svgporn.com/logos/twitter.svg" height="32px" width="32px"/></a>
	</span>
      </p>
    </div>
  )
}

export default Bio
