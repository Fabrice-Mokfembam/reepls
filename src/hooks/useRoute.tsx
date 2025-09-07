import { useNavigate } from "react-router-dom";


export const useRoute = () => {

    const navigate = useNavigate();

    const routeToUseProfile = (username:string)=>{
         navigate(`/profile/${username}`)
    }

    return {routeToUseProfile}
};