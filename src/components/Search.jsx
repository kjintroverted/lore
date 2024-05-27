import { useState } from "react";

const Search = ({ }) => {
    const [adding, setAdding] = useState(false);

    return adding ? <input />
        : <button onClick={() => setAdding(true)}>add movies</button>;
}

export default Search;