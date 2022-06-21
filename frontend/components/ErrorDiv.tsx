import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    size: 'small' | 'large'
}

const ErrorDiv = ({ children, size }: Props) => {
    return (
        <p
            className={`p-2 text-center bg-red-700 rounded-md  text-lg mx-4 ${
                size === 'large' && 'mt-5 text-lg mx-4 p-2'
            } `}
        >
            {children}
        </p>
    )
}

export default ErrorDiv
