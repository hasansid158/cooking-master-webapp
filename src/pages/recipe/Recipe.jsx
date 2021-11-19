import "./Recipe.css";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

export default function Recipe() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setData(doc.data());
        } else {
          setIsPending(false);
          setError("Could not find the recipe");
        }
      });
  }, [setIsPending, id]);

  return (
    <div className="recipe">
      {isPending && <h2>Loading Data...</h2>}
      {error && <h2>Error while fetching !!</h2>}
      {data && (
        <React.Fragment>
          <h2>{data.title}</h2>
          <p>{data.cookingTime} to cook</p>
          <ol>
            {data.ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ol>
          <p className="method">{data.method}</p>
        </React.Fragment>
      )}
    </div>
  );
}
