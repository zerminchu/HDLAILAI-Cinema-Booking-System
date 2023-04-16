import React from 'react';
import { LoginFields } from './LoginFields';
import "./LoginCss.css";
import LoginModal from './LoginModal';
import logo from './logo-no-background.png';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <div>
      <div>
        <img src={logo} alt="My Image" />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <LoginFields />
        </div>
        <div>
          <button className="SubmitBtn" type="submit">Submit</button>
        </div>
      </form>
    </div>
    
  );
}

export default LoginPage;