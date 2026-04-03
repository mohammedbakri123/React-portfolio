import { useSearchParams } from "react-router-dom";

function useUrlPostion() {
     const [searchParam, setSearchParam] = useSearchParams();
     const lat = searchParam.get("lat");
     const lng = searchParam.get("lng");
    
    return {lat, lng, setSearchParam};
}

export default useUrlPostion
