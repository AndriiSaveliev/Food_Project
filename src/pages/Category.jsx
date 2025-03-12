import {getFilterCategory} from "../api";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Preloader} from "../components/Preloader";
import {MealList} from "../components/MealList";


function Category() {
    const { name } = useParams();
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getFilterCategory(name).then(data => {
            setMeals(data.meals || []);
        });
    }, [name]);

    return (
        <>
            {!meals.length ? <Preloader /> : <MealList meals={meals} />}
        </>
    );
}

export { Category };
