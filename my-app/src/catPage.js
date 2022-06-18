import React from "react";
import { useLocation } from 'react-router-dom'


const CatPage = () => {
    
    let data = useLocation();
    console.log(data.state.wiki);

    return(
        <div>
            {data.state.name} well...
        </div>
    );
};
export default CatPage;