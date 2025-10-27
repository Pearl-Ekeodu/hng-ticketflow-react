import React, { forwardRef } from 'react';
import './Textarea.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className={`textarea-wrapper ${className}`}>
        {label && (
          <label htmlFor={props.id} className="textarea-label">
            {label}
            {props.required && <span className="textarea-required">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`textarea ${error ? 'textarea-error' : ''}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {error && (
          <p className="textarea-error-text" id={`${props.id}-error`} role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="textarea-helper-text">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

