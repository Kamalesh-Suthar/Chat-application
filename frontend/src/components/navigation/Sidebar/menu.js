import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronUp, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar";
import { Groups, Message } from "@mui/icons-material";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.tsx";
import userStore from "@/stores/userStore.tsx";
import { useNavigate } from "react-router-dom";
// Menu items.
const items = [
    {
        title: "Chats",
        url: 'chats',
        icon: Message,
    },
    {
        title: "Groups",
        url: 'groups',
        icon: Groups,
    }
];
const Menu = () => {
    const state = userStore();
    const navigate = useNavigate();
    const handleSignOut = () => {
        state.signOut();
        navigate('/signin', {
            replace: true
        });
    };
    return (_jsxs(Sidebar, { variant: 'floating', children: [_jsx(SidebarContent, { children: _jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "Chat Application" }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: items.map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, children: _jsxs("a", { href: item.url, children: [_jsx(item.icon, {}), _jsx("span", { children: item.title })] }) }) }, item.title))) }) })] }) }), _jsx(SidebarFooter, { children: _jsx(SidebarMenu, { children: _jsx(SidebarMenuItem, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(SidebarMenuButton, { children: [_jsx(User, {}), " ", state?.user && state.user?.displayName, _jsx(ChevronUp, { className: "ml-auto" })] }) }), _jsxs(DropdownMenuContent, { side: "top", className: "w-[--radix-popper-anchor-width]", children: [_jsx(DropdownMenuItem, { children: _jsx("span", { children: "Account" }) }), _jsx(DropdownMenuItem, { children: _jsx("span", { children: "Billing" }) }), _jsx(DropdownMenuItem, { onClick: handleSignOut, children: _jsx("span", { children: "Sign out" }) })] })] }) }) }) })] }));
};
export default Menu;
