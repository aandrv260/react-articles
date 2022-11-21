import PageContainer from '../../components/PageContainer/PageContainer';
import CreatableReactSelect from 'react-select/creatable';
import { HeaderInfo } from '../../models/header';
import { ButtonClickMouseEvent } from '../../models/form';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import InputBox from '../../components/InputBox/InputBox';
import { useState, useMemo } from 'react';
import FormGroup from '../../components/FormGroup/FormGroup';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';

const NewNotePage = () => {
  const [title, setTitle] = useState<string>('');
  const [checkboxIsChecked, setCheckboxIsChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  // alert(checkboxIsChecked);

  const headerInfo: HeaderInfo = useMemo(
    () => ({
      heading: 'New note',
      buttons: [
        {
          text: 'Add',
          onClick: (event: ButtonClickMouseEvent) => {},
        },

        {
          text: 'Back',
          designStyle: 'outline',
          onClick: (event: ButtonClickMouseEvent) => navigate('/'),
        },
      ],
    }),
    [navigate]
  );

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const checkboxChangeHandler = () => {
    setCheckboxIsChecked(isChecked => !isChecked);
  };

  return (
    <PageContainer header={headerInfo}>
      <Form hasGroups>
        <FormGroup>
          <InputBox
            id="note-title"
            type={'text'}
            label="Title"
            value={title}
            onChange={titleChangeHandler}
          />

          <InputBox
            id="note-tags"
            label="Tags"
            onChange={titleChangeHandler}
            inputElementType="multi-select"
          />
        </FormGroup>
        <Checkbox checked={checkboxIsChecked} onChange={checkboxChangeHandler} label="Featured" />

        <InputBox
          id="note-description"
          type={'text'}
          label="Description"
          value={title}
          onChange={titleChangeHandler}
          inputElementType="textarea"
        />
      </Form>

      <Button type="button">Create</Button>
    </PageContainer>
  );
};

export default NewNotePage;
