import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import "./catPage.css";

import { FcFlashOn } from "react-icons/fc";

const CatPage = () => {
  let data = useLocation();
  const [value, setValue] = useState("");
  let [loading, setLoading] = useState(true);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    fetchwiki();
  }, [value]);


  let fetchwiki = async () => {
    delay(5000);
    await fetch("http://localhost:3001/catValues")
      .then((response) => response.json())
      .then((response) => setValue(response.response))
      .then((response) => setLoading(false))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card-image">
        <img className="card-img" src={data.state.image} />
      </div>
      <div className="card-icons"><FcFlashOn /></div>
      <ClipLoader color={'#565959'} loading={loading}  size={150} />
      {data.state.name} {value}
    </div>
  );
};
export default CatPage;
