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
                console.log(data[params - 1])
            });
    }

    useEffect(() => {
        getRecipe();
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col gap-8 py-12 px-4 sm:px-6 lg:px-8">
            <a href="/">← Back to list of recipes</a>
            
            <div className="mx-auto max-w-4xl w-full space-y-8 bg-white shadow sm:rounded-lg p-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">{recipe.name}</h2>
                    <p className="mt-4 text-sm text-gray-600">Discover how to make this delicious dish with the steps and ingredients below.</p>
                    <img className="mt-4 mx-auto rounded-lg shadow-lg" src={recipe.imageURL} width={256} alt={recipe.name} />
                </div>
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-900">Ingredients</h3>
                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full bg-white divide-y divide-gray-200">
                        <thead>
                            <tr>
                            <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Ingredient</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{ingredient.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ingredient.name}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-900">Instructions</h3>
                    <ol className="mt-4 list-decimal list-inside space-y-2 text-gray-700">
                        {recipe.steps && recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className="flex flex-col mx-auto w-full max-w-md p-8 border border-gray-200 bg-white shadow rounded-lg">
                <h2 className="text-2xl text-center font-semibold text-gray-900">Make a Review!</h2>
                <form onSubmit={submitForm} className="flex flex-col mt-6 space-y-4">
                    <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input 
                        onChange={(event) => setName(event.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Thought</label>
                        <textarea 
                        onChange={(event) => setReview(event.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        />
                    </div>
                    </div>
                    <button 
                    type="submit" 
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Submit
                    </button>
                </form>
                </div>

                <div className="flex flex-col w-full max-w-md mx-auto py-8 bg-white shadow rounded-lg">
                    <h2 className="text-2xl text-center font-semibold text-gray-900 mb-6">All Reviews</h2>
                    <div className="space-y-4">
                        {reviews ? reviews.map((review, index) => (
                        <div key={index} className="px-4 py-2 rounded-md">
                            <p className="flex gap-2 text-center text-sm text-gray-700">
                            <strong className="block text-gray-900">{review.name}</strong> 
                            {review.review}
                            </p>
                    </div>
                    )) : <p className="text-center text-gray-700">No reviews</p>}
                </div>
            </div>
        </div>
    );
}
 
export default DetailRecipe;