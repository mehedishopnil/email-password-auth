import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase/firebase.config';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();


    const handleLogIn = event => {
        event.preventDefault();
        setError('');
        setSuccess('');
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);


        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please enter one capital letter')
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('Please enter one number')
            return;
        }
        else if (password.length < 6) {
            setError('Please enter at least 6 digit')
            return;
        }


        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess('Successfully log in')
            })
            .catch(error => {
                console.log(error);
                setError(error);
            })
    }


    return (
        <div>
            <form onSubmit={handleLogIn}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' className="form-control" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password' className="form-control" id="password" />
                    <p className='text-danger'>{error}</p>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <p className='text-success'>{success}</p>
            </form>
        </div>
    );
};

export default Login;