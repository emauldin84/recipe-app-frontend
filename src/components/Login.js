import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'



class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleInputChange = (e) => {
        let fieldId = e.target.id

        this.setState({
            [fieldId]: e.target.value
        })
    }

    handleInputSubmit = (e) => {
        e.preventDefault()
        let formData = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log('formData',formData)

        axios.post('/users/login', formData)
        .then(res => {
            console.log('DATA', res)
            console.log('The user was successfully logged in')
            if(res.data.id){
                this.props.history.push('/')
            }
        })
        .catch(err => err)

    }

    render() {

        return(
            <div>
                <h2 className='loginregisterTitle'>Log in</h2>
                <p className='or'>or</p>
                <NavLink to='/register' className='switchRegisterLogin'>Register</NavLink>
                <form className='form' action='/users/login' encType="multipart/form-data" method="post" onSubmit={this.handleInputSubmit}>
                    <label className='emailLabel Label'>Email</label>
                    <input id='email' type="email" value={this.state.email} placeholder='enter email' className='Input imageUrlInput' onChange={this.handleInputChange} required/>
                    
                    <label className='firstNameLabel Label'>Password</label>
                    <input id='password' type="password" value={this.state.password} placeholder='enter password' className='Input imageUrlInput' onChange={this.handleInputChange} required/>
                    
                    <button type='submit' className='submitButton'>Log in</button>
                </form>

            </div>
        )
    }
}

export default Login