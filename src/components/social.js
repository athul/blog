import React from "react"
import SocialLogo from "social-logo"

import { rhythm } from "../utils/typography"

const Socials=()=>{
return(
	<div style={{
		display:`flex`,
		marginBottom:rythm(2.5),
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
