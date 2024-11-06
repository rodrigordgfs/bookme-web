import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleGoToRegister = () => {
    navigate("/register");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <main className="w-full h-screen flex flex-row">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-96 w-full flex justify-center flex-col px-2">
          <img src="/logo-text.svg" alt="Logo BookMe" className="h-16" />
          <h2 className="font-medium text-lg text-center mt-3 leading-6">
            Gerencie seus agendamentos de forma descomplicada.
          </h2>
          <p className="font-medium text-zinc-700 text-lg text-center mt-8">
            Acesse sua conta
          </p>
          <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                placeholder="E-mail"
                className={`w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 ${
                  errors.email ? "border-red-500 outline-none" : "border-zinc-300"
                }`}
                disabled={loading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Senha"
                className={`w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 outline-none border rounded-lg flex items-center gap-2 ${
                  errors.password ? "border-red-500 outline-none" : "border-zinc-300"
                }`}
                disabled={loading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-2 transition-all"
            >
              {loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                "Entrar"
              )}
            </button>
          </form>
          <p className="font-normal text-center mt-8">
            Não tenho uma conta{" "}
            <span
              onClick={handleGoToRegister}
              className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium transition-all"
            >
              Criar conta!
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

export default LoginPage;
