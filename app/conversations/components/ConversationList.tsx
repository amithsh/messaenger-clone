'use client'

import useConversation from '@/app/hooks/useConversation'
import { FullConversationType } from '@/app/types'
import { Conversation } from '@prisma/client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import {MdOutlineGroupAdd} from "react-icons/md"
import ConversationBox from './ConversationBox'

interface ConversationListProps{
    initialItems: FullConversationType[]
}
const ConversationList:React.FC<ConversationListProps> = ({
    initialItems
}) => {

  const [items,setitems] = useState(initialItems)
  const router = useRouter();

  const {conversationId,isOpen} = useConversation();
  return (
    <aside className={clsx(`
      fixed
      inset-y-0
      pb-20
      lg:pb-0
      lg:w-80
      lg:left-20
      lg:block
      overflow-y-auto
      border-r
      border-gray-200
    `,
    isOpen? 'hidden' : 'block w-full left-0'
    )}>
      <div className='px-5 '>
          <div className='flex justify-between mb-4 pt-4 items-center'>
            <div className='text-2xl font-bold text-neutral-800'>
                    messaages
            </div>
              <div className='rounded p-2 bg-gray-100 cursor-pointer hover:opacity-75 transition'>
                <MdOutlineGroupAdd />
              </div>
          </div>
          {items.map((item)=>(
              <ConversationBox
                key={item.id}
                data ={item}
                selected={conversationId== item.id}
              />
          ))}
      </div>
    </aside>
  )
}

export default ConversationList