import Image from 'next/image'
import React from 'react'

const ValventIcon = ({height, width}: {height: any, width: any}) => {
    return (
        <>
            <Image
                src="/logo_text.png"
                alt='valvent logo'
                width={width}
                height={height}
            />
        </>
    )
}

export default ValventIcon
