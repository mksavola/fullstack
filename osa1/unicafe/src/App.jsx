import { useState } from 'react'

// määritellään button
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

// palautetaan teksti ja arvo taulukkona
const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
    )
}

// lasketaan ja palautetaan muuttujat taulukkona
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) {
    return (
    <div>No feedback given</div>
    )
  }
  else {
    const average = (good * 1 + bad * -1) / all
    const positive = (good / all) * 100 + ' %'
  
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good}/>
        <StatisticsLine text="neutral" value={neutral}/>
        <StatisticsLine text="bad" value={bad}/>
        <StatisticsLine text="all" value={all}/>
        <StatisticsLine text="average" value={average}/>
        <StatisticsLine text="positive" value={positive}/>
      </tbody>
    </table>
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