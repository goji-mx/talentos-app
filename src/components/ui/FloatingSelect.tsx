import React from 'react';
import clsx from 'clsx';

interface Option {
  label: string;
  value: string;
}

interface FloatingSelectProps {
  id: string;
  label: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  hasError?: boolean;
  error?: string;
  disabled?: boolean;
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  hasError = false,
  error,
  disabled = false,
}) => {
  return (
    <div className="relative w-full mb-8">
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          'block appearance-none w-full px-2.5 pb-2.5 pt-4 bg-white/10 text-white text-sm rounded-lg border',
          'focus:outline-none focus:ring-0 peer',
          {
            'border-red-400 focus:border-red-400': hasError,
            'border-white focus:border-white': !hasError,
            'cursor-not-allowed opacity-60': disabled,
          }
        )}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-black">
            {opt.label}
          </option>
        ))}
      </select>

      {hasError && <p className="text-red-400 text-xs mt-2 px-1">{error}</p>}
    </div>
  );
};

export default FloatingSelect;
