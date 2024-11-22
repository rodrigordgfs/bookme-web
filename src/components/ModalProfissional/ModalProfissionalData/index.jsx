import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserSelect from "../../UserSelect";
import { AuthContext } from "../../../contexts/auth";
import UserService from "../../../services/user";
import ProfissionalService from "../../../services/profissionals";
import Button from "../../Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotoSelector from "../../PhotoSelector";
import InputField from "../../InputField";

const schema = z.object({
  photo: z.string().optional(),
  userSelect: z
    .object({
      id: z.string().min(1, "Selecione um usuário válido"),
    })
    .refine((data) => data.id !== undefined, {
      message: "O campo usuário é obrigatório",
    }),
  specialty: z
    .string()
    .min(3, "A especialidade deve ter pelo menos 3 caracteres"),
});

export const ModalProfissionalData = ({ profissional, closeModal }) => {
  const { user } = useContext(AuthContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      userSelect: { id: "", name: "", email: "" },
      photo: "",
      specialty: "",
    },
  });

  const handleImageChange = (photo) => {
    setValue("photo", photo);
  };

  const handleLoadUsers = useCallback(() => {
    setLoadingUsers(true);
    UserService.getUsers(user.token)
      .then(({ data }) => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response?.data?.error || "Erro ao buscar os usuários!");
      });
  }, [user.token]);

  useEffect(() => {
    handleLoadUsers();
  }, [handleLoadUsers]);

  const handleSaveProfissional = ({ userSelect, specialty, photo }) => {
    setLoading(true);
    ProfissionalService.postProfessional(
      {
        id_user: userSelect.id,
        photo,
        specialty,
      },
      user.token
    )
      .then(() => {
        toast.success("Profissional cadastrado com sucesso!");
        closeModal();
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao cadastrar o cliente!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditProfissional = ({ userSelect, specialty, photo }) => {
    setLoading(true);
    ProfissionalService.patchProfessional(
      profissional.id,
      {
        id_user: userSelect.id,
        photo,
        specialty,
      },
      user.token
    )
      .then(() => {
        toast.success("Profissional editado com sucesso!");
        closeModal();
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response?.data?.error || "Erro ao editar o profissional!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (profissional) {
      setValue("userSelect", profissional.user);
      setSelectedUser(profissional.user);
      setValue("specialty", profissional.specialty);
      setValue("photo", profissional.photo);
    } else {
      reset();
    }
  }, [profissional, reset, setValue]);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(
        profissional ? handleEditProfissional : handleSaveProfissional
      )}
    >
      <PhotoSelector
        loading={loading}
        onSelect={handleImageChange}
        photo={getValues("photo")}
      />

      <div className="flex flex-col">
        <p>Usuário</p>
        <UserSelect
          users={users}
          onChange={(selectedUser) => {
            setValue("userSelect", selectedUser);
            trigger("userSelect");
          }}
          loading={loadingUsers}
          disabled={profissional || loadingUsers || loading}
          userSelected={selectedUser}
        />
        {errors.userSelect && (
          <p className="text-xs text-red-500 mt-1">
            {errors.userSelect.id.message}
          </p>
        )}
      </div>

      <InputField
        id="specialty"
        label="Especialidade"
        placeholder="Digite a especialidade"
        register={register}
        disabled={loading}
        hasError={errors?.specialty}
        errorMessage={errors?.specialty?.message}
        loading={loading}
        type="text"
      />

      <div className="mt-4 gap-2 flex justify-end">
        <Button
          onClick={closeModal}
          disabled={loading}
          variant="danger"
          size="fit"
        >
          Cancelar
        </Button>
        <Button type="submit" loading={loading} disabled={loading} variant="success" size="fit">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default ModalProfissionalData;
