import React from 'react';

import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';

const AuthPage = () => {
  return (
    <div>
      <Auth/>
      <ErrorMessage/>
    </div>
  );
};

export default AuthPage;