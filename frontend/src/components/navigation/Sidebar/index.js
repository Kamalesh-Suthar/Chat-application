import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from "@/components/navigation/Sidebar/menu";
const Layout = ({ children }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Sidebar, {}), _jsx("main", { children: children })] }));
};
export default Layout;
