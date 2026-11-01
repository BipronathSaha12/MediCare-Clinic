import React from 'react';

/**
 * Reusable Button Component
 * @param {Object} props
 * @param {'primary'|'secondary'|'danger'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'} [props.size='md']
 * @param {boolean} [props.disabled=false]
 * @param {Function} [props.onClick]
 * @param {string} [props.type='button']
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const variantClass = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  const combinedClassName = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClassName}
      {...rest}
    >
      {children}
    </button>
  );
}
