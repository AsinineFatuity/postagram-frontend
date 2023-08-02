import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Counter(){
    const [count, setCount] = useState(0);

    function handleIncrement (){
        setCount(count + 1)
    }
    function handleDecrement (){
        setCount(count - 1)
    }

    return (
        <div>
            <p>
                The Counter is at {count}
            </p>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement} ml={19}>Decrement</button>
        </div>
    );
}

export default Counter