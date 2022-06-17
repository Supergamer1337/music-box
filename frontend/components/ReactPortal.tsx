import { createPortal } from 'react-dom'

interface Props {
    children: React.ReactNode
    wrapperId: string
}

const ReactPortal = ({ children, wrapperId }: Props) => {
    let element = document.getElementById(wrapperId)

    if (!element) {
        element = createWrapper(wrapperId)
    }

    // @ts-ignore Taken care of by the above if statement
    return createPortal(children, document.getElementById(wrapperId))
}

/**
 * Creates a wrapper element for the portal.
 *
 * @param wrapperId The id of the wrapper element.
 * @returns The wrapper element.
 */
const createWrapper = (wrapperId: string) => {
    const wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('id', wrapperId)
    document.body.appendChild(wrapperElement)
    return wrapperElement
}

export default ReactPortal
