import { useCallback, useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import UserSelect from "../UserSelect";
import UserService from "../../services/user";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import Button from "../Button";
import moment from "moment";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotoSelector from "../PhotoSelector";
import InputField from "../InputField";
import SelectField from "../SelectField";

const schema = z.object({
  photo: z.string().optional(),
  userSelect: z
    .object({
      id: z.string().min(1, "Selecione um usuário válido"),
    })
    .refine((data) => data.id !== undefined, {
      message: "O campo usuário é obrigatório",
    }),
  phone: z.string().min(10, "O telefone deve ter pelo menos 10 dígitos"),
  birthDate: z.preprocess(
    (input) => {
      if (typeof input === "string" || input instanceof Date) {
        const date = new Date(input);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    },
    z.date().refine((date) => date <= new Date(), {
      message: "A data de nascimento não pode ser no futuro",
    })
  ),
  gender: z.enum(["M", "F", "O"], {
    errorMap: () => ({ message: "Selecione um gênero válido" }),
  }),
});

const ModalClient = ({ isModalOpen, handleCloseModal, client }) => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

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
      phone: "",
      birthDate: "",
      gender: "",
    },
  });

  const handleImageChange = (photo) => {
    setValue("photo", photo);
  };

  const closeModal = () => {
    handleCloseModal();
    setUserSelected(null);
    reset();
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
        if (response?.data?.error) {
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao buscar os usuário!");
        }
      });
  }, [user.token]);

  const handleSaveCliente = ({
    userSelect,
    photo,
    phone,
    birthDate,
    gender,
  }) => {
    setLoading(true);
    UserService.postClient(
      {
        id_user: userSelect.id,
        photo,
        phone,
        birthDate,
        gender,
      },
      user.token
    )
      .then(() => {
        toast.success("Cliente cadastrado com sucesso!");
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

  const handleEditCliente = ({
    userSelect,
    photo,
    phone,
    birthDate,
    gender,
  }) => {
    setLoading(true);
    UserService.patchClient(
      client.id,
      {
        id_user: userSelect.id,
        photo,
        phone,
        birthDate,
        gender,
      },
      user.token
    )
      .then(() => {
        toast.success("Cliente editado com sucesso!");
        closeModal();
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao editar o cliente!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleLoadUsers();
  }, [handleLoadUsers]);

  useEffect(() => {
    if (client) {
      setValue("userSelect", client.user);
      setUserSelected(client.user);
      setValue("photo", client.photo);
      setValue("phone", client.phone);
      setValue("birthDate", moment(client.birthDate).format("YYYY-MM-DD"));
      setValue("gender", client.gender);
    } else {
      reset();
      setUserSelected(null);
    }
  }, [client, setValue, reset]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={client ? "Editar Cliente" : "Novo Cliente"}
      subtitle={
        client ? "Edite os dados do cliente" : "Preencha os dados do cliente"
      }
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(client ? handleEditCliente : handleSaveCliente)}
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
            disabled={client || loadingUsers || loading}
            userSelected={userSelected}
          />
          {errors.userSelect && (
            <p className="text-xs text-red-500 mt-1">
              {errors.userSelect.id.message}
            </p>
          )}
        </div>

        <InputField
          id="phone"
          label="Telefone"
          loading={loading}
          placeholder="Digite o telefone"
          hasError={errors?.phone}
          errorMessage={errors?.phone?.message}
          register={register}
        />

        <InputField
          id="birthDate"
          label="Data de Nascimento"
          type="date"
          loading={loading}
          hasError={errors?.birthDate}
          errorMessage={errors?.birthDate?.message}
          register={register}
        />

        <SelectField
          id="gender"
          label="Gênero"
          loading={loading}
          hasError={errors?.gender}
          errorMessage={errors?.gender?.message}
          options={[
            { value: "", label: "Selecione o Gênero" },
            { value: "M", label: "Masculino" },
            { value: "F", label: "Feminino" },
            { value: "O", label: "Outro" },
          ]}
          register={register}
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
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            variant="success"
            size="fit"
          >
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalClient;
