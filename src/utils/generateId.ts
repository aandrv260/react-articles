const generateId = (): string => {
  const randomNumber = Math.random().toString(36).substring(2) + new Date().getTime().toString(36);

  return randomNumber;
};

export default generateId;
