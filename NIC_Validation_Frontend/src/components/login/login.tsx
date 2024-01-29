import { useNavigate } from "react-router-dom";
import './login.css'


export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="form-wrapper">
        <h2>Sign In</h2>
        <form action="#">
            <div className="form-control">
                <input type="text" required/>
                <label>Email or phone number</label>
            </div>
            <div className="form-control">
                <input type="password" required/>
                <label>Password</label>
            </div>
            <button type="submit" onClick={()=>{
                navigate('/dashboard');
            }}>Sign In</button>
            <div className="form-help"> 
                <div className="remember-me">
                    <input type="checkbox" id="remember-me"/>
                    <label >Remember me</label>
                </div>
            </div>
        </form>
        
    </div>
    );
}
