import { useEffect, useState } from "react";
import "./App.css";
import { UserCard } from "react-ui-cards";
import { Link } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";

function App() {
  const [catsBreed, setCatBreed] = useState([]);
  const [description, setDescription] = useState("");

  let text = "";
  const loadingContext = useLoadingContext();

  const CatComponent = (prop) => (
    <div>
      <UserCard
        header={prop.headerimage}
        name={prop.name}
        positionName={prop.description}
      />
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

  useEffect(() => {
    fetchCats2();
    console.log(catsBreed);
  }, []);

  return (
    <div className="App">
      {catsBreed.map((val) => (
       <div className="card-container">
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
            value: text.gsh === null ? "loading..." : text.gsh,
            image: val.image === undefined
            ? "https://i.imgur.com/XJxqvsU.jpg"
            : val.image.url
          }}
        >
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
        </div>
      ))}
    </div>
  );
}

export default App;
