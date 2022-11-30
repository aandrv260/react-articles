import { InputType } from 'zlib';
import {
  FormValidation,
  FullFormValidation,
  InputValidator,
  NoteFormState,
  StatusColor,
  TextInputValidator,
} from '../../models/form';

const minNumOfHeadingChars = 5;
const minNumOfDescriptionChars = 20;

const invalidHeadingMessage = `The heading must have at least ${minNumOfHeadingChars} characters`;
const invalidDescriptionMessage = `The description must have at least ${minNumOfDescriptionChars} characters`;

export const getStatusColor: StatusColor = formStatus => {
  switch (formStatus) {
    case 'NOTE_CREATED':
      return 'success';

    case 'VALIDATION_ISSUE':
      return 'failure';

    default:
      return 'warning';
  }
};

export const isFormHeadingValid: TextInputValidator = heading => {
  return heading !== undefined && heading.length > minNumOfHeadingChars;
};

export const isFormDescriptionValid: TextInputValidator = description => {
  return description !== undefined && description.length > minNumOfDescriptionChars;
};

export const entireFormIsValid: FullFormValidation = ({ heading, description }) => {
  return isFormHeadingValid(heading) && isFormDescriptionValid(description);
};

export const validateInputsAndReturnResult = (
  heading: string,
  description: string
): FormValidation => {
  const headingIsValid = isFormHeadingValid(heading);
  const descriptionIsValid = isFormDescriptionValid(description);

  return {
    headingIsValid,
    descriptionIsValid,
    entireFormIsValid: headingIsValid && descriptionIsValid,
  };
};

export const validateTextInput: InputValidator = (
  state,
  inputData,
  feedbackMessage
): NoteFormState => {
  const isInputHeading = inputData.type === 'heading';
  const headingIsValid = isInputHeading
    ? isFormHeadingValid(inputData.value)
    : state.validation.headingIsValid;
  const descriptionIsValid = !isInputHeading
    ? isFormDescriptionValid(inputData.value)
    : state.validation.descriptionIsValid;
  const isInputValid = isInputHeading ? isFormHeadingValid : isFormDescriptionValid;

  if (!isInputValid(inputData.value)) {
    return {
      ...state,
      status: 'VALIDATION_ISSUE',
      feedback: {
        headingMessage:
          inputData.type === 'heading' ? feedbackMessage : state.feedback.headingMessage,

        descriptionMessage:
          inputData.type === 'description' ? feedbackMessage : state.feedback.descriptionMessage,

        submitMessage: '',
        isVisible: true,
      },

      // TODO: Refactor this using the function above called validateInputsAndReturnResult
      validation: {
        headingIsValid,
        descriptionIsValid,
        entireFormIsValid: headingIsValid && descriptionIsValid,
      },

      // Insert the type (description or heading) as part of the new state
      [inputData.type]: inputData.value as string,
    };
  }

  const finalValue = inputData.value || state[inputData.type];

  return {
    ...state,
    status: 'IN_EDIT',
    validation: {
      headingIsValid,
      descriptionIsValid,
      entireFormIsValid: headingIsValid && descriptionIsValid,
    },

    feedback: {
      headingMessage: inputData.type === 'heading' ? '' : state.feedback.headingMessage,
      descriptionMessage: inputData.type === 'description' ? '' : state.feedback.descriptionMessage,
      submitMessage: '',
      isVisible: true,
    },
    [inputData.type]: finalValue,
  };
};

export const generateInputValidationMessage = (type: InputType | 'form', input: string): string => {
  const isInputHeading = type === 'heading';

  if (isInputHeading) {
    return isFormHeadingValid(input) ? invalidHeadingMessage : '';
  }

  return isFormDescriptionValid(input) ? invalidDescriptionMessage : '';
};
