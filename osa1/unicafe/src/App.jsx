import { useState } from 'react'

// määritellään button
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

// palautetaan teksti ja arvo
const StatisticsLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

// lasketaan ja palautetaan muuttujat
const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  if (all === 0) {
    return (
    <div>No feedback given</div>
    )
  }
  else {
    const average = (props.good * 1 + props.bad * -1) / all
    const positive = (props.good / all) * 100 + ' %'
  
  return (
    <div>
      <StatisticsLine text="good" value={props.good}/>
      <StatisticsLine text="neutral" value={props.neutral}/>
      <StatisticsLine text="bad" value={props.bad}/>
      <StatisticsLine text="all" value={all}/>
      <StatisticsLine text="average" value={average}/>
      <StatisticsLine text="positive" value={positive}/>
    </div>
  )
 }
}

// asetetaan muuttujat
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // päivitetään good
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  
  // päivitetään neutral
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  
  // päivitetään bad
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  // palautetaan painallukset ja laskujen arvot
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick}text="neutral"/>
      <Button onClick={handleBadClick}text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App