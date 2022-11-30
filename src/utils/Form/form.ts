import { FormType, NoteFormFeedback, NoteFormState } from '../../models/form';
import { Note } from '../../models/notes';
import generateId from '../generateId';

export const noFeedback: NoteFormFeedback = {
  headingMessage: '',
  descriptionMessage: '',
  submitMessage: '',
  isVisible: false,
};

export const initialState: NoteFormState = {
  heading: '',
  isFeatured: false,
  validation: {
    entireFormIsValid: false,
    descriptionIsValid: false,
    headingIsValid: false,
  },
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
    validation: {
      entireFormIsValid: true,
      headingIsValid: true,
      descriptionIsValid: true,
    },
  };
};

export const formStateToNote = (noteForm: NoteFormState): Note => {
  return {
    heading: noteForm.heading,
    description: noteForm.description,
    id: noteForm.id,
    tags: noteForm.tags,
    isFeatured: noteForm.isFeatured,
  };
};
