import userStore from "@/stores/userStore.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const {user, signOut} = userStore()
    const navigate = useNavigate();
    return (
        <>
            Welcome, {user && user.displayName}
            {user ? <Button onClick={signOut}>Sign Out</Button> : <Button onClick={() => navigate('/signin')}>Sign In</Button> }
        </>
    );
};

export default Home;