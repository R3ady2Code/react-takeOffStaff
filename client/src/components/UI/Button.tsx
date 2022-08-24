import React from 'react';

interface ButtonPorps {
  title: string;
  onClick: (arg: any) => any;
  classes: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<ButtonPorps> = ({ title, onClick, classes, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${classes} py-2 px-8 rounded-md transition-all hover:shadow`}>
      {title}
    </button>
  );
};

export default Button;
