import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, { message: "Nome completo é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "A confirmação de senha deve ter pelo menos 6 caracteres" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
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
          <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Nome completo"
              className={`w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border ${errors.name ? "border-red-500" : "border-zinc-300"} outline-none rounded-lg flex items-center gap-2`}
              disabled={loading}
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="E-mail"
              className={`w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border ${errors.email ? "border-red-500" : "border-zinc-300"} outline-none rounded-lg flex items-center gap-2`}
              disabled={loading}
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

            <input
              type="password"
              placeholder="Senha"
              className={`w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border ${errors.password ? "border-red-500" : "border-zinc-300"} outline-none rounded-lg flex items-center gap-2`}
              disabled={loading}
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

            <input
              type="password"
              placeholder="Confirme sua senha"
              className={`w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border ${errors.confirmPassword ? "border-red-500" : "border-zinc-300"} outline-none rounded-lg flex items-center gap-2`}
              disabled={loading}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}

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
            Já tem uma conta{" "}
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
