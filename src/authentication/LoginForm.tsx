import { useEffect, useState } from "react";
import FormRowVertical from "../ui/FormRowVertical";
import Input from "../ui/Input";
import Form from "../ui/Form";
import Button from "../ui/Button";
import { useLoginMutation } from "../services/apiAuth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Переноси создание ErrorWarning сюда, чтобы не пересоздавать его каждый раз
const ErrorWarning = styled.p`
  color: red;
`;

function LoginForm() {
  const [email, setEmail] = useState<string>("luxemusicadmin@luxmail.net");
  const [password, setPassword] = useState<string>("123123123");

  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await login({ email, password });

    if ("error" in res) {
      console.error("Login error:", res.error);
    } else {
      navigate("/dashboard");
      toast.success("Login success");
    }
  }
  useEffect(() => {
    if (error && "status" in error && typeof error.data === "string") {
      toast.error("Login error: " + (error?.data || "unknown error"));
    }
  }, [error]);
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          $error={error && "status" in error && typeof error.data === "string"}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          $error={error && "status" in error && typeof error.data === "string"}
        />
      </FormRowVertical>

      {error && "status" in error && typeof error.data === "string" && (
        <ErrorWarning>{error.data}</ErrorWarning>
      )}

      <FormRowVertical>
        <Button $size="large" $variations="primary" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
