'use client'

import React from 'react'
import { IconType } from 'react-icons'

interface AuthsocialbuttonProps {
    onclick: ()=>void
    icon: IconType
    disabled? : boolean
}

const AuthSocialButton:React.FC<AuthsocialbuttonProps> = ({
    onclick,
    icon: Icon,
    disabled
    
}) => {
  return (
    <button type='button'  onClick={onclick} className='inline-flex w-full justify-center ring-1 ring-inset bg-white px-4 py-2 hover:bg-gray-500 shadow-md focus:outline-0'>
            <Icon /> 
    </button>
  )
}

export default AuthSocialButton