import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import "./catPage.css";

import { FcFlashOn } from "react-icons/fc";
import { RiCloudy2Fill } from "react-icons/ri";
import { FcBiotech } from "react-icons/fc";
import { FcGlobe } from "react-icons/fc";

const CatPage = () => {
  let data = useLocation();
  let [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
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
      <div className="card-image-row">
        <div className="card-image-container">
          <img className="card-img" src={data.state.image} />
          <FcFlashOn size={30} className="card-icohiojl" />
        </div>
      </div>
      <div className="card-icons-row">
        <div className="card-icons-energy">
          <FcFlashOn size={30} className="card-icons-energy-icon" />
          <div className="card-icons-energy-text">{data.state.energy}</div>
        </div>

        <div className="card-icons-shedding">
          <RiCloudy2Fill size={30} />
          <div className="card-icons-shedding-text">{data.state.shedding}</div>
        </div>

        <div className="card-icons-shedding">
          <FcBiotech size={30} />
          <div className="card-icons-shedding-text">{data.state.life}</div>
        </div>

        <div className="card-icons-shedding">
          <FcGlobe size={30} />
          <div className="card-icons-shedding-text">{data.state.origin}</div>
        </div>
      </div>
      <ClipLoader color={"#565959"} loading={loading} size={150} />
      {data.state.name} {value}
    </div>
  );
};
export default CatPage;
