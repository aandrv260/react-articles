import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import { HeaderInfo } from '../../models/header';

const PageNotFound = () => {
  const navigate = useNavigate();

  const headerInfo: HeaderInfo = {
    heading: 'Page not found',
    buttons: [
      {
        text: 'Back',
        onClick: () => navigate('..'),
      },
    ],
  };

  return <PageContainer header={headerInfo}></PageContainer>;
};

export default PageNotFound;
