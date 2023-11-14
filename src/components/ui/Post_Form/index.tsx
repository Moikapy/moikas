import Post_Form_Content_Area from '@/components/Post_Form_Content_Area';
import styled from 'styled-components';

const Form_Button_Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  width: 100%;
  max-width: 1200px;
`;

const Form_Button = styled.button`
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
export default function Post_Form({
  initState,
  onBack,
  updateFormState,
  onPublish,
  onDelete = () => {},
  isEdit = false,
}: {
  initState: any;
  onBack: any;
  updateFormState: any;
  onPublish: any;
  onDelete?: any;
  isEdit?: boolean;
}) {
  return (
    <>
      <Post_Form_Content_Area
        initState={initState}
        updateFormState={updateFormState}
      />

      <Form_Button_Group>
        <Form_Button onClick={onBack}>Back</Form_Button>
        <Form_Button onClick={onPublish}>Publish</Form_Button>
      </Form_Button_Group>
      {isEdit && <Form_Button onClick={onDelete}>Delete</Form_Button>}
    </>
  );
}
