import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import type { FC } from "react";
import type { LoginFormProps, LoginFormValues } from "../../types/user";

/**
 * LoginForm component for handling user login.
 * 
 * This component renders a form for user login with fields for:
 * - Username
 * - Password
 * 
 * It uses the `useForm` hook from Mantine to handle form validation and submission.
 * The form is validated to ensure both the username and password are provided before submission.
 * Upon successful form submission, the `onLogin` callback is triggered.
 * 
 * @param {LoginFormProps} props - The properties passed to the component.
 * @param {function} props.onLogin - A callback function that is called upon form submission.
 * 
 * @returns {JSX.Element} The rendered login form.
 * 
 * @example
 * // Example usage:
 * // <LoginForm onLogin={handleLogin} />
 */
const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
  const form = useForm<LoginFormValues>({
    mode: "uncontrolled",
    initialValues: { username: "", password: "" },
    validate: {
      username: (value) =>
        value.trim().length === 0
          ? "Por favor, informe seu nome de usuário"
          : null,
      password: (value) =>
        value.length === 0 ? "Por favor, informe sua senha" : null,
    },
  });

  return (
    <Box>
      <Title order={2} ta="center" mt="xl">
        Bem-vindo de volta, Suricoder!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        Faça o login para voltar para a toca.
      </Text>
      <form onSubmit={form.onSubmit(onLogin)}>
        <TextInput
          label="Nome de usuário"
          placeholder="Seu nome de usuário"
          required
          {...form.getInputProps("username")}
        />
        <PasswordInput
          label="Senha"
          placeholder="Sua senha"
          required
          mt="md"
          {...form.getInputProps("password")}
        />
        <Button type="submit" fullWidth mt="xl" size="md" color="#573FAE">
          Entrar
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
