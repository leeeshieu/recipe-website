import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "../components/Checkout";

const ListRecipe = () => {
    const navigation = new useNavigate();
    
    const [recipes, setRecipes] = useState([]);
    const initialOptions = {
        "client-id": "ATTa_pgbXnWg0zCev2ejI_RhLpkyxxea_QmeXTGttI68gYnr4CKZPtr4LaTIjKCDnh0JEOZEIKEQjiKL",
        currency: "SGD",
        intent: "capture",
    };

    const getRecipes = async () => {
        await fetch('/assets/data/recipes.json')
            .then(res => res.json())
            .then(data => {
                setRecipes(data);
            });
    }

    useEffect(() => {
        getRecipes();
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col gap-12 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Our Recipes</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Discover delicious recipes to try at home.
                    </p>
                </div>
                <div className="bg-white shadow sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {recipes.map((recipe) => (
                        <li key={recipe.id} className="px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <img src={recipe.imageURL} width={144} alt={recipe.name} />
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{recipe.name}</h3>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <button onClick={() => navigation(`/${recipe.id}`)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        View Recipe
                                    </button>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <h1 className="text-lg font-bold text-center">Tip here!</h1>
                <div className="mx-auto w-2/12">
                    <PayPalScriptProvider options={initialOptions}>
                        <Checkout/>
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
    );
}
 
export default ListRecipe;