import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

interface Props
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    variant?: 'primary' | 'secondary'
    label: string
}

const commonStyling =
    'px-4 py-2 text-lg hover:opacity-75 transition-opacity cursor-pointer disabled:cursor-default disabled:opacity-25 rounded-md'

const Button = ({ variant = 'primary', label, ...restProps }: Props) => {
    return (
        <button
            className={`${commonStyling} ${
                variant === 'primary' ? 'bg-accent font-semibold' : ''
            } ${variant === 'secondary' ? 'bg-secondaryAccent' : ''}`}
            {...restProps}
        >
            {label}
        </button>
    )
}

export default Button
