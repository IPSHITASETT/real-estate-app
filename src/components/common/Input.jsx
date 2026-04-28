import React from 'react';
import './Input.css';

const Input = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  icon,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-wrapper ${icon ? 'has-icon' : ''} ${className}`}>
      {icon && (
        <span className="input-icon">
          {icon === 'location' && (
            <svg xmlns="[w3.org](http://www.w3.org/2000/svg)" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          )}
        </span>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="input-field"
        {...props}
      />
    </div>
  );
};

export default Input;
