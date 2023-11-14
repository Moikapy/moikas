'use client'; // this registers <Editor> as a Client Component
import {Block, BlockNoteEditor} from '@blocknote/core';
import {BlockNoteView, useBlockNote} from '@blocknote/react';
import '@blocknote/core/style.css';
import {useMemo} from 'react';

// Our <Editor> component we can reuse later
export default function Editor({initState=[],onChange = () => {}}: any) {
  // Gets the previously stored editor contents.
  // const initialContent: string | null = localStorage.getItem('editorContent');
  // Stores the editor's contents as an array of Block objects.
  // useMemo(() => {
  //   if (initialContent) {
  //     onChange(JSON.parse(initialContent));
  //   }
  // }, []);
  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: initState,
    onEditorContentChange: (editor) => {

      onChange(editor.topLevelBlocks);
    },
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />;
}
