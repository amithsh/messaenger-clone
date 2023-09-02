import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

export default function Sidebar({children}:{children:React.ReactNode}
){
    const currentuser =  getCurrentUser();
    return(
        <div className="h-full">
            <DesktopSidebar currentUser ={currentuser!} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
            {children}
             </main> 
        </div>
    )
}

