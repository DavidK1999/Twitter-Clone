import React,  {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {authenticate} from '../redux/actions/auth'

const Authenticate = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const [inputs, setInputs] = useState({})
   
  
    const handleInputChange = e => {
        e.preventDefault()
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

   const handleSubmit = (e, route) => {
       console.log(inputs)
       e.preventDefault()
       dispatch(authenticate(route, inputs))
    }


    return {handleInputChange, handleSubmit}
}
 
export default Authenticate;