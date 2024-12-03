import { jsx as _jsx } from "react/jsx-runtime";
// import userStore from "@/stores/userStore.tsx";
// import {Button} from "@/components/ui/button.tsx";
// import {useNavigate} from "react-router-dom";
import SidebarMenu from "@/components/navigation/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
const Home = () => {
    // const {user, signOut} = userStore()
    // const navigate = useNavigate();
    return (_jsx(SidebarProvider, { children: _jsx(SidebarMenu, { children: "Hello, Kamalesh" }) }));
};
export default Home;
