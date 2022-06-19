import { useEffect, useState } from "react";
import "./App.css";
import catPage from "./catPage";
import { UserCard } from "react-ui-cards";
import { useNavigate, Link } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";


function App() {
  const [catsBreed, setCatBreed] = useState([]);
  const [description, setDescription] = useState("");

  let navigate = useNavigate();
  let text = "";
  const loadingContext = useLoadingContext();

  const CatComponent = (prop) => (
    <div>
      <UserCard
        header={prop.headerimage}
        name={prop.name}
        positionName={prop.description}
      />
      <div style={{ display: "none" }}>{prop.wikipedia_url}</div>
      <nav>
    
          { <Link
          to="catPage"
          onClick={() => {
            handleSubmit(prop);
          }}
          state={{
            name: prop.name,
            description: prop.description,
            wiki: prop.wikipedia_url,
            value: text.gsh===null ? "loading..." : text.gsh,
          }}
        >
         {prop.name}
        </Link>}
      
      </nav>
    </div>
  );

  const handleSubmit = async (prop) => {
    //await delay(2000);
    console.log(prop);
    await fetch("http://localhost:3001/catPage", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({
        userId: prop.wikipedia_url,
        coins: "currentPackage",
      }),
    }).then(async function (response) {
      text = await response.json();
      setDescription(text.gsh);
       console.log(text.gsh);
       loadingContext.done();
    });
  };
  let fetchCats2 = async () => {
    await fetch("http://localhost:3001/express_backend")
      .then((response) => response.json())
      .then((response) => setCatBreed(response.response))
      .catch((err) => console.log(err));
  };

  const callback = () => {
    console.log(description.gsh);
  }

  useEffect(() => {
    fetchCats2();
    console.log(description);
  }, []);
  
  const delay = ms => new Promise(res => setTimeout(res, ms));
  

  return (
    <div className="App">
      {catsBreed.map((val) => (
        <Link 
        key={val.id}
        to="catPage"
        onClick={() => {
          handleSubmit(val);
        }} 
         
        state={{
          name: val.name,
          description: val.description,
          wiki: val.wikipedia_url,
          value: text.gsh===null ? "loading..." : text.gsh,
        }}>
        <CatComponent
          wikipedia_url={val.wikipedia_url}
          description={val.description}
          name={val.name}
          headerimage={
            val.image === undefined
              ? "https://i.imgur.com/XJxqvsU.jpg"
              : val.image.url
          }
        />
        </Link>
      ))}
    </div>
  );
}

export default App;
