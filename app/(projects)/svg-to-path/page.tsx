"use client";

import convertSvgToPath from "@/lib/convertSvgToPath";
import { useState } from "react";
import Editor from "@monaco-editor/react";
export default function Page() {
  const [userInput, setUserInput] = useState("");
  const classes = "border w-full rounded-xl p-5 ";
  return (
    <div className="flex gap-5 w-full flex-col xl:flex-row items-center justify-center my-10">
      <Editor
        height="80vh"
        language="html"
        onChange={(newValue) => setUserInput(convertSvgToPath(newValue || ''))}
        className={classes}
      />
      
      <Editor
        height="80vh"
        language="html"
        value={userInput}
        className={classes}
        options={{readOnly: true}}
      />
    </div>
  );
}
