import React from 'react'

interface Props {}

const MobileSearchComponent = ({}: Props) => {
    return (
        <main>
            <input
                type="text"
                className="block mx-auto bg-emptyBg my-4 p-2 rounded-md text-lg w-10/12 outline-none outline-0 focus:outline-2 outline-accent"
                placeholder="Search Youtube... (or paste url)"
            />
        </main>
    )
}

export default MobileSearchComponent
