import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'



class Login extends Component {
    state = {
        email: '',
        password: '',
        failedLoginMessage: null,
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
        // console.log('formData',formData)

        axios.post('/users/login', formData, /*{
            auth: {
                email: this.state.email,
                password: this.state.password
            }
            
        }*/)
        .then(async res => {
            // console.log('DATA', res.data)
            if(res.data.verified){
                await this.props.checkForSession()
                this.props.history.push('/')
            } else {
                this.setState({
                    failedLoginMessage: <p className='unsuccessful'>Email and/or password is incorrect.</p>
                })
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
                <form className='form loginRegisterForm' action='/users/login' encType="multipart/form-data" method="post" onSubmit={this.handleInputSubmit}>
                    <label className='login-register-label Label'>Email</label>
                    <input id='email' type="email" value={this.state.email} placeholder='enter email' className='Input imageUrlInput' onChange={this.handleInputChange} required/>
                    
                    <label className='login-register-label Label'>Password</label>
                    <input id='password' type="password" value={this.state.password} placeholder='enter password' className='Input imageUrlInput' onChange={this.handleInputChange} required/>
                    
                    <button type='submit' className='submitButton'>Log in</button>
                    {this.state.failedLoginMessage}
                </form>
            </div>
        )
    }
}

export default Login