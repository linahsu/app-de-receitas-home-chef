export type InputsTypes = {
  email: string,
  password: string,
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const inputHaveFormatValid = (input: string) => input !== '';
const inputHaveEmailFormatValid = (input: string) => emailRegex.test(input);

const passHaveMinLength = (pass: string) => pass.length >= 7;

export const validatePasswordAndEmail = (types: InputsTypes) => {
  const inputFormatValid = inputHaveFormatValid(types.email)
  && inputHaveEmailFormatValid(types.email);

  const passFormatValid = passHaveMinLength(types.password);

  return passFormatValid && inputFormatValid;
};
