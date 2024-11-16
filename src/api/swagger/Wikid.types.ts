export const teamId = '3';

export type signInUpResponseData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: number;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  profile: null;
  email: string;
};

export type signInRequestProps = {
  email: string;
  password: string;
};

export type signUpRequestProps = signInRequestProps & {
  name: string;
  passwordConfirmation: string;
};
