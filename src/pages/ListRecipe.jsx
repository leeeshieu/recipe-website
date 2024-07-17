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
        <div className="m-8">
            <h1 className="text-2xl font-bold text-center">List of Recipes</h1>
            <div className="flex flex-row my-8">
                {recipes && recipes.map(recipe => (
                    <div key={recipe.id} onClick={() => navigation(`/${recipe.id}`)} className="p-10 border border-1 hover:bg-orange-200 w-3/12">
                        <img src={recipe.imageURL} alt={recipe.name} className="mx-auto mb-4" width="144"/>
                        <p className="text-center">{recipe.name}</p>
                    </div>
                ))}
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