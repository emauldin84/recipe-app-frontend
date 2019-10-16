import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'


class Register extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        failedRegistrationMessage: null,
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
            first: this.state.firstName,
            last: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        }
        console.log('formData',formData)

        axios.post('/users/add-new-user', formData)
        .then(async res => {
            console.log('from register', res.data)
            if (res.data.id) {
                await this.props.checkForSession()
                console.log('The user was successfully registered')
                this.props.history.push('/')
            } else {
                this.setState({
                    failedRegistrationMessage: <p className='unsuccessful'>Email address is taken. Please try again.</p>
                })
            }
            

        })
        .catch(err => err)

    }

    render() {

        return(
            <div>
                <h2 className='loginregisterTitle'>Register</h2>
                <p className='or'>or</p>
                <NavLink to='/login' className='switchRegisterLogin'>Log in</NavLink>
                <form className='form' action='/users/add-new-user' encType="multipart/form-data" method="post" onSubmit={this.handleInputSubmit}>
                    <label className='login-register-label Label'>First Name</label>
                    <input id='firstName' value={this.state.firstName} placeholder='ex. John' className='Input imageUrlInput' onChange={this.handleInputChange} required/>
                    
                    <label className='login-register-label Label'>Last Name</label>
                    <input id='lastName' value={this.state.lastName} placeholder='ex. Appleseed' className='Input imageUrlInput' onChange={this.handleInputChange} required/>
                    
                    <label className='login-register-label Label'>Email</label>
                    <input id='email' type="email" value={this.state.email} placeholder='ex. example@email.com' className='Input imageUrlInput' onChange={this.handleInputChange} required/>
                    
                    <label className='login-register-label Label'>Password</label>
                    <input id='password' type="password" value={this.state.password} placeholder='be as complex as possible' className='Input imageUrlInput' onChange={this.handleInputChange} required/>
                    
                    <button type='submit' className='submitButton'>Register</button>
                    {this.state.failedRegistrationMessage}
                </form>
            </div>
        )
    }
}

export default Register