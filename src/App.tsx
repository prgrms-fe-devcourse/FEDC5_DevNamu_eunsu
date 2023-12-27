import { useState } from "react";

import Home from "/public/svg/home.svg";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <h1 className="text-[10rem]">
      <Home />
      어서오세요 데나무숲입니다!
    </h1>
  );
};

export default App;
