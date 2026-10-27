// muotoillaan kurssi
const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts}/>
    </div>
  )
}

// renderöidään kurssin nimi
const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

// palautetaan nimi ja tehtävämäärä
const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

// renderöidään kurssin osat ja tehtävämäärät
const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} exercises={part.exercises} part={part.name} />)}
    </div>
  )
}

// renderöidään tehtävien yhteismäärä
const Total = (props) => {
  let sum = 0
  props.parts.forEach(part => {sum += part.exercises})
  return (
    <p><strong>total of {sum} exercises</strong></p>
  )
}

export default Course