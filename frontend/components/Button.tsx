import React, { ButtonHTMLAttributes } from 'react'

interface Props {
    type?: 'primary' | 'secondary'
    inputType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    disabled?: boolean
    label: string
    onClick?: () => void
}

const commonStyling =
    'px-4 py-2 text-lg hover:opacity-75 transition-opacity cursor-pointer disabled:cursor-default disabled:opacity-25 rounded-md'

const Button = ({
    type = 'primary',
    inputType = 'button',
    disabled = false,
    label,
    onClick = () => {}
}: Props) => {
    switch (type) {
        case 'primary':
            return (
                <button
                    type={inputType}
                    onClick={onClick}
                    className={`${commonStyling} bg-accent font-semibold`}
                    disabled={disabled}
                >
                    {label}
                </button>
            )
        case 'secondary':
            return (
                <button
                    type={inputType}
                    onClick={onClick}
                    className={`${commonStyling} bg-secondaryAccent`}
                    disabled={disabled}
                >
                    {label}
                </button>
            )
    }
}

export default Button
