import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <main className="w-full h-screen flex flex-row">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-96 w-full flex justify-center flex-col px-2">
          <img src="/logo-text.svg" alt="Logo BookMe" className="h-16" />
          <h2 className="font-medium text-lg text-center mt-3 leading-6">
            Crie sua conta agora mesmo.
          </h2>
          <p className="font-medium text-zinc-700 text-lg text-center mt-8">
            Preencha os campos abaixo
          </p>
          <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome completo"
              className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none border-zinc-300 rounded-lg flex items-center gap-2"
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail"
              className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none border-zinc-300 rounded-lg flex items-center gap-2"
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none border-zinc-300 rounded-lg flex items-center gap-2"
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirme sua senha"
              className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none border-zinc-300 rounded-lg flex items-center gap-2"
              disabled={loading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-2 transition-all"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                "Cadastrar"
              )}
            </button>
          </form>
          <p className="font-normal text-center mt-8">
            Já uma conta{" "}
            <span
              onClick={handleGoToLogin}
              className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium transition-all"
            >
              Acessar agora!
            </span>
          </p>
        </div>
      </div>
      <div className="w-1/2 max-w-full relative hidden md:block">
        <img
          src="/bg-login.jpg"
          alt="Imagem de fundo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-700 opacity-60"></div>
      </div>
    </main>
  );
};

export default RegisterPage;
