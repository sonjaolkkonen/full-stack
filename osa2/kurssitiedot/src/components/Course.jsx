const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const TotalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <strong>total of {TotalExercises} exercices</strong>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    parts.map(part => <Part key={part.id} part={part}  />)
  )
}

export default Course