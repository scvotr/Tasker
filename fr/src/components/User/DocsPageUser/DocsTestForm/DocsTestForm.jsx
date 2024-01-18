import { useState } from 'react';
import './DocsTestForm.css'
import { useAuthContext } from '../../../../context/AuthProvider';
import { sendDataToEndpoint } from '../../../../utils/sendDataToEndpoint.js'

export const DocsTestForm = () => {
  const currentUser = useAuthContext()

  const initVal = {
    name: '',
    age: '',
  }

  const [formData, setFormData] = useState(initVal)
  const [reqStatus, setReqStatus] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault();
    sendDataToEndpoint(currentUser.token, formData, '/docs/test', 'POST', setReqStatus)
    setFormData(initVal)
  }

  const handleGetData = (e) => {
    const {name, value} = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name] : value,
    }))
  }

  return(
    <>
      <form onSubmit={handleSubmit}> 
        <label>
          Имя:
          <input
            name='name'
            type='text'
            value={formData.name}
            onChange={handleGetData}
          />
        </label>
        <label>
          Возраст:
          <input
            name='age'
            type='number'
            value={formData.age}
            onChange={handleGetData}
            style={{ width: '50px' }}
          />
        </label>
        <button type="submit">
          Отправить
        </button>
      </form>
    </>
  )
}
