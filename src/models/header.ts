import { ButtonClickMouseEvent } from './form';
import { NoteTagInfo } from './noteTags';

export type ButtonStyles = 'outline' | 'full';

interface HeaderButton {
  text: string;
  designStyle?: ButtonStyles;
  isRed?: boolean;
  onClick: (event: ButtonClickMouseEvent) => void;
}

export interface HeaderInfo {
  heading: string;
  buttons?: HeaderButton[];
  tags?: NoteTagInfo[];
}
