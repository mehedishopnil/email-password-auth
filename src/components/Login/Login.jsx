import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const emailRef = useRef();


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
                setSuccess('successfully log in');
                setError('');
                if(!user.emailVerified){
                    setError('Email address is not verified')
                    return;
                }
                else{
                    setSuccess('verified Email')
                    return;
                }
                
            })
            .catch(error => {
                console.log(error);
                setError(error);
            })
    }

        const handleResetPassword = event =>{
            const email = emailRef.current.value;
            if(!email){
                alert('Please provide your email address to reset password')
            }
            sendPasswordResetEmail(auth, email)
            .then(() =>{    
                alert('Please check your email')
            })
            .catch(error =>{
                console.log(error);
                setError(error.message)
            })
        }
    return (
        <div className='mt-5'>
            <h3>Please Login</h3>
            <form onSubmit={handleLogIn}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" ref={emailRef} name='email' className="form-control" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password' className="form-control" id="password" />
                    <p className='text-danger'>{error}</p>
                </div>

                <p>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset password</button></p>

                <button type="submit" className="btn btn-primary">Submit</button>
                <p className='text-success'>{success}</p>
            </form>
            <p>New to this website? Please <Link to ='/register'>Register</Link></p>
        </div>
    );
};

export default Login;