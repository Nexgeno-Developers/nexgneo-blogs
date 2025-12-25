"use client";

import { useRef, useEffect, useState } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react"; // ✅ Correct import
import type { Editor as TinyMCEInstance } from "tinymce";

interface TinyEditorProps {
  value?: string;
  onChange: (content?: string) => void;
}

export function TinyEditor({ value, onChange }: TinyEditorProps) {
  const editorRef = useRef<TinyMCEInstance | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      try {
        editorRef.current.setContent(value || "");
      } catch (err) {
        console.error("Error setting editor content:", err);
      }
    }
  }, [value]);

  if (error) {
    return (
      <div className="border border-red-300 rounded p-4 bg-red-50">
        <p className="text-red-600">Failed to load editor. Please refresh the page.</p>
        <p className="text-sm text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <TinyMCEEditor
      apiKey="p56nvrhctfnrux1an0cnj7m27o86q14jk296pm1kautcr7re"
      onInit={(_evt, editor) => {
        try {
          editorRef.current = editor;
          editor.on("Change", () => {
            onChange(editor.getContent());
          });
        } catch (err) {
          console.error("Error initializing editor:", err);
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }}
      onEditorChange={(content) => {
        try {
          onChange(content);
        } catch (err) {
          console.error("Error handling editor change:", err);
        }
      }}
      value={value || ""} // Ensure value is controlled
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
        setup: (editor) => {
          editor.on("error", (e) => {
            console.error("TinyMCE error:", e);
            setError("Editor initialization failed");
          });
        },
      }}
    />
  );
}
