import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/dist/server/web/spec-extension/response"
import prisma from "@/app/libs/prismadb"

export async function POST(request: Request){
    try{
        const currentuser = await getCurrentUser();
        const body = await request.json();
        const {
            message,
            image,
            conversationId
        }=body

        if(!currentuser?.id || !currentuser?.email){
            return  new NextResponse('Unauthorized', {status:401})
        }
        const newMessage = await prisma.message.create({
            data:{
                body:message,
                image:image,
                conversation:{
                    connect:{
                        id:conversationId
                    }
                },
                sender:{
                    connect:{
                        id:currentuser.id
                    }
                },
                seen:{
                    connect:{
                        id:currentuser.id
                    }
                }
            },
            include:{
                seen:true,
                sender: true
            }
        })

        const updateConversation = await prisma.conversation.update({
            where:{
                id:conversationId
            },
            data:{
                lastMessageAt: new Date(),
                messages:{
                    connect:{
                        id: newMessage.id
                    }
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        seen:true
                    }
                }
            }
        })
        return NextResponse.json(newMessage)

    }catch(error:any){
        console.log(error, 'ERROR MESSAGE')
        return new NextResponse('InternalError',{status:500})
    }
}