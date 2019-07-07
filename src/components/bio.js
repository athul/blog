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

        Personal Blog of <strong style={{color:`hotpink`}}>{author}</strong> who is an Undergraduate
        Engineering Student in College of Engineering Kidangoor, a{" "}
        <i>GitHub Campus Expert</i> and a Python, Js lover.<br></br>
        {` `}
        You can find him on<br></br>

        <span >
          <a href="https://github.com/Athul-CA" style={{color:`hotpink`}}>
            <img
              alt="Github"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjQiIGhlaWdodD0iNjQiCnZpZXdCb3g9IjAgMCA2NCA2NCIKc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjQgNjQ7OyBmaWxsOiMwMDAwMDA7Ij48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfXzUyNTM5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjMwLjk5ODkiIHkxPSIxNiIgeDI9IjMwLjk5ODkiIHkyPSI1NS4zNDIyIiBzcHJlYWRNZXRob2Q9InJlZmxlY3QiPgk8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiM2REM3RkYiPjwvc3RvcD4JPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRTZBQkZGIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzFfXzUyNTM5KTsiIGQ9Ik0yNS4wMDgsNTYuMDA3Yy0wLjAwMy0wLjM2OC0wLjAwNi0xLjk2Mi0wLjAwOS0zLjQ1NGwtMC4wMDMtMS41NSAgYy02LjcyOSwwLjkxNS04LjM1OC0zLjc4LTguMzc2LTMuODNjLTAuOTM0LTIuMzY4LTIuMjExLTMuMDQ1LTIuMjY2LTMuMDczbC0wLjEyNC0wLjA3MmMtMC40NjMtMC4zMTYtMS42OTEtMS4xNTctMS4zNDItMi4yNjMgIGMwLjMxNS0wLjk5NywxLjUzNi0xLjEsMi4wOTEtMS4wODJjMy4wNzQsMC4yMTUsNC42MywyLjk3OCw0LjY5NCwzLjA5NWMxLjU2OSwyLjY4OSwzLjk2NCwyLjQxMSw1LjUwOSwxLjg0NCAgYzAuMTQ0LTAuNjg4LDAuMzY3LTEuMzIsMC42NTktMS44NzhDMjAuODg1LDQyLjg2NSwxNS4yNyw0MC4yMjksMTUuMjcsMzAuNjRjMC0yLjYzMywwLjgyLTQuOTYsMi40NDEtNi45MjkgIGMtMC4zNjItMS4yMDYtMC43NzQtMy42NjYsMC40NDYtNi43NjVsMC4xNzQtMC40NDJsMC40NTItMC4xNDRjMC40MTYtMC4xMzcsMi42ODgtMC42MjQsNy4zNTksMi40MzMgIGMxLjkyOC0wLjQ5NCwzLjk2OS0wLjc0OSw2LjA3NC0wLjc1OWMyLjExNSwwLjAxLDQuMTU4LDAuMjY1LDYuMDksMC43NTljNC42NjctMy4wNTgsNi45MzQtMi41NjUsNy4zNTEtMi40MzNsMC40NTEsMC4xNDUgIGwwLjE3NCwwLjQ0YzEuMjI1LDMuMDk4LDAuODEzLDUuNTU5LDAuNDUxLDYuNzY2YzEuNjE4LDEuOTYzLDIuNDM4LDQuMjkxLDIuNDM4LDYuOTI5YzAsOS41OTEtNS42MjEsMTIuMjE5LTEwLjU4OCwxMy4wODcgIGMwLjU2MywxLjA2NSwwLjg2OCwyLjQwMiwwLjg2OCwzLjg3OGMwLDEuNjgzLTAuMDA3LDcuMjA0LTAuMDE1LDguNDAybC0yLTAuMDE0YzAuMDA4LTEuMTk2LDAuMDE1LTYuNzA4LDAuMDE1LTguMzg5ICBjMC0yLjQ0Mi0wLjk0My0zLjUyMi0xLjM1LTMuODc0bC0xLjczLTEuNDk3bDIuMjc0LTAuMjUzYzUuMjA1LTAuNTc4LDEwLjUyNS0yLjM3OSwxMC41MjUtMTEuMzQxYzAtMi4zMy0wLjc3Ny00LjM2MS0yLjMxLTYuMDM2ICBsLTAuNDMtMC40NjlsMC4yNDItMC41ODdjMC4xNjYtMC40MDEsMC44OTQtMi40NDItMC4wNDMtNS4yOTFjLTAuNzU4LDAuMDQ1LTIuNTY4LDAuNDAyLTUuNTg0LDIuNDQ3bC0wLjM4NCwwLjI1OWwtMC40NDUtMC4xMjMgIGMtMS44NjMtMC41MTgtMy45MzgtMC43OTYtNi4wMDEtMC44MDZjLTIuMDUyLDAuMDEtNC4xMjQsMC4yODgtNS45ODQsMC44MDZsLTAuNDQ1LDAuMTIzbC0wLjM4My0wLjI1OSAgYy0zLjAxOS0yLjA0NC00LjgzMy0yLjQwNC01LjU5NC0yLjQ0OWMtMC45MzUsMi44NTEtMC4yMDYsNC44OTItMC4wNCw1LjI5M2wwLjI0MiwwLjU4N2wtMC40MjksMC40NjkgIGMtMS41MzYsMS42ODEtMi4zMTQsMy43MTItMi4zMTQsNi4wMzZjMCw4Ljk1OCw1LjMxLDEwLjc3LDEwLjUwNCwxMS4zNjFsMi4yNTIsMC4yNTZsLTEuNzA4LDEuNDkgIGMtMC4zNzIsMC4zMjUtMS4wMywxLjExMi0xLjI1NCwyLjcyN2wtMC4wNzUsMC41NDlsLTAuNTA2LDAuMjI3Yy0xLjMyMSwwLjU5Mi01LjgzOSwyLjE2Mi04LjU0OC0yLjQ4NSAgYy0wLjAxNS0wLjAyNS0wLjU0NC0wLjk0NS0xLjUwMi0xLjU1N2MwLjY0NiwwLjYzOSwxLjQzMywxLjY3MywyLjA2OCwzLjI4N2MwLjA2NiwwLjE5LDEuMzU3LDMuNjIyLDcuMjgsMi4zMzlsMS4yMDYtMC4yNjIgIGwwLjAxMiwzLjk3OGMwLjAwMywxLjQ4NywwLjAwNiwzLjA3NiwwLjAwOSwzLjQ0NEwyNS4wMDgsNTYuMDA3eiI+PC9wYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMl9fNTI1MzkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMzIiIHkxPSI1IiB4Mj0iMzIiIHkyPSI1OS4xNjY5IiBzcHJlYWRNZXRob2Q9InJlZmxlY3QiPgk8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMxQTZERkYiPjwvc3RvcD4JPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojQzgyMkZGIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzJfXzUyNTM5KTsiIGQ9Ik0zMiw1OEMxNy42NjMsNTgsNiw0Ni4zMzcsNiwzMlMxNy42NjMsNiwzMiw2czI2LDExLjY2MywyNiwyNlM0Ni4zMzcsNTgsMzIsNTh6IE0zMiw4ICBDMTguNzY3LDgsOCwxOC43NjcsOCwzMnMxMC43NjcsMjQsMjQsMjRzMjQtMTAuNzY3LDI0LTI0UzQ1LjIzMyw4LDMyLDh6Ij48L3BhdGg+PC9zdmc+"
              height="32px"
              width="32px"
            />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {/* </span>
        <span> */}
          <a href="https://twitter.com/athulcajay" style={{color:`hotpink`}}>
            <img
              alt="Twitter"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjQiIGhlaWdodD0iNjQiCnZpZXdCb3g9IjAgMCA2NCA2NCIKc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjQgNjQ7OyBmaWxsOiMwMDAwMDA7Ij48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfXzQ0MDU1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjMyIiB5MT0iMTYuMjUiIHgyPSIzMiIgeTI9IjQ4LjMxMjQiIHNwcmVhZE1ldGhvZD0icmVmbGVjdCI+CTxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzZEQzdGRiI+PC9zdG9wPgk8c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNFNkFCRkYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjU1ZHSURfMV9fNDQwNTUpOyIgZD0iTTI2LjA2NCw0NS4wMDNjMTIuMDc2LDAsMTguNjgtMTAuMDA1LDE4LjY4LTE4LjY4YzAtMC4yODQtMC4wMDYtMC41NjctMC4wMTktMC44NDkgIGMxLjI4Mi0wLjkyNywyLjM5Ni0yLjA4MywzLjI3NS0zLjM5OWMtMS4xNzYsMC41MjMtMi40NDIsMC44NzUtMy43NywxLjAzNGMxLjM1NS0wLjgxMywyLjM5Ni0yLjA5OSwyLjg4Ny0zLjYzMiAgYy0xLjI2OSwwLjc1Mi0yLjY3MywxLjI5OS00LjE2OSwxLjU5NGMtMS4xOTgtMS4yNzYtMi45MDQtMi4wNzQtNC43OTItMi4wNzRjLTMuNjI2LDAtNi41NjYsMi45NC02LjU2Niw2LjU2NSAgYzAsMC41MTUsMC4wNTgsMS4wMTYsMC4xNywxLjQ5N2MtNS40NTYtMC4yNzQtMTAuMjk1LTIuODg3LTEzLjUzMi02Ljg1OWMtMC41NjQsMC45Ny0wLjg4OSwyLjA5Ny0wLjg4OSwzLjMgIGMwLDIuMjc4LDEuMTU5LDQuMjg5LDIuOTIyLDUuNDY1Yy0xLjA3Ny0wLjAzMy0yLjA4OS0wLjMyOS0yLjk3NC0wLjgyMWMtMC4wMDEsMC4wMjctMC4wMDEsMC4wNTUtMC4wMDEsMC4wODQgIGMwLDMuMTgsMi4yNjMsNS44MzQsNS4yNjcsNi40MzZjLTAuNTUxLDAuMTUtMS4xMzIsMC4yMzEtMS43MzEsMC4yMzFjLTAuNDIzLDAtMC44MzQtMC4wNDItMS4yMzQtMC4xMTggIGMwLjgzNiwyLjYwOCwzLjI1OSw0LjUwNiw2LjEzMyw0LjU2Yy0yLjI0NywxLjc2MS01LjA3OCwyLjgxLTguMTU0LDIuODFjLTAuNTMsMC0xLjA1Mi0wLjAzLTEuNTY2LTAuMDkxICBDMTguOTA2LDQzLjkxNiwyMi4zNTYsNDUuMDAzLDI2LjA2NCw0NS4wMDMiPjwvcGF0aD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfXzQ0MDU1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjMyIiB5MT0iNS4yNSIgeDI9IjMyIiB5Mj0iNTkuMzgwMSIgc3ByZWFkTWV0aG9kPSJyZWZsZWN0Ij4JPHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMUE2REZGIj48L3N0b3A+CTxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0M4MjJGRiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF8yX180NDA1NSk7IiBkPSJNMzIsNThDMTcuNjYzLDU4LDYsNDYuMzM3LDYsMzJTMTcuNjYzLDYsMzIsNnMyNiwxMS42NjMsMjYsMjZTNDYuMzM3LDU4LDMyLDU4eiBNMzIsOCAgQzE4Ljc2Nyw4LDgsMTguNzY3LDgsMzJzMTAuNzY3LDI0LDI0LDI0czI0LTEwLjc2NywyNC0yNFM0NS4yMzMsOCwzMiw4eiI+PC9wYXRoPjwvc3ZnPg=="
              height="32px"
              width="32px"
            />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="https://instagram.com/athulcajay" style={{color:`hotpink`}}>
            <img
              alt="Instagram"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjQiIGhlaWdodD0iNjQiCnZpZXdCb3g9IjAgMCA2NCA2NCIKc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjQgNjQ7OyBmaWxsOiMwMDAwMDA7Ij48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfXzQzNjI1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjMyIiB5MT0iNi42NjY3IiB4Mj0iMzIiIHkyPSI1Ny44NzI0IiBzcHJlYWRNZXRob2Q9InJlZmxlY3QiPgk8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMxQTZERkYiPjwvc3RvcD4JPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojQzgyMkZGIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzFfXzQzNjI1KTsiIGQ9Ik00NCw1N0gyMGMtNy4xNjgsMC0xMy01LjgzMi0xMy0xM1YyMGMwLTcuMTY4LDUuODMyLTEzLDEzLTEzaDI0YzcuMTY4LDAsMTMsNS44MzIsMTMsMTN2MjQgIEM1Nyw1MS4xNjgsNTEuMTY4LDU3LDQ0LDU3eiBNMjAsOUMxMy45MzUsOSw5LDEzLjkzNSw5LDIwdjI0YzAsNi4wNjUsNC45MzUsMTEsMTEsMTFoMjRjNi4wNjUsMCwxMS00LjkzNSwxMS0xMVYyMCAgYzAtNi4wNjUtNC45MzUtMTEtMTEtMTFIMjB6Ij48L3BhdGg+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yX180MzYyNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIzMiIgeTE9IjE4LjE2NjciIHgyPSIzMiIgeTI9IjQ1LjY3OTMiIHNwcmVhZE1ldGhvZD0icmVmbGVjdCI+CTxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzZEQzdGRiI+PC9zdG9wPgk8c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNFNkFCRkYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjU1ZHSURfMl9fNDM2MjUpOyIgZD0iTTMyLDQ1Yy03LjE2OCwwLTEzLTUuODMyLTEzLTEzYzAtNy4xNjgsNS44MzItMTMsMTMtMTNjNy4xNjgsMCwxMyw1LjgzMiwxMywxMyAgQzQ1LDM5LjE2OCwzOS4xNjgsNDUsMzIsNDV6IE0zMiwyM2MtNC45NjIsMC05LDQuMDM4LTksOWMwLDQuOTYzLDQuMDM4LDksOSw5YzQuOTYzLDAsOS00LjAzNyw5LTlDNDEsMjcuMDM4LDM2Ljk2MywyMywzMiwyM3oiPjwvcGF0aD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzNfXzQzNjI1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjQ2IiB5MT0iMTIuNzUiIHgyPSI0NiIgeTI9IjIzLjA0ODciIHNwcmVhZE1ldGhvZD0icmVmbGVjdCI+CTxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzZEQzdGRiI+PC9zdG9wPgk8c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNFNkFCRkYiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxjaXJjbGUgc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF8zX180MzYyNSk7IiBjeD0iNDYiIGN5PSIxOCIgcj0iMyI+PC9jaXJjbGU+PC9zdmc+"

              height="32px"
              width="32px"
            />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </p>
    </div>
  )
}

export default Bio
