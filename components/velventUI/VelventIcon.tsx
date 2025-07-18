import Image from 'next/image'
import React from 'react'

const VelventIcon = ({height, width}: {height: any, width: any}) => {
    return (
        <>
            <Image
                src="/logo_text.png"
                alt='velvent logo'
                width={width}
                height={height}
            />
        </>
    )
}

export default VelventIcon
