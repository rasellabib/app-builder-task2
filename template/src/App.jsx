import React from "react";
import Hero from "./Hero";
import Contact from "./Contact";

function App({ data }) {
  return (
    <div>
      <Hero title={data.title} />
      <Contact phone={data.phone} address={data.address} />
    </div>
  );
}

export default App;
