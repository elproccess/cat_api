import { useEffect, useState } from "react";
import "./App.css";
import catPage from "./catPage";
import { UserCard } from "react-ui-cards";
import { useNavigate, Link } from "react-router-dom";

function App() {
  const [catsBreed, setCatBreed] = useState([]);
  const [fbo, setthishsit] = useState("");

  let navigate = useNavigate();

  const CatComponent = (prop) => (
    <div>
      <UserCard
        float
        header={prop.headerimage}
        name={prop.name}
        positionName={prop.description}
      />
      <div style={{'display': 'none'}}>
        
        {prop.wikipedia_url}
      </div>
      <nav>
       
        <Link
          to="catPage"
          onClick={() =>{handleSubmit(prop)}}
          state={{ name: prop.name, description: prop.description, wiki: prop.wikipedia_url }}
        >
          pain
        </Link>
      </nav>
    </div>
  );

  const handleSubmit = (prop) => {
    console.log(prop);
    fetch('http://localhost:3001/catPage', {
        method: 'POST',
        headers: {"Content-Type": "application/JSON"},
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({
          "userId": prop.wikipedia_url,
          "coins": "currentPackage"
      })
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
}

  let fetchCats = () => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((response) => setCatBreed(response))
      .catch((err) => console.log(err));
  };

  let fetchCats2 = async () => {
    await fetch(
      "http://localhost:3001/express_backend"
    ).then((response) => response.json())
    .then((response) => setCatBreed(response.response))
    .catch((err) => console.log(err));
  };

  
  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };


  useEffect(() => {
    fetchCats2();
    console.log(catsBreed);
  }, []);

  return (
    <div className="App">
      {catsBreed.map((val) => (
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
     
      ))}
    </div>
  );
}

export default App;
