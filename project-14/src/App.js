import { FaStar } from "react-icons/fa";
import { useState, useRef } from "react";

function createArray(length) {
  return Array(length).fill(null);
}

function Star({ selected = false, onClick }) {
  return <FaStar onClick={onClick} color={selected ? "red" : "gray"} />;
}

function StarRating({ TotalStars, select, setSelect }) {
  return createArray(TotalStars).map((val, i) => {
    return (
      <Star
        key={i + Math.random()}
        selected={i < select}
        onClick={() => {
          if (select === i + 1) {
            setSelect(-1);
          } else {
            setSelect(i + 1);
          }
        }}
      />
    );
  });
}

function App() {
  const [select, setSelect] = useState(0);

  const sound = useRef();
  const color = useRef();

  function submit(event) {
    event.preventDefault();

    const soundValue = sound.current.value;
    const colorValue = color.current.value;

    sound.current.value = "";
    color.current.value = "";

    console.log(soundValue, colorValue);
  }

  return (
    <div className="App">
      {<StarRating select={select} setSelect={setSelect} TotalStars={10} />}
      <h2>
        {select}/{10} stars selected
      </h2>

      <div>
        <form onSubmit={submit}>
          <input type="text" ref={sound} />
          <input type="color" ref={color} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
