import React from "react"

const Callout = ({ emoji, children }) => {
  return (
    <div className="callout" emoji={emoji}>
      <div className="callout-inner">{children}</div>
    </div>
  )
}

export default Callout
