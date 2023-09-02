'use client'

import React from 'react'
import useRoutes from '@/app/hooks/useRoutes'
import useConversation from '@/app/hooks/useConversation';
import MobileItem from './MobileItem';

const MobileFooter = () => {

    const routes  = useRoutes();
   


  return (
    <div
    className='
        fixed
        justify-between
        w-full
        bottom-auto
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
        
    '
    >
        {routes.map((item)=>(
            <MobileItem
                key={item.label}
                href={item.href}
                active={item.active}
                onclick={item.icon}
                icon={item.icon}
            />
        ))}
    </div>
  )
}

export default MobileFooter