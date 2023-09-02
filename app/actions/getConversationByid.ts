import prisma from "@/app/libs/prismadb"

import getCurrentUser from "./getCurrentUser"


const getconversationidById = async (
    conversationId: string
)=>{
    try{
        const currentUser = await getCurrentUser();

        if(!currentUser?.email){
            return null
        }

        const conversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true
            }

        })
        return conversation

    }catch(error:any){
        console.log(error,'SERVER ERROR')
        return null
    }
}

export default getconversationidById;