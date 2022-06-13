import { useEffect, RefObject } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideDetection(
    ref: RefObject<HTMLElement>,
    callback: () => void
) {
    function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback()
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener('click', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('click', handleClickOutside)
        }
    }, [ref])
}
