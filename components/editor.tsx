"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
          ["bold", "italic", "underline", "strike", "blockquote"], // Text styles
          [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ], // Lists & indentation
          ["link", "image", "video"], // Media
          [{ color: [] }, { background: [] }], // Colors
          [{ align: [] }], // Alignment
          ["code-block"], // ✅ Add Code Block Option
          ["clean"], // Remove formatting
        ],
      },
    }),
    []
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "script",
      "link",
      "image",
      "video",
      "color",
      "background",
      "align",
      "code-block", // ✅ Add Code Block Format
    ],
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};
