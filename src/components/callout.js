import React from "react"

const Callout = ({ emoji, children }) => {
    return (
        <div className="callout">
            <div>{emoji}</div>
            <div id="callout-inner">
                {children}
            </div>
        </div>
    )
}

export default Callout