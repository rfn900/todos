import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

export const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

function Markdown() {
  const [value, setValue] = useState("**Hello world!!!**");
  return (
    <div className="w-[800px] m-auto">
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
}

export default Markdown;
