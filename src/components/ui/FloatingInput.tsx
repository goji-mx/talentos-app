import React from 'react';

interface FloatingInputProps {
    id: string;
    label: string;
    name: string;
    type?: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    error?: string | null;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
    id,
    label,
    name,
    type = 'text',
    value,
    onChange,
    onKeyPress,
    error,
}) => {
    const hasError = !!error;

    return (
        <div className="relative w-full mb-8">
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                placeholder=" "
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer ${hasError ? 'border-red-500 focus:border-red-500' : 'border-white focus:border-white'}`}
            />
            <label
                htmlFor={id}
                className={`absolute text-sm duration-300 transform -translate-y-3 scale-90 -top-3 left-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/4 peer-focus:top-[-0.75rem] peer-focus:scale-90 peer-focus:-translate-y-3 ${hasError ? 'text-red-400' : 'text-white'}`}
            >
                {label}
            </label>
            {hasError && <p className="text-red-400 text-xs mt-2 px-1">{error}</p>}
        </div>
    );
};

export default FloatingInput;
