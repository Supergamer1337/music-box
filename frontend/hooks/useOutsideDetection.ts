import { useEffect, createRef } from 'react'
import { dialogWrapperId } from './../components/Dialog'

/**
 * Hook that alerts clicks outside of the passed ref
 *
 * @param callback The callback to execute when the user clicks outside of the ref
 * @returns The ref to pass to the component
 */
export default function useOutsideDetection<T extends HTMLElement>(
    callback: () => void
) {
    const ref = createRef<T>()

    function handleClickOutside(event: any) {
        if (
            ref.current &&
            !ref.current.contains(event.target) &&
            !document.getElementById(dialogWrapperId)?.contains(event.target)
        ) {
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

    return ref
}
