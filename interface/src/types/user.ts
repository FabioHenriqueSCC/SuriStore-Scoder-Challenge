export interface UserData {
  document: string;
  phone: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  birthDate: string;
  password: string;
}

export type LoginFormValues = {
  username: string;
  password: string;
};

export type LoginFormProps = {
  onLogin: (values: LoginFormValues) => void;
};

export type RegisterFormProps = {
  onRegister: (values: UserData) => void;
};
