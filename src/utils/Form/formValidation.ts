import { FeedbackStatus, FormStatus, FormValidation, NoteFormState } from '../../models/form';
import { noFeedback } from './form';

type TextInputValidator = (textInput: string | undefined) => boolean;
type StatusColor = (formStatus: FormStatus) => FeedbackStatus;

type InputData = {
  type: 'heading' | 'description';
  value: string | undefined;
};

type InputValidator = (
  state: NoteFormState,
  inputData: InputData,
  feedbackMessage: string
) => NoteFormState;

type FullFormValidationData = {
  heading: string;
  description: string;
};

type FullFormValidation = (data: FullFormValidationData) => boolean;

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
  return heading !== undefined && heading.length > 5;
};

export const isFormDescriptionValid: TextInputValidator = description => {
  return description !== undefined && description.length > 20;
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

export const validateTextInput: InputValidator = (state, inputData, feedbackMessage) => {
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
        message: feedbackMessage,
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
    feedback: noFeedback,
    [inputData.type]: finalValue,
  };
};
