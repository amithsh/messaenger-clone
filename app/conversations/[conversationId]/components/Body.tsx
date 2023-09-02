'use client'

import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/types'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'

interface Bodyprops{
  initialMessages: FullMessageType[]
}

const Body:React.FC<Bodyprops> = ({
  initialMessages
}) => {

  const [messages, setmessages] = useState(initialMessages)
  console.log(messages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const {conversationId} = useConversation();

  useEffect(()=>{
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId])
  return (
    <div className='flex-1 overflow-y-auto'>
       {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
        <div ref = {bottomRef} className='pt-24'>


        </div>
    </div>
  )
}

export default Body