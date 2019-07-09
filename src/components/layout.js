import React from "react"
import Helmet from 'react-helmet'
import { Link } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  renderHeader() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      return(
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
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      return(
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
              color: `inherit`,
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
        <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <React.Fragment>
              <Helmet
                meta={[
                  {
                    name: 'theme-color',
                    content: theme === 'dark' ? '#282828' : '#f0da4f',
                  },
                ]}
              />
              <label style={{ float: 'right' }}>
                <input
                  type="checkbox"
                  onChange={e =>
                    toggleTheme(e.target.checked ? 'dark' : 'light')
                  }
                  checked={theme === 'dark'}
                />{' '}
                Dark mode
              </label>
            </React.Fragment>
          )}
        </ThemeToggler>
          © {new Date().getFullYear()}, Built by Athul with
          {` `}
          <a href="https://www.gatsbyjs.org" style={{ color: `rebeccapurple` }}>
            Gatsby
          </a>
          <p
            style={{
              textDecoration: `bold`,
            }}
          >
            The Logo was designed by{" "}
            <a
              href="https://github.com/ForgottenTale"
              style={{ color: `inherit` }}
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
