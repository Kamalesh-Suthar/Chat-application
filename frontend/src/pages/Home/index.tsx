// import userStore from "@/stores/userStore.tsx";
// import {Button} from "@/components/ui/button.tsx";
// import {useNavigate} from "react-router-dom";
import SidebarMenu from "@/components/navigation/Sidebar";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";

const Home = () => {
    // const {user, signOut} = userStore()
    // const navigate = useNavigate();
    return (
        <SidebarProvider>
            <SidebarMenu>
                Hello, Kamalesh
            </SidebarMenu>
        </SidebarProvider>
    );
};

export default Home;