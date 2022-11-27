import React from 'react';

export type ButtonClickMouseEvent = React.MouseEvent<HTMLButtonElement>;

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type FormInputChangeEvent = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export type InputChangeHandler = (event: InputChangeEvent) => void;
export type TextareaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type FormInputChangeHandler = (
  event: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
) => void;
