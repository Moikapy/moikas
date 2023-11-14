// Export Post Form

import {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import TextEditor from '../TextEditor';

const _Post_Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  min-height: 775px;
  padding: 0 0 1rem;
  border: 1px solid #000;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Post_Form_Title_Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #000;
  color: #fff;
  background: #000;
  text-decoration: underline;
`;

const Post_Form_Title = styled.input`
  border: 1px solid #000;
  margin: 0.5rem 0;
  border-radius: 5px;
  padding: 0.5rem;
  color: #000;
`;

const Post_Form_Content = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 1rem;
`;

const Post_Form_Label = styled.label``;

export default function Post_Form({
  initState = {id: '', title: '', sub_title: '', content: []},
  updateFormState = (e: any) => console.log(e),
}: {
  initState: any;
  updateFormState: any;
}) {
  const [title, setTitle] = useState('');
  const [sub_title, setSubTitle] = useState('');
  const [content, setContent] = useState([]);
  useEffect(() => {
    // Stores the editor's contents as an array of Block objects.
    setTitle(initState.title);
    setSubTitle(initState.sub_title);
  }, []);
  useMemo(() => {
    // console.log({...initState, title, sub_title, content});
    updateFormState({...initState, title, sub_title, content});
  }, [title, sub_title, content]);

  return (
    <_Post_Form>
      <Post_Form_Title_Section>
        <Post_Form_Label>Title*</Post_Form_Label>
        <Post_Form_Title
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Post_Form_Label>Sub Title</Post_Form_Label>
        <Post_Form_Title
          value={sub_title}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </Post_Form_Title_Section>
      <Post_Form_Content>
        <TextEditor
          initState={initState.content}
          onChange={(e: any) => {
            setContent(e);
          }}
        />
      </Post_Form_Content>
    </_Post_Form>
  );
}
