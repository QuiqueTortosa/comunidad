import React from 'react';
import Auth from '../components/Login/Auth';
import ErrorMessage from '../components/ErrorMessage';

const AuthPage = () => {

  return (
    <div className="bg-white">
      <Auth/>
      <ErrorMessage/>
    </div>
  );
};

export default AuthPage;