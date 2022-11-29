import React from 'react';
import { HeaderInfo } from '../../models/header';
import Header from '../Header/Header';

interface PageContainerProps {
  header?: HeaderInfo;
  children?: React.ReactNode;
  className?: string;
}

/** 
- This makes it easy not to constantly repeat the `<header>` and the `<main>` all over again on all pages

- Makes the code cleaner and more understandable

*/
const PageContainer = (props: PageContainerProps) => {
  const { header, children, className } = props;

  return (
    <>
      {header && <Header heading={header.heading} buttons={header?.buttons} tags={header.tags} />}

      <main className={className}>{children}</main>
    </>
  );
};

export default PageContainer;
