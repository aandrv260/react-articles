import { NoteFormState } from '../../models/form';
import generateId from '../generateId';

export const noFeedback = { message: '', isVisible: false };

export const initialState: NoteFormState = {
  heading: '',
  isFeatured: false,
  formIsValid: false,
  status: 'FORM_EMPTY',
  feedback: noFeedback,
  description: '',
  tags: [],
  id: generateId(),
};
