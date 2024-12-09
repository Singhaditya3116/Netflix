import React,{useState} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MovieRecommendation = () => {

    const callAPI = async () => {
        const genAI = new GoogleGenerativeAI("AIzabSyA5YPhoSaQrR1sHl0UswxfqZjfSwfQwi9Q");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const prompt = "Give me a list of top 5 movies name list for this query:" + query +". Give me in a comma seperated values.Example: 'RRR','Pushpa','Tees Maar Khan','Sherlock Homes','Veer Zaara' ";
    
        const result = await model.generateContent(prompt);
        console.log(result.response.text());

    }

    const [query,setQuery] = useState("");

    return(
        <div>


            <input value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button className="p-3 bg-green-500" onClick={callAPI}>Search</button>
        </div>
    )
}

export default MovieRecommendation;