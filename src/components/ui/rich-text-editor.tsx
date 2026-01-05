'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  // Dynamically import ReactQuill to avoid SSR issues
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }), []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };


  return (
    <div className={`rich-text-editor ${className}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="bg-background text-foreground rounded-md border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      />
      <style jsx global>{`
        .ql-container.ql-snow {
          border: none !important;
          min-height: 200px;
          font-size: 1rem;
        }
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid hsl(var(--border)) !important;
          background: hsl(var(--muted) / 0.5);
          border-radius: calc(var(--radius) - 2px) calc(var(--radius) - 2px) 0 0;
        }
        .ql-editor {
          min-height: 200px;
        }
      `}</style>
    </div>
  );
}
