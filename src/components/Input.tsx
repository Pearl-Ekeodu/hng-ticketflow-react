import React, { forwardRef } from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className={`input-wrapper ${className}`}>
        {label && (
          <label htmlFor={props.id} className="input-label">
            {label}
            {props.required && <span className="input-required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`input ${error ? 'input-error' : ''}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {error && (
          <p className="input-error-text" id={`${props.id}-error`} role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="input-helper-text">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

