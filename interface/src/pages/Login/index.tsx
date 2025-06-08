import { useState } from "react";
import { Paper, Container, SegmentedControl } from "@mantine/core";
import type { UserData } from "../../types/user";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useUserContext } from "../../contexts/UserContext.tsx/UserContext";
import { toast } from "react-toastify";
import { postUserAuth } from "../../services/storeApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const { userData, setUserData } = useUserContext();

  const [view, setView] = useState<"register" | "login">("login");

  const navigate = useNavigate();

  /**
   * Handles the user registration submission and login.
   *
   * This function sets the user data in the state after registration and then immediately triggers the login process using the provided `userInfos`.
   *
   * @param {UserData} userInfos - The user data obtained from the registration form.
   *
   * @returns {void} No value is returned. The function updates the user data and triggers the login process.
   */
  const handleRegisterSubmit = (userInfos: UserData) => {
    setUserData(userInfos);
    handleLoginSubmit(userInfos);
  };

  /**
   * Handles the login submission process.
   *
   * This function checks if the `userInfos` is provided. If it is `null`, the user is prompted to register.
   * If valid `userInfos` are provided, the function attempts to authenticate the user using the `postUserAuth` API call.
   * If authentication is successful, the returned token is saved in `localStorage`, and the user is redirected to the homepage.
   * If authentication fails, an error toast is displayed.
   *
   * @param {UserData | null} userInfos - The user data for login, or `null` if the user needs to register.
   *
   * @returns {void} No value is returned. The function updates the state, navigates to the homepage, and handles toasts.
   */
  const handleLoginSubmit = async (userInfos: UserData | null) => {
    if (userInfos === null) {
      toast.warning("Cadastre-se na toca!", { autoClose: 5000 });
      setView("register");
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
}

export default Login;
