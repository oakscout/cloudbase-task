import React, {useState, useEffect} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Dropdown} from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import {validation} from './validation';

const getData=()=>{                                             //retrieves data from local storage
  const data = localStorage.getItem('formValues');
  if(data){
    return JSON.parse(data);
  } else return '';
}


function App() {
  const[formValues, setFormValues] = useState(getData);
  const[formErrors, setFormErrors] = useState('');
  const[isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validation(formValues));
    setIsSubmit(true);
  }


  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {                   //if there are no errors and the data was submitted,
      console.log('Data is valid and submitted!');                            // save to local storage
      localStorage.setItem('formValues', JSON.stringify(formValues))
    }
  }, [formErrors]);
  
    return (
      <>
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input 
            type="text" 
            name="firstName" 
            placeholder='Jane' 
            value={formValues.firstName || ''}
            onChange={handleChange}
          />
        </label>
        <p style={{ color: 'red' }}>{ formErrors.firstName }</p>
        <label>
          Last name:
          <input 
            type="text" 
            name="lastName" 
            placeholder='Doe' 
            value={formValues.lastName || ''}
            onChange={handleChange}
          />
        </label>
        <p style={{ color: 'red' }}>{ formErrors.lastName }</p>
        <label>
          Email
          <input 
            type="text" 
            name="email" 
            placeholder='jane.doe@gmail.com' 
            value={formValues.email || ''}
            onChange={handleChange}
          />
        </label>
        <p style={{ color: 'red' }}>{ formErrors.email }</p>
        <label>
          Countries
          <Dropdown
            placeholder="Select a country"
            options={['Japan', 'China', 'South Korea']}
            onChange={(value) => console.log( value)}
          />
        </label>
        <input type="submit" value="Submit" className="submitButton"/>
      </form>
      </>
    )

  }
export default App;
