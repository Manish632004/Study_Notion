import React from 'react';



const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline="false",
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}
    type={type}>
        {
            children ? (
           <>
            <span>
                {text}
            </span> 
            {children}
           </>
            ):(text)
        }
    </button>
  )
}

export default IconBtn
