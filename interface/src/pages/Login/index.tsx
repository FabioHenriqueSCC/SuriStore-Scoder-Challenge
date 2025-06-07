import { useState } from "react";
import type { FC } from "react";
import { Paper, Container, SegmentedControl } from "@mantine/core";
import type { UserData } from "../../types/user";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useUserContext } from "../../contexts/UserContext.tsx/UserContext";
import { toast } from "react-toastify";
import { postUserAuth } from "../../services/storeApi";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const { userData, setUserData } = useUserContext();

  const [view, setView] = useState<"register" | "login">("login");

  const navigate = useNavigate();

  const handleRegisterSubmit = (userInfos: UserData) => {
    setUserData(userInfos);
    handleLoginSubmit(userInfos);
  };

  const handleLoginSubmit = async (userInfos: UserData | null) => {
    if (userInfos === null) {
      toast.warning("Cadastre-se na toca!", { autoClose: 5000 });
      setView("register")
      return;
    }

    const loginInfos = {
      username: userInfos.username,
      password: userInfos.password,
    };

    try {
      const apiResponse = await postUserAuth(loginInfos);
      const token = apiResponse.data.token;

      localStorage.setItem("token", token);

      navigate("/");

      toast.success(
        "Bem vindo a SuriStore! Estamos felizes em receber você na toca!",
        { autoClose: 5000 }
      );
    } catch {
      toast.error(
        "Ocorreu um erro ao realizar a sua autenticação. Tente novamente mais tarde!",
        { autoClose: 5000 }
      );
    }
  };

  return (
    <Container size={580} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <SegmentedControl
          value={view}
          onChange={(value) => setView(value as "register" | "login")}
          data={[
            { label: "Já sou um Suricoder", value: "login" },
            { label: "Entrar para o bando", value: "register" },
          ]}
          fullWidth
          size="md"
          mb="xl"
          color="#573FAE"
        />

        {view === "register" ? (
          <RegisterForm onRegister={handleRegisterSubmit} />
        ) : (
          <LoginForm onLogin={() => handleLoginSubmit(userData)} />
        )}
      </Paper>
    </Container>
  );
};

export default Login;
