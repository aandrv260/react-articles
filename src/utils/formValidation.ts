import { FeedbackStatus, FormStatus } from '../models/form';

type HeadingValidator = (heading: string) => boolean;
type DescriptionValidator = (description: string) => boolean;
type StatusColor = (formStatus: FormStatus) => FeedbackStatus;

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

export const isFormHeadingValid: HeadingValidator = heading => {
  return heading.length > 5;
};

export const isFormDescriptionValid: DescriptionValidator = (description: string) => {
  return description.length > 20;
};

export const entireFormIsValid: FullFormValidation = ({ heading, description }) => {
  return isFormHeadingValid(heading) && isFormDescriptionValid(description);
};
