import React, { useEffect, useState } from "react";

const UnmmountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    return () => {
      console.log("Unmount!");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisble, setIsVisible] = useState(false);

  const toggle = () => setIsVisible(!isVisble);

  return (
    <div>
      <button onClick={toggle}>On/Off</button>
      {isVisble && UnmmountTest}
    </div>
  );
};

export default Lifecycle;
