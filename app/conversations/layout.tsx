import getconversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
    children
}:{children:React.ReactNode}){
    const conversations = await getconversations()
    return(
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations }/>
                {children}
            </div>
        </Sidebar>
    )
}