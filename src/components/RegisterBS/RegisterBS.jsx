import React from 'react';

const RegisterBS = () => {
const handleSubmitInfo = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
}

    return (
        <div className='m-5'>
            <div><h2>Please Register</h2></div>
            <div className=''>
                <form onSubmit={handleSubmitInfo}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input className='w-50'  type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>

                    <div className="mb-3">
                        <label  for="exampleInputPassword1" className="form-label">Password</label>
                        <input className='w-50' type="password" name='password' className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> 
            </div>
        </div>
    );
};

export default RegisterBS;