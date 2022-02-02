import Button from "./Button";
import "./Auth.css";
import {useRef, useState} from "react"

const Auth=()=>{
    const [togglelog,setToggleLog]=useState(true);
    const mailRef=useRef();
    const passRef=useRef();
    const onclickHandler=()=>{
        setToggleLog((prevState)=>!prevState);
    }
    const submitHandler=async(event)=>{
            event.preventDefault();
            console.log(passRef.current.value)
            
            try{
                const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]",{
                    method:"POST",
                    body:JSON.stringify({
                        email:mailRef.current.value,
                        password:passRef.current.value,
                        returnSecureToken: true
                    }),
                    headers:{"Content-Type":"application/json"}
                })      
                console.log(response,"response")

            }catch(e){
                console.log(e,"ERROR");
            }                   

    }
    return(
        <div className="btn-grad">
                 <h1>{togglelog?"Login":"SignUp"}</h1>
            <div className="formdiv">
               
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input ref={mailRef} type="email" className="form-control" name="email" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input ref={passRef} type="password" className="form-control" name="password" placeholder="Password" required/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <Button type="submit" className="btn btn-primary">{togglelog?"Log-In":"SignUp"}</Button>
                <Button type="button" className="btn btn-primary" onClick={onclickHandler}>{!togglelog?"Log-In":"create"}</Button>
            </form>
            </div>
         </div>
    );
}

export default Auth;