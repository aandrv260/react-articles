import React from 'react';
import { Note } from './notes';
import { NoteTagInfo } from './noteTags';

export type ActionType =
  | 'CHANGE_HEADING'
  | 'CHANGE_IS_FEATURED'
  | 'CHANGE_TAGS'
  | 'CHANGE_DESCRIPTION'
  | 'SET_NOTE_CREATED'
  | 'HIDE_FEEDBACK'
  | 'CLEAR_FORM';

export type FormStatus = 'NOTE_CREATED' | 'VALIDATION_ISSUE' | 'IN_EDIT' | 'FORM_EMPTY';
export type FeedbackStatus = 'success' | 'failure' | 'warning';

export interface NewNoteAction {
  type: ActionType;
  value?: string;
  tags?: NoteTagInfo[];
}

interface NoteFormFeedback {
  message: string;
  isVisible: boolean;
}

export interface NoteFormState extends Note {
  feedback: NoteFormFeedback;
  status: FormStatus;
  formIsValid: boolean;
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
