import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

interface Props
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    className?: string
    size: 'normal' | 'large' | 'section'
}

const TextField = ({ className, size, ...restProps }: Props) => {
    return (
        <input
            className={`block bg-emptyBg rounded-md text-lg max-w-[40rem] outline-none outline-0 sm:bg-primaryBg focus:outline-2 outline-accent ${
                size === 'section' && 'mx-auto my-4 p-2 w-10/12 max-w-[40rem]'
            } ${className ? className : ''}`}
            {...restProps}
        />
    )
}

export default TextField
