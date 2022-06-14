import React from 'react'

interface Props {
    type?: 'primary' | 'secondary'
    disabled?: boolean
    label: string
}

const commonStyling =
    'px-4 py-2 text-lg hover:opacity-75 transition-opacity cursor-pointer disabled:cursor-default disabled:opacity-25 rounded-md'

const Button = ({ type = 'primary', disabled = false, label }: Props) => {
    switch (type) {
        case 'primary':
            return (
                <button
                    className={`${commonStyling} bg-accent font-semibold`}
                    disabled={disabled}
                >
                    {label}
                </button>
            )
        case 'secondary':
            return (
                <button
                    className={`${commonStyling} bg-secondaryAccent`}
                    disabled={disabled}
                >
                    {label}
                </button>
            )
    }
}

export default Button
