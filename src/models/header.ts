import { ButtonClickMouseEvent } from './form';

export type ButtonStyles = 'outline' | 'full';

interface HeaderButton {
  text: string;
  designStyle?: ButtonStyles;
  onClick: (event: ButtonClickMouseEvent) => void;
}

export interface HeaderInfo {
  heading: string;
  buttons?: HeaderButton[];
}
