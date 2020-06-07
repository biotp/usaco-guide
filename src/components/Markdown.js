import React from "react";
import rehypeReact from "rehype-react"

import "../styles/markdown.css";
import "katex/dist/katex.min.css";
import "../styles/prism-theme.css";

const SpoilerComponent = ({ children }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className={`px-4 border border-gray-200 rounded-md spoiler ${show?"spoiler--show":"spoiler--hide"}`}
         onClick={e => {if (e.target.classList.contains("spoiler-label")) setShow(!show) }}>
      {children}
    </div>
  );
};

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    details: SpoilerComponent,
    summary: ({ children }) => (
      <p className="spoiler-label py-4 flex items-start">
        <svg className="h-6 w-6 text-gray-500 mr-4 spoiler-label__open" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <svg className="h-6 w-6 text-gray-500 mr-4 spoiler-label__closed" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        {children}
      </p>
    ),
    "info-block": ({ children }) => (
      <div className="rounded-md bg-blue-50 p-4 info-block mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            {children}
          </div>
        </div>
      </div>
    )
  },
}).Compiler;

const Markdown = ({ htmlAst, className }) => {
  return (
    <div className={`markdown ${className}`}>
      {renderAst(htmlAst)}
    </div>
  );
};

export default Markdown;