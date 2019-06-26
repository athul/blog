import React from "react"
import SocialLogo from "social-logos"

import { rhythm } from "../utils/typography"

const Socials=()=>{
return(
	<div style={{
		display:`flex`,
		marginBottom:rhythm(2.5),
		color:`azure`}}>
	<span>
<a href="https://github.com/Athul-CA"><SocialLogo icon="github" size={ 48 } /></a>
	<a href="https://twitter.com/athulcajay"><SocialLogo icon="twitter" size={ 48 } /></a>
	<a href="https://github.com/Athul-CA"><SocialLogo icon="github" size={ 48 } /></a>
	</span>
</div>
)
}
export default Socials
