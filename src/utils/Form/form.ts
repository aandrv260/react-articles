import { FormType, NoteFormState } from '../../models/form';
import { Note } from '../../models/notes';
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

export const convertNoteToFormState = (
  note: Note | undefined,
  formType: FormType,
  noteId?: string
): NoteFormState => {
  console.log(note);

  if (!note) {
    formType === 'edit' && console.error('note not found based on the ID provided in useNoteForm');
    formType === 'edit' && console.error(note);

    return initialState;
  }

  return {
    ...note,
    status: 'IN_EDIT',
    feedback: noFeedback,
    formIsValid: true,
  };
};
