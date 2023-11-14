'use client';
import {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import TextEditor from '@/components/TextEditor';
import usePosts from '@/hooks/usePosts';
import Blog_Feed from '@/components/Blog_Feed';
import Post_Form from '@/components/ui/Post_Form';
import AccountForm from '@/components/AccountForm';
import useProfileMutate from '@/hooks/useProfileMutate';
import Theme_Layout from '@/components/Theme_Layout';


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
export default function Dashboard_View({session}: any) {
  const [showPostView, setShowPost] = useState(false);
  const [showEditView, setShowEdit] = useState(false);
  const [showFeedManager, setShowFeedManager] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [postFormState, setPostFormState] = useState({
    id: '',
    title: '',
    sub_title: '',
    content: [],
  });
  const {posts, getPosts, createPost, updatePost, deletePost} =
    usePosts(session);
  const {updateProfile}: any = useProfileMutate();
  useEffect(() => {
    getPosts();
  }, []);
  function clearForm() {
    setPostFormState({
      id: '',
      title: '',
      sub_title: '',
      content: [],
    });
  }
  return (
    <Theme_Layout>
      <Dashboard_Wrapper>
        <Dashboard_Sidenav>
          <Dashboard_Button
            onClick={() => {
              clearForm();
              setShowFeedManager(false);
              setShowEdit(false);
              setShowSettings(false);
              setShowPost(!showPostView);
            }}>
            New
          </Dashboard_Button>
          <Dashboard_Button
            onClick={() => {
              setShowPost(false);
              setShowEdit(false);
              setShowSettings(false);
              setShowFeedManager(!showFeedManager);
            }}>
            Posts
          </Dashboard_Button>
          <Dashboard_Button
            onClick={() => {
              setShowPost(false);
              setShowFeedManager(false);
              setShowEdit(false);
              setShowSettings(!showSettings);
            }}>
            Settings
          </Dashboard_Button>
        </Dashboard_Sidenav>
        <Dashboard_Div $align='center'>
          {showFeedManager && (
            <Blog_Feed
              items={posts}
              isCard
              onClick={(e: any) => {
                setShowEdit(true);
                setShowFeedManager(false);
                setPostFormState(e);
              }}
              isEdit
            />
          )}
          {showPostView && (
            <Post_Form
              initState={postFormState}
              onBack={() => {
                setShowPost(false);
                clearForm();
              }}
              updateFormState={(e: any) => setPostFormState(e)}
              onPublish={() => {
                createPost(postFormState);
                setShowPost(false);
                clearForm();
              }}
            />
          )}
          {showEditView && (
            <Post_Form
              initState={postFormState}
              onBack={() => {
                setShowEdit(false);
                clearForm();
              }}
              updateFormState={(e: any) => setPostFormState(e)}
              onPublish={() => {
                updatePost(postFormState);
                clearForm();
                setShowEdit(false);
              }}
              onDelete={() => {
                deletePost(postFormState.id);
                clearForm();
                setShowEdit(false);
              }}
              isEdit
            />
          )}
          {showSettings && (
            <AccountForm session={session} updateProfile={updateProfile} />
          )}
        </Dashboard_Div>
      </Dashboard_Wrapper>
    </Theme_Layout>
  );
}


