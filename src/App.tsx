import { useState } from "react";
import "./App.css";

function App() {
  const [activeTool, setActiveTool] = useState("json-format");
  const toolList = [
    {
      value: "en-decode",
      label: "信息编解码工具",
    },
    {
      value: "regexp",
      label: "正则表达式工具",
    },
    {
      value: "code-beautify",
      label: "代码美化工具",
    },
    {
      value: "json-format",
      label: "JSON 格式化",
    },
    {
      value: "json-diff",
      label: "JSON 对比",
    },
    
  ];
  return (
    <div className="container">
      <div className="aside">
        {toolList.map((tool) => {
          return (
            <div>
              <button
                className={["button", activeTool === tool.value ? "active" : ""].join(" ")}
                type="submit"
                onClick={() => setActiveTool(tool.value)}
              >
                {tool.label}
              </button>
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
