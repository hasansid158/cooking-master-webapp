import "./Home.css";
import useFetch from "../../Hooks/useFetch";
import RecipeList from "../../components/RecipeList/RecipeList";

export default function Home() {
  const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  return (
    <div className="home">
      {error && <h2>Error while fetching data!</h2>}
      {isPending && <h2>Loading data...</h2>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
