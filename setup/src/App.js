import React, { useState, useEffect } from 'react'
// importing all the icons that are going to be used
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
// external API
const url = 'https://randomuser.me/api/'
// default image that wiil be used in case there is no image url
const defaultImage =
  'https://cdn.pixabay.com/photo/2015/02/22/17/56/loading-645268_960_720.jpg'

function App() {
  // useState hooks
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')
  // fetching the data from API
  const getPerson = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]
    // possible to write all in one line, but hard to read
    const { phone, email } = person
    // renaming the value name from large to image
    const { large: image } = person.picture
    // a different way on how to get nested values
    const {
      login: { password },
    } = person
    const { first, last } = person.name
    const { age } = person.dob
    const { number, name } = person.location.street
    // destructuring newPerson
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }
    setPerson(newPerson)
    setLoading(false)
    // allways show name on initial load
    setTitle('name')
    setValue(newPerson.name)
  }
  // on initial load
  useEffect(() => {
    getPerson()
  }, [])

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
      
    }
  }

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          {/* if the person exists display its image, if not → display default image  */}
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>my {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            {/* data label providing value for the state for hovering later */}
            <button
              className='icon'
              data-label='name'
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className='icon'
              data-label='email'
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon' data-label='age' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              data-label='street'
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className='icon'
              data-label='phone'
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              data-label='password'
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          {/* every click will generate a new person */}
          <button className='btn' type='button' onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  )
}
// always export 
export default App
