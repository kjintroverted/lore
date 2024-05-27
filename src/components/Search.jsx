import { useState } from "react";
import InputControl from "./InputControl";

const Search = ({ }) => {
    const [adding, setAdding] = useState(false);
    const [value, setValue] = useState("");

    return adding ? <InputControl value={value} update={setValue} />
        : <button onClick={() => setAdding(true)}>add movies</button>;
}

export default Search;