import { useState } from "react";
import { toolList, toolDefault } from "../config";

function App() {
  const [activeTool, setActiveTool] = useState(toolDefault);
  return (
    <div className="container">
      <div className="aside">
        {toolList.map((tool, index) => {
          return (
            <div
              key={index}
              className={["menu", activeTool === tool.value ? "active" : ""].join(" ")}
              onClick={() => setActiveTool(tool.value)}
            >
              {tool.label}
            </div>
          );
        })}
      </div>
      <div className="main">
        <iframe className="iframe" src={`/${activeTool}/index.html`} frameBorder={0}></iframe>
      </div>
    </div>
  );
}

export default App;
