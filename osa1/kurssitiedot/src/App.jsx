// renderöidään kurssin nimi
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

// palautetaan nimi ja tehtävämäärä
const Part = (props) => {
  return (
    <p>{props.part} {props.excercises}</p>
  )
}

// renderöidään kurssin osat ja tehtävämäärät
const Content = (props) => {
  return (
    <div>
      <Part excercises={props.parts[0].excercises} part={props.parts[0].name} />
      <Part excercises={props.parts[1].excercises} part={props.parts[1].name} />
      <Part excercises={props.parts[2].excercises} part={props.parts[2].name} />
    </div>
  )
}

// renderöidään tehtävien yhteismäärä
const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].excercises + props.parts[1].excercises + props.parts[2].excercises}</p>
  )
}

// const-määrittelyt
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        excercises: 10
      },
      {
        name: 'Using props to pass data',
        excercises: 7
      },
      {
        name: 'State of a component',
        excercises: 14
      }
    ]
  }

  // välitetään tiedot komponenteille propseina
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App