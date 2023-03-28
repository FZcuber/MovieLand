import React from "react";
import { useState, useEffect } from "react";

// const Person = (props) => {
//   return (
//     <>
//       <div>
//         <h1>Hello World</h1>
//         <h1>This person is {props.name}</h1>
//       </div>
//     </>
//   );
// };

const APP = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, []);
  return (
    <>
      <div>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          Click Me
        </button>
        <h1>Count: {count}</h1>
        <button onClick={() => setCount((prevCount) => prevCount - 1)}>
          Click Me
        </button>
      </div>
    </>
  );
};

export default APP;
