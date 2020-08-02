import React from "react"

const Repo = ({url,name,description,color,stars,forks,lang}) =>{
    return(
        <div className="github-cards">
        <a href={url} className="github-card">
    <h3>{name}</h3>
    <p>{description}</p>
    <span className="github-card__meta">
      <span className="github-card__language-icon" style={{color:`${color}`}}>●</span> {lang}
    </span>
    <span className="github-card__meta">
    <b>{stars}⭐️</b>
    </span>
    <span className="github-card__meta">
    <b>{forks}🍴 </b>
    </span>
  </a>
  </div>
    )
}
export default Repo