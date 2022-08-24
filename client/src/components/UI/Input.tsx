import React from 'react';

interface InputProps {
  type: string;
  span?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  classes?: string;
}

const Input: React.FC<InputProps> = ({ type, span, value, setValue, placeholder, classes }) => {
  return (
    <>
      <span className="text-lg">{span}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`border border-zinc-700 rounded p-2 text-lg w-full ${classes}`}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
