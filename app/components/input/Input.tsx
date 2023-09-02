"use client"

import React from 'react'
import clsx from "clsx"
import {FieldError,FieldValues,UseFormRegister} from "react-hook-form"
import { error } from 'console'

interface InputProps {
  label: string
  id: string,
  type?: string,
  required? : boolean,
  register : UseFormRegister<FieldValues>,
  errors: FieldError,
  disabled?:boolean
}


const Input:React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled
}) => {


  return (
    <div>
      <label
      className='block text-sm font-medium leading-6 text-gray-900' 
      htmlFor={id}>
          {label}
          <div className='mt-2 '>
            <input 
            type={type}
            id={id}
            disabled={disabled}
            {...register(id,{required})}
            className={clsx(`
            form-input
            block
            w-full
            sm:text-sm
            sm:leading-5
            border-0
            rounded
            shadow-sm
            py-1
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading`,
            errors[id] && "focus:ring-red-600",
            disabled && "opacity-50 cursor-default "
            )}
            />
          </div>
      </label>
    </div>
  )
}

export default Input