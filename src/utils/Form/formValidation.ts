import { FeedbackStatus, FormStatus, NoteFormState } from '../../models/form';
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

const isFormHeadingValid: TextInputValidator = heading => {
  return heading !== undefined && heading.length > 5;
};

const isFormDescriptionValid: TextInputValidator = description => {
  return description !== undefined && description.length > 20;
};

export const entireFormIsValid: FullFormValidation = ({ heading, description }) => {
  return isFormHeadingValid(heading) && isFormDescriptionValid(description);
};

export const validateTextInput: InputValidator = (state, inputData, feedbackMessage) => {
  const isInputHeading = inputData.type === 'heading';
  const isInputValid = isInputHeading ? isFormHeadingValid : isFormDescriptionValid;

  if (!isInputValid(inputData.value)) {
    return {
      ...state,
      status: 'VALIDATION_ISSUE',
      formIsValid: false,
      feedback: {
        message: feedbackMessage,
        isVisible: true,
      },
      [inputData.type]: inputData.value as string,
    };
  }

  const finalValue = inputData.value || state[inputData.type];

  return {
    ...state,
    status: 'IN_EDIT',
    formIsValid: entireFormIsValid({
      heading: isInputHeading ? finalValue : state.heading,
      description: !isInputHeading ? finalValue : state.description,
    }),
    feedback: noFeedback,
    [inputData.type]: finalValue,
  };
};
