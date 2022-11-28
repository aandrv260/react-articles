import React from 'react';
import { HeaderInfo } from '../../models/header';
import { NoteTagInfo } from '../../models/noteTags';
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import NoteTags from '../NoteTags/NoteTags';
import styles from './Header.module.scss';

interface HeaderProps extends HeaderInfo {
  tags?: NoteTagInfo[];
}

const Header: React.FC<HeaderProps> = ({ heading, buttons, tags }) => {
  return (
    <header className={styles['header']}>
      <div className={styles['header__title-box']}>
        <h1>{heading}</h1>

        {tags && tags.length > 0 && (
          <div className={styles['header__tags']}>
            <NoteTags className={styles['header__tags-wrapper']} tags={tags} />
          </div>
        )}
      </div>

      {buttons && buttons?.length > 0 && (
        <ButtonGroup>
          {buttons.map(button => (
            <Button
              onClick={button.onClick}
              designStyle={button.designStyle}
              isRed={button.isRed}
              key={Math.random()}
            >
              {button.text}
            </Button>
          ))}
        </ButtonGroup>
      )}
    </header>
  );
};

export default Header;
