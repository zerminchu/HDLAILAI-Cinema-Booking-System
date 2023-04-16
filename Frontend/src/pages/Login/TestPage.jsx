import React from 'react';
import LoginModal from './LoginModal';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginModal />
    </form>
  );
}

export default LoginPage;