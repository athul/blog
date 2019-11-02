/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { GitHub, Instagram, Twitter } from "react-feather"
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
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
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
        Personal Blog of <strong style={{ color: `hotpink` }}>{author}</strong>{" "}
        who is an Undergraduate Engineering Student in College of Engineering
        Kidangoor, a{"   "}
        <a href="https://githubcampus.expert/athul">
          GitHub Campus Expert
        </a>{" "}
        and a Python, Js lover.<br></br>
        {` `}
        You can find him on<br></br>
        <span>
          <a href="https://github.com/athul" style={{ color: "var(--link)" }}>
            <GitHub color="gray" size={30} />

          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {/* </span>
        <span> */}
          <a href="https://twitter.com/athulcajay" style={{ color: "var(--link)" }}>
            <Twitter color="skyblue" size={30} />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a
            href="https://instagram.com/athul_c_ajay"
            style={{ color: "var(--link)" }}
          >
            <Instagram color="magenta" size={30} />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </p>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <React.Fragment>
            <Helmet
              meta={[
                {
                  name: "theme-color",
                  content: theme === "dark" ? "#282828" : "#f0da4f",
                },
              ]}
            />
            <label style={{ float: "right" }}>
              <input
                type="checkbox"
                onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
                checked={theme === "dark"}
              />
              🌞
            </label>
          </React.Fragment>
        )}
      </ThemeToggler>
    </div>
  )
}

export default Bio
