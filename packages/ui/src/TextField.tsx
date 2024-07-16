import React, { HTMLInputTypeAttribute, useState } from 'react'
import EyeIcon from './icons/EyeIcon'
interface TextFieldInterface {
    type:string,
    placeholder:string,
    onChange: (value:string) => void,
    isPasswordVisible?: boolean,
    togglePasswordVisibility?: () => void
}

const TextField = ({type,placeholder,onChange,isPasswordVisible=false,togglePasswordVisibility}:TextFieldInterface) => {
  return (
    <div className='flex flex-col border-b border-[#BDBDBD] relative'>
        <p className='text-xs text-[#757575] font-thin'>{placeholder}</p>
        <input type={type == 'password' ? (!isPasswordVisible ? 'password':'text') : 'text'} className='focus:outline-none text-sm py-2.5' onChange={(e) => onChange(e.target.value)}></input>
        {
          type == 'password' &&
            (  
               <div className="absolute top-1/2 right-1 h-4 w-4" onClick={togglePasswordVisibility}>
                { 
                !isPasswordVisible ? 
                  <EyeIcon />:<img src={"/basic-eye-closed.svg"}/>
                }
              </div>
            )
        }
    </div>
  )
}

export default TextField