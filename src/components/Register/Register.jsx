import React, { useState } from 'react';
import './Register.css'
import { getAuth } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import { createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('')
        setError('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        // validate
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one uppercase')
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)){
            setError('Please add at least two numbers')
            return
        }
        else if (password.length < 6){
            setError('Please set the password at least 6 digit')
            return
        }

        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password) 
        .then(result => {
            const loggedUser = result.user;
            console.log((loggedUser));
            setError('');
            event.target.reset();
            setSuccess('User has been created successfully')
        })

        .catch(error => {
            console.log(error);
            setError(error.message)
            
        })
    }


    const handleEmailChange = (event) =>{
        // setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) =>{
        console.log(event.target.value);
    }
    return (
        <div>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' required />
                <br />
                <input onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your Password' required />
                <p className='text-danger'>{error}</p>
                <br />
                <input className='submit' type="submit" value="Register" />
            </form>
            <p className='text-success'>{success}</p>
            
        </div>
    );
};

export default Register;