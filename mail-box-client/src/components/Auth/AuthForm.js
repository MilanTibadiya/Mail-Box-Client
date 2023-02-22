import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authAction } from "../../store/AuthSlicer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [loading , setLoading] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value;
    var enteredPassword = passwordInputRef.current.value;

    var enteredConfirmPassword;
    if(isLogin){
    } 
    else {    
      enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if(enteredPassword !== enteredConfirmPassword){
        return toast('passwords does not match');
      };  
    }   
    localStorage.setItem("userEmail", enteredEmail);
    
 setLoading(true);
 let url;
    if (isLogin) {
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCq0D46LMMQdd83yquIDm-07jK4smD1MD4'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCq0D46LMMQdd83yquIDm-07jK4smD1MD4'
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken : true
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
         setLoading(false);

      if (res.ok) { 
        return res.json();
      } else {
        res.json().then(data => {   // Json also return promises mi,
          let errorMessage = 'Authentication failed'
          if(data && data.error && data.error.message) {
          errorMessage = data.error.message
          }
        return toast(errorMessage);   // throw new Error(errorMessage);
        })
      }
    })
    .then((data) => {  
      if(data){
      navigate('/') ;
      // localStorage.setItem("idToken" , data.idToken);
      dispatch(authAction.login(data.idToken)) //not payload current
      toast('sucsess');
      }                       
    })
    .catch((err) => {
      return toast(err.message)
    })
  }

  return (
    <>
      <div>
        <h1 className="d-flex justify-content-center display-3 border-bottom p-2 border-1 border-dark">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form className="form m-auto my-5 w-25 p-3 shadow-lg rounded-3">
          <div className=" form-floating mb-3">
            <input
              ref={emailInputRef}
              type="email"
              className="form-control"
              placeholder="email"
              required
            />
            <label>Email address</label>
          </div>

          <div className=" form-floating mb-3">
            <input
              ref={passwordInputRef}
              type="password"
              className="form-control"
              placeholder="password"
              required
            />
            <label>Password</label>
          </div>

          {isLogin ? null : 
          <div className=" form-floating mb-3">
            <input
              ref={confirmPasswordInputRef}
              type="password"
              className="form-control"
              placeholder="confirmpassword"
              required
            />
            <label>Confirm Password</label>
          </div> }

          {loading && <p>Sending request...</p> }
          
          {!loading && <button onClick={submitHandler}
            type="submit"
            className=" btn btn-secondary"
          >{isLogin ? "Login" : "Create Account"}</button>}

          <button onClick={()=> (setIsLogin(!isLogin))}
            id="btn"
            className=" m-3 text-primary border-0 d-block"
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthForm;
