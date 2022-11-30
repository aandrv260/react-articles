import React from 'react';
import { ButtonClickHandler } from '../components/Button/Button';
import { ButtonStyles } from './header';
import { Note } from './notes';
import { NoteTagInfo } from './noteTags';

export type ActionType =
  | 'CHANGE_HEADING'
  | 'CHANGE_IS_FEATURED'
  | 'CHANGE_TAGS'
  | 'CHANGE_DESCRIPTION'
  | 'SET_NOTE_CREATED'
  | 'INPUT_INVALID_ON_SUBMIT'
  | 'HIDE_FEEDBACK'
  | 'CLEAR_FORM'
  | 'RESET_EDIT_FORM';

export type FormStatus =
  | 'NOTE_CREATED'
  | 'VALIDATION_ISSUE'
  | 'IN_EDIT'
  | 'FORM_EMPTY'
  | 'FORM_RESET';

export type FeedbackStatus = 'success' | 'failure' | 'warning';
export interface NewNoteAction {
  type: ActionType;
  value?: string;
  tags?: NoteTagInfo[];
  curNote?: Note;
}

export interface NoteFormFeedback {
  headingMessage: string;
  descriptionMessage: string;
  submitMessage: string;
  isVisible: boolean;
}

export interface FormValidation {
  entireFormIsValid: boolean;
  headingIsValid: boolean;
  descriptionIsValid: boolean;
}

export interface NoteFormState extends Note {
  feedback: NoteFormFeedback;
  status: FormStatus;
  validation: FormValidation;
  // formIsValid: boolean;
}

export interface NoteFormButton {
  text: string;
  designStyle?: ButtonStyles;
  onClick: ButtonClickHandler;
}

export type FormReducer = (state: NoteFormState, action: NewNoteAction) => NoteFormState;

export type ButtonClickMouseEvent = React.MouseEvent<HTMLButtonElement>;

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type FormInputChangeEvent = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export type InputChangeHandler = (event: InputChangeEvent) => void;
export type TextareaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type FormInputChangeHandler = (
  event: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
) => void;
export type TagsChangeHandler = (tags: NoteTagInfo[]) => void;

export interface FormEventHandlers {
  headingChange: InputChangeHandler;
  tagsChange: (data: NoteTagInfo[]) => void;
  checkboxChange: InputChangeHandler;
  descriptionChange: TextareaChangeHandler;
  hideFeedback: () => void;
  resetForm: () => void;
  submitForm: () => void;
  setNoteStatusToCreated: () => void;
}

export type FormType = 'create' | 'edit';

// Validation
export type TextInputValidator = (textInput: string | undefined) => boolean;
export type StatusColor = (formStatus: FormStatus) => FeedbackStatus;

export type InputType = 'heading' | 'description';

export interface FormInputs {
  heading: string;
  description: string;
}

export type InputData = {
  type: InputType;
  value: string | undefined;
};

export type InputValidator = (
  state: NoteFormState,
  inputData: InputData,
  feedbackMessage: string
) => NoteFormState;

export type FullFormValidationData = {
  heading: string;
  description: string;
};

export type FullFormValidation = (data: FullFormValidationData) => boolean;
