import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailRecipe = () => {
    const params = useParams();
    const navigation = new useNavigate();
    const reviews = JSON.parse(localStorage.getItem(params.id));

    const [recipe, setRecipe] = useState({});
    const [name, setName] = useState("");
    const [review, setReview] = useState("");

    const submitForm = () => {
        let localStorageData = JSON.parse(localStorage.getItem(params.id)) || [];
        const data = {
            "name": name,
            "review": review
        };
        localStorageData.push(data);
        localStorage.setItem(params.id, JSON.stringify(localStorageData));
    }

    const getRecipe = async () => {
        await fetch('/assets/data/recipes.json')
            .then(res => res.json())
            .then(data => {
                setRecipe(data[params.id - 1]);
            });
    }

    useEffect(() => {
        getRecipe();
    });

    return (
        <div className="m-8">
            <a href="/">← Back to list of recipes</a>
            <img src={recipe.imageURL} alt={recipe.name} className="mx-auto mb-4" width="144"/>
            <h1 className="text-2xl text-center font-bold">{recipe.name}</h1>

            <div className="my-8">
                <h2 className="text-xl text-center font-semibold">Ingredients</h2>
                <table className="mx-auto">
                    <thead>
                        <th className="px-20 border border-gray-200">Amount</th>
                        <th className="px-20 border border-gray-200">Ingredient</th>
                    </thead>
                    <tbody>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <tr key={index}>
                                <td className="px-4 text-center border border-gray-200">{ingredient.quantity}</td>
                                <td className="px-4 border border-gray-200">{ingredient.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="my-8">
                <h2 className="text-xl text-center font-semibold">Steps</h2>
                <table className="mx-auto">
                    <thead>
                        <th className="px-20 border border-gray-200">Step</th>
                        <th className="px-20 border border-gray-200">Instruction</th>
                    </thead>
                    <tbody>
                        {recipe.steps && recipe.steps.map((step, index) => (
                            <tr key={index}>
                                <td className="px-4 text-center border border-gray-200">{index + 1}</td>
                                <td className="px-4 border border-gray-200">{step}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col mx-auto w-4/12 py-2 my-8 border border-gray-200">
                <h2 className="text-xl text-center font-semibold">Make a Review!</h2>
                <form onSubmit={submitForm} className="flex flex-col mx-auto">
                    <div className="flex flex-row gap-4">
                        <div>
                            <h1>Name</h1>
                            <input onChange={(event) => setName(event.target.value)} className="border border-gray-200"/>
                        </div>
                        <div>
                            <h1>Your Thought</h1>
                            <textarea onChange={(event) => setReview(event.target.value)} className="border border-gray-200"/>
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-400 text-white font-semibold px-4 px-2 rounded mx-auto">Submit</button>
                </form>
            </div>

            <div className="flex flex-col">
                <h2 className="text-xl text-center font-semibold">All Reviews</h2>
                <div className="mx-auto">
                    {reviews ? reviews.map((review, index) => (
                        <div key={index}>
                            <p className="text-center"><strong>{review.name}</strong> {review.review}</p>
                        </div>
                    )) : <p>No reviews</p>}
                </div>
            </div>
        </div>
    );
}
 
export default DetailRecipe;