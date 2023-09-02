import getuser from "../actions/getusers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default   async function UserLayout({
    children
}:{children : React.ReactNode}){

    const users = await getuser();
    return (
        <Sidebar>
        <div  className="h-full">
            <UserList items={users} />
            {children}</div>
        </Sidebar>
    )
}