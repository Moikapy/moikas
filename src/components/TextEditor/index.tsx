'use client'; // this registers <Editor> as a Client Component
import {Block, BlockNoteEditor} from '@blocknote/core';
import {BlockNoteView, useBlockNote} from '@blocknote/react';
import '@blocknote/core/style.css';
import {useState} from 'react';

// Gets the previously stored editor contents.
const initialContent: string | null = localStorage.getItem('editorContent');
// Our <Editor> component we can reuse later
export default function Editor() {
  // Stores the editor's contents as an array of Block objects.
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      localStorage.setItem(
        'editorContent',
        JSON.stringify(editor.topLevelBlocks)
      );
      setBlocks(editor.topLevelBlocks);
    },
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />;
}
