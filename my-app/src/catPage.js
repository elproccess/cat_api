import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CatPage = () => {
  let data = useLocation();
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [termsValidation, setTermsValidation] = useState(false);
  useEffect(() => {
    if (!termsValidation) {
      console.log('run something here');
    }
    fetchwiki();
    
   //console.log(value + "yumsdoufmsoenfosnfnsen");
  }, [value]);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let fetchwiki = async () => {
    delay(5000);
    await fetch("http://localhost:3001/catValues")
      .then((response) => response.json())
      .then((response) => setValue(response.response))
      .then((response) => setTermsValidation(true))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {data.state.name} {value}
    </div>
  );
};
export default CatPage;
