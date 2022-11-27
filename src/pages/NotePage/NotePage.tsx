import { useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import PageContainer from '../../components/PageContainer/PageContainer';
import { HeaderInfo } from '../../models/header';

const NotePage = () => {
  const navigate = useNavigate();

  const headerInfo: HeaderInfo = {
    heading: 'The_Title',
    buttons: [
      {
        text: 'Edit',
        onClick: () => {},
      },

      {
        text: 'Delete',
        onClick: () => {},
      },

      {
        text: 'Back',
        designStyle: 'outline',
        onClick: () => {
          navigate('..');
        },
      },
    ],
  };

  const markdown = `
  # Example markdown
  <br />
  ### It works!
  `;

  return (
    <PageContainer header={headerInfo}>
      <Markdown>{markdown}</Markdown>
    </PageContainer>
  );
};

export default NotePage;
