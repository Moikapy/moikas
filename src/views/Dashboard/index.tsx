'use client';
import {useMemo, useState} from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import TextEditor from '@/components/TextEditor';

const Main = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
const Dashboard_Wrapper = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  height: calc(100vh - 53px);
  width: 100%;
`;
const Dashboard_Sidenav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100px;
  margin-top:0.5rem;
`;
const Dashboard_Div = styled.div<{$align?: string}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props: any) => (props.$align ? props.$align : 'start')};
  justify-content: start;
  width: 100%;
  padding: 0 1rem;
  flex-grow: 1;
`;
const Dashboard_Button_Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  width: 100%;
  max-width: 1200px;
`;

const Dashboard_Button = styled.button`
  border: 1px solid #000;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  max-width: 600px;
  text-align: center;
`;
export default function Dashboard_View() {
  const [showPostView, setShowPost] = useState(false);
  return (
    <Main>
      <Navbar />
      {/* <Dashboard_Div>Dashboard </Dashboard_Div>
      <Dashboard_Div>Manage your posts and profile</Dashboard_Div>
      <hr /> */}
      <Dashboard_Wrapper>
        <Dashboard_Sidenav>
          <Dashboard_Button onClick={() => setShowPost(!showPostView)}>
            New
          </Dashboard_Button>
          <Dashboard_Button onClick={() => setShowPost(false)}>
            Profile
          </Dashboard_Button>
        </Dashboard_Sidenav>
        <Dashboard_Div $align='center'>
          {showPostView && (
            <>
              {/* <Dashboard_Div>New Post</Dashboard_Div> */}
              <New_Post_Form />

              <Dashboard_Button_Group>
                <Dashboard_Button onClick={() => setShowPost(false)}>
                  Back
                </Dashboard_Button>
                <Dashboard_Button onClick={() => setShowPost(false)}>
                  Publish
                </Dashboard_Button>
              </Dashboard_Button_Group>
            </>
          )}
        </Dashboard_Div>
      </Dashboard_Wrapper>
    </Main>
  );
}

const New_Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  min-height: 775px;
  padding: 1rem 0;
  border: 1px solid #000;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const New_Post_Title_Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #000;
`;

const New_Post_Title = styled.input`
  border: 1px solid #000;
  margin: 0.5rem 0;
  border-radius: 5px;
  padding: 0.5rem;
`;

const New_Post_Content = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 1rem;
`;

const New_Post_Label = styled.label``;

function New_Post_Form() {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [content, setContent] = useState([]);
  // console.log(content)
  return (
    <New_Post>
      <New_Post_Title_Section>
        <New_Post_Label>Title</New_Post_Label>
        <New_Post_Title onChange={(e) => setTitle} />
        <New_Post_Label>Sub Title</New_Post_Label>
        <New_Post_Title onChange={(e) => setSubTitle} />
      </New_Post_Title_Section>
      <New_Post_Content>
        <TextEditor onChange={(e:any) => {setContent(e);console.log(e)}} />
      </New_Post_Content>
    </New_Post>
  );
}
