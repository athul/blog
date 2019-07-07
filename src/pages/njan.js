import React from "react"
import { rhythm } from "../utils/typography"
import {Link} from "gatsby"
import SocialLogo from 'social-logos'
import { Card } from "rebass"
class Njan extends React.Component {
  render() {
    const name = "Athul Cyriac Ajay"
    return (
      <body style={{background:`crimson`}}>
        <h1
          style={{
            alignContent: ``,
            marginWidth: rhythm(1.5),
            marginBottom: rhythm(1 / 2),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          I am {name}
        </h1>{" "}
        <span>
          <Card
            fontSize={4}
            p={2}
            my={3}
            bg="darkslategray"
            borderRadius={13}
            //backgroundSize={12}
            width={[1, 1,1/4]}
          >
            <p style={{
                color:`aqua`
            }}>You can find me on <Link style ={{boxShadow: `none`,
              textDecoration: `none`,
              color: `red`}} to="https://github.com/Athul-CA">GitHub</Link></p>
          </Card>
          <Card fontSize={4} p={2} my={3} bg="hotpink" borderRadius={8} width={[1, 1,1/4]} >
            I'm a GitHub Campus Expert 
          </Card>
        </span>
      </body>
    )
  }
}
export default Njan
