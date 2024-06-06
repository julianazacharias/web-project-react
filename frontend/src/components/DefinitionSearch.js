import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DefinitionSearch() {

    const [word, setWord] = useState('');
    const navigate = useNavigate();


    return(
        <form className="flex space-between space-x-2 max-w-[300px]" 
        onSubmit={() => {
            navigate('/dictionary/' + word);
        }}>
            <input
                className="shrink min-w-0 px-2 py-1 rounded"
                placeholder="Rabbit"
                type="text"
                onChange={(e) => {
                    setWord(e.target.value);
                }}
            />
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-2 rounded">Search</button>
        </form>
    );

}