'use client'

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'

interface DesktopItemProps{
  label:string;
  icon:any;
  href:string;
  onclick?: ()=> void;
  active?: boolean;
}

const DesktopItem:React.FC<DesktopItemProps> = ({
  label,
  icon:Icon,
  href,
  onclick,
  active

}) => {

  const handleClick = ()=>{
    if(onclick){
      return onclick()
    }
  }
  return (
    <li onClick={handleClick}>
      <Link href={href} className={clsx(`
        group
        flex
        gap-3
        rounded-md
        p-3
        text-sm
        leading-6
        font-medium
        text-gray-500
        hover:text-black
        hover:bg-white
      `,
      active && 'bg-white text-black'
      )}>
        <Icon className="h-6 w-6 shrink-0"/>
        <span className='sr-only'>
          {label}
        </span>
      </Link>

    </li>
  )
}

export default DesktopItem 