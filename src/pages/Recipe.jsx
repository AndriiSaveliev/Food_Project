import { useParams } from "react-router";
import { getMealId } from "../api";
import { useEffect, useState } from "react";
import { Preloader } from "../components/Preloader";

function Recipe() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {

        getMealId(id).then(data => {

            setRecipe(data.meals ? data.meals[0] : null);
        }).catch(error => console.error("Ошибка загрузки:", error));
    }, [id]);

    return (
        <>
            {!recipe ? <Preloader /> : (
                <div className="recipe">
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <h1>{recipe.strMeal}</h1>
                    <h6>Category: {recipe.strCategory}</h6>
                    {recipe.strArea ? <h6>Area: {recipe.strArea}</h6> : null}
                    <p>{recipe.strInstructions}</p>

                    <table className='centered'>
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Measure</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(recipe).map(key => {
                                if(key.includes('Ingredient') && recipe[key]) {
                                    return (
                                        <tr key={key}>
                                            <td>{recipe[key]}</td>
                                            <td>{
                                                recipe[`strMeasure${key.slice(13)}`]
                                            }</td>
                                        </tr>
                                    );
                                }
                                return null;
                            })
                        }
                        </tbody>
                    </table>

                    {recipe.strYoutube ? (
                        <div className='row'>
                            <h5 style={{margin: '2rem 0 1.5rem'}}>Video Recipe</h5>
                            <iframe title={id} src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`}/>
                        </div>
                    ) : null}
                </div>
            )}
        </>
    );
}

export { Recipe };
