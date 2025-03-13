"use client";

import { useRef, useEffect } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react"; // ✅ Correct import
import type { Editor as TinyMCEInstance } from "tinymce";

interface TinyEditorProps {
  value?: string;
  onChange: (content?: string) => void;
}

export function TinyEditor({ value, onChange }: TinyEditorProps) {
  const editorRef = useRef<TinyMCEInstance | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(value || "");
    }
  }, [value]);

  return (
    <TinyMCEEditor
      apiKey="ad41s99cpyhae0tet3sgj97fy4a4endol9c125io0zndqhg6"
      onInit={(_evt, editor) => {
        editorRef.current = editor;
        editor.on("Change", () => {
          onChange(editor.getContent());
        });
      }}
      value={value} // Ensure value is controlled
      init={{
        height: 500,
        menubar: false,
        plugins: ["code"], // Only the 'code' plugin is added
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "code | removeformat | help", // Added 'code' to the toolbar
        content_style: `
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/base.css');
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/components.css');
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/utilities.css');

          body {
            @apply text-gray-900 bg-gray-100 p-4 text-base;
          }
          p { @apply text-lg leading-relaxed; }
          h1 { @apply text-3xl font-bold text-gray-800; }
          h2 { @apply text-2xl font-semibold text-gray-700; }
          h3 { @apply text-xl font-medium text-gray-600; }
          a { @apply text-blue-500 underline; }
          ul { @apply list-disc pl-5; }
          ol { @apply list-decimal pl-5; }
          blockquote { @apply border-l-4 border-gray-500 pl-4 italic; }
        `,
      }}
    />
  );
}
