import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../Firebase/firebase.config';

const auth = getAuth(app)


const NewRegister = () => {
   const [error, setError] = useState(''); 
   const [success , setSuccess] = useState('');

    const handleForm = (event)=>{
        
        event.preventDefault();
        setSuccess('');
        setError('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one uppercase')
            return;
        }

        else if(!/(?=.*[0-9])/.test(password)){
            setError('Please add at least one number')
            return;
        }

        else if (password.length < 6) {
            setError('Please add more than 6 digit')
            return;
        }


    createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user =result.user;
            console.log(user);
            event.target.reset();
            setError('');
            setSuccess('Successfully submitted')
            
        })
        .catch(error =>{
            console.log(error);
            setError(error.message);
        })
        
    }

    return (
        <div> 
            <h2>New Register</h2>
            <form onSubmit={handleForm}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' className="form-control" id="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password' className="form-control" id="password" required  />
                    <p className='text-danger'>{error}</p>
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className='text-success'>{success}</p>
            </form>
            
        </div>
    );
};

export default NewRegister;