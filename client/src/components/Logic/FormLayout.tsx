import React from 'react';
import { Navigate } from 'react-router-dom';

const FormLayout: React.FC<any> = ({ children, title }) => {
  if (JSON.parse(localStorage.getItem('login') || '{}').userLogin) return <Navigate to="/users" />;

  return (
    <div className="flex h-screen items-center justify-center bg-sky-500">
      <div className="py-4 px-8 rounded flex flex-col items-center w-2/5 bg-white gap-3">
        <h2 className="text-3xl font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
