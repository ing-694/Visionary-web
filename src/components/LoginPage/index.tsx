import { useState } from 'react';
import { Tabs, Tab, Input, Button } from '@nextui-org/react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (isLogin) {
      // handle login logic
    } else {
      // handle register logic
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100">
      <div className="p-6 w-96 bg-white rounded-xl shadow-md flex flex-col justify-start items-center" style={{ marginTop: '20vh' }}>
        <h1 className="text-3xl font-bold mb-4">AI Chat Mirror Site</h1>
        <Tabs
          selectedKey={isLogin ? 'login' : 'register'}
          onSelectionChange={(key) => setIsLogin(key === 'login')}
          className="mb-4"
        >
          <Tab key="login" title="Login" className='w-full'>
            <Input 
              className="mb-2" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
            />
            <Input 
              className="mb-4" 
              value={password} 
              type='password'
              onChange={(e) => setPassword(e.target.value)} 
              label="Password"
            />
            <Button onClick={handleSubmit} className='w-full' color="primary">Login</Button>
          </Tab>
          <Tab key="register" title="Register" className='w-full'>
            <Input 
              className="mb-2" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
            />
            <Input 
              className="mb-2" 
              value={password} 
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
            <Input 
              className="mb-4" 
              value={confirmPassword} 
              type='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
            />
            <Button onClick={handleSubmit} className='w-full' color="primary">Register</Button>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
