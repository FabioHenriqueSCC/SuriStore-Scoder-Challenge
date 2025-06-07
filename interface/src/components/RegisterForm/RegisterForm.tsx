import {
  TextInput,
  Grid,
  Select,
  Box,
  Input,
  Button,
  Title,
  Text,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IMaskInput } from "react-imask";

import type { RegisterFormProps, UserData } from "../../types/user";
import type { FC } from "react";

const RegisterForm: FC<RegisterFormProps> = ({ onRegister }) => {
  const form = useForm<UserData & { confirmPassword: string }>({
    mode: "uncontrolled",
    initialValues: {
      document: "",
      phone: "",
      firstName: "",
      lastName: "",
      username: "",
      gender: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstName: (value) =>
        value.trim().length === 0 ? "O nome é obrigatório" : null,
      lastName: (value) =>
        value.trim().length === 0 ? "O sobrenome é obrigatório" : null,
      username: (value) =>
        value.trim().length < 3
          ? "O nome de usuário deve ter pelo menos 3 caracteres"
          : null,
      password: (value) =>
        value.length < 8 ? "A senha deve ter pelo menos 8 caracteres" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "As senhas não coincidem" : null,
      gender: (value) => (value.length === 0 ? "Selecione seu gênero" : null),
      birthDate: (value) =>
        value.length < 10
          ? "Informe a data de nascimento para continuar"
          : null,
      document: (value) =>
        value.length < 14 ? "Informe um CPF para continuar" : null,
      phone: (value) => (value.length < 15 ? "Informe o telefone" : null),
    },
  });

  return (
    <Box>
      <Title order={2} ta="center" mt="xl">
        Vamos te cadastrar para entrar na toca
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        Vai ser rapidinho, prometo!
      </Text>

      <form onSubmit={form.onSubmit(({ ...userData }) => onRegister(userData))}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Nome"
              placeholder="Nome"
              required
              {...form.getInputProps("firstName")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Sobrenome"
              placeholder="Sobrenome"
              required
              {...form.getInputProps("lastName")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Nome de usuário"
              placeholder="Como você quer ser chamado?"
              required
              {...form.getInputProps("username")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PasswordInput
              label="Senha"
              placeholder="Crie sua senha"
              required
              {...form.getInputProps("password")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PasswordInput
              label="Confirme sua senha"
              placeholder="Confirme sua senha"
              required
              {...form.getInputProps("confirmPassword")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Input.Wrapper
              label="Informe seu CPF"
              required
              error={form.errors.document}
            >
              <Input
                component={IMaskInput}
                mask="000.000.000-00"
                placeholder="000.000.000-00"
                {...form.getInputProps("document")}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Input.Wrapper
              label="Telefone celular"
              required
              error={form.errors.phone}
            >
              <Input
                component={IMaskInput}
                mask="(00) 00000-0000"
                placeholder="(00) 99999-9999"
                {...form.getInputProps("phone")}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label="Gênero"
              placeholder="Selecione seu gênero"
              data={["Masculino", "Feminino", "Outro", "Prefiro não informar"]}
              required
              {...form.getInputProps("gender")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Input.Wrapper
              label="Data de nascimento"
              required
              error={form.errors.birthDate}
            >
              <Input
                component={IMaskInput}
                mask="00/00/0000"
                placeholder="DD/MM/AAAA"
                {...form.getInputProps("birthDate")}
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>

        <Button type="submit" fullWidth mt="xl" size="md" color="#573FAE">
          Continuar
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
