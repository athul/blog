import React from "react"

import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  renderHeader() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      return (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `tomato`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      return (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `tomato`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
  }
  render() {
    const { children } = this.props
    return (
      <div
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--textNormal)",
          transition: "color 0.2s ease-out, background 0.2s ease-out",
          marginLeft: `auto`,
          marginRight: `auto`,

          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{this.renderHeader()}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built by Athul with
          {` `}
          <a href="https://www.gatsbyjs.org" style={{ color: `rebeccapurple` }}>
            Gatsby
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span>
            <a
              href="https://blog.athulcyriac.co/rss.xml"
              style={{ color: `hotpink` }}
            >
              RSS Feed
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://github.com/athul/blog" style={{ color: `lime` }}>
              Source
            </a>
          </span>
          <p
            style={{
              textDecoration: `bold`,
            }}
          >
            The Logo was designed by{" "}
            <a
              href="https://github.com/ForgottenTale"
              style={{ color: `teal` }}
            >
              Abhijith Kannan
            </a>{" "}
            a good friend of mine
          </p>
        </footer>
      </div>
    )
  }
}

export default Layout
