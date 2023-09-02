import getCurrentUser from "@/app/actions/getCurrentUser"

import prisma from '@/app/libs/prismadb'
import {NextResponse} from "next/server"

interface Iparams{
    conversationId?: string
}

export async function post(
    request:Request,
    {params} : {params: Iparams}
){
    try{
        const currentuser  = await getCurrentUser()
        const {conversationId}=params

        if(!currentuser?.id || !currentuser?.email){
            return new Response('unauthorized', {status:401} )
        }

        const conversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                messages:{
                    include:{
                        seen:true
                    }
                },
                users: true
            }
        })

        if(!conversation){
            return new NextResponse('invalid Id',{status: 400})
        }

        //find the last message
        const lastmessage = conversation.messages[conversation.messages.length -1]

        if(!lastmessage){
            return NextResponse.json(conversation)
        }

        //update seen of last message
        const updatedMessage = await prisma.message.update({
            where:{
                id:lastmessage.id
            },
            include:{
                sender:true,
                seen:true
            },
            data:{
                seen:{
                    connect:{
                        id:currentuser.id
                    }
                }
            }
        })

        return NextResponse.json(updatedMessage)

    }catch(error:any){
        console.log(error)
        return{
            status: 500,
            body: {
                error: error.message
            }
        }
    }
}