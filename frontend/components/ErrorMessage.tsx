import { motion } from 'framer-motion'

interface Props {
    message: string
}

const ErrorDiv = ({ message }: Props) => {
    return (
        <motion.div
            transition={{ duration: 0.3, ease: 'easeOut' }}
            initial={{ x: 350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 350, opacity: 0 }}
            className="fixed right-0 p-4 m-2 overflow-hidden rounded-md shadow-md bottom-24 bg-emptyBg"
        >
            <p className="">{message}</p>

            <motion.div
                transition={{ duration: 5, bounce: 0, ease: 'linear' }}
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                className="absolute bottom-0 left-0 h-1 bg-red-600"
            />
        </motion.div>
    )
}

export default ErrorDiv
