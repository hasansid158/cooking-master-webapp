import "./Home.css";
import RecipeList from "../../components/RecipeList/RecipeList";
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes found, please add new recipe.");
        } else {
          let results = [];
          snapshot.docs.map((doc) =>
            results.push({ id: doc.id, ...doc.data() })
          );

          setData(results);
        }
      },
      (error) => {
        setError(error.message);
      }
    );
    setIsPending(false);

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="home">
      {error && <h2>Error while fetching data!</h2>}
      {isPending && <h2>Loading data...</h2>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
