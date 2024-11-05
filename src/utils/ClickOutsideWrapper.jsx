import React, { useEffect, useRef } from 'react'

export const ClickOutsideWrapper = ({ children, onClickOutside }) => {

    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                onClickOutside();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [onClickOutside])


    return <div ref={wrapperRef}>{children}</div>
}

export default ClickOutsideWrapper;