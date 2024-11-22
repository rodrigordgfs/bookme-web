import { useState, useContext, useEffect } from "react";
import Modal from "../Modal";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import ServiceService from "../../services/services";
import Button from "../Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";

const schema = z.object({
  name: z.string().min(3, "O nome do serviço deve ter pelo menos 3 caracteres"),
  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "O preço do serviço deve ser maior que 0",
    }),
  duration: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "A duração do serviço deve ser maior que 0",
    }),
  description: z
    .string()
    .min(3, "A descrição do serviço deve ter pelo menos 3 caracteres"),
});

const ModalService = ({ isModalOpen, handleCloseModal, service }) => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      duration: "",
      description: "",
    },
  });

  const closeModal = () => {
    handleCloseModal();
    reset();
  };

  const handleSaveService = ({ name, price, duration, description }) => {
    setLoading(true);

    ServiceService.postService(
      {
        name: name,
        description,
        price: Number(price),
        duration: Number(duration),
      },
      user.token
    )
      .then(() => {
        toast.success("Serviço cadastrado com sucesso!");
        closeModal();
      })
      .catch(({ response }) => {
        console.log(response.data.error);
        if (response?.data?.error) {
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao cadastrar o serviço!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditService = ({ name, price, duration, description }) => {
    setLoading(true);

    ServiceService.patchService(
      service.id,
      {
        name: name,
        description,
        price: Number(price),
        duration: Number(duration),
      },
      user.token
    )
      .then(() => {
        toast.success("Serviço editado com sucesso!");
        closeModal();
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao editar o serviço!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (service) {
      setValue("name", service.name);
      setValue("price", service.price);
      setValue("duration", service.duration);
      setValue("description", service.description);
    } else {
      reset();
    }
  }, [service, register, reset, setValue]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={service ? "Editar Serviço" : "Novo Serviço"}
      subtitle={
        service ? "Edite os dados do serviço" : "Preencha os dados do serviço"
      }
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(service ? handleEditService : handleSaveService)}
      >
        <InputField
          id="name"
          label="Nome do Serviço"
          placeholder="Digite o nome do serviço"
          register={register}
          disabled={loading}
          hasError={errors?.name}
          errorMessage={errors?.name?.message}
          loading={loading}
          type="text"
        />

        <InputField
          id="description"
          label="Descrição"
          placeholder="Digite a descrição do serviço"
          register={register}
          disabled={loading}
          hasError={errors?.description}
          errorMessage={errors?.description?.message}
          loading={loading}
          type="text"
        />

        <InputField
          id="price"
          label="Preço"
          placeholder="Digite o preço"
          register={register}
          disabled={loading}
          hasError={errors?.price}
          errorMessage={errors?.price?.message}
          loading={loading}
          type="number"
        />

        <InputField
          id="duration"
          label="Duração"
          placeholder="Digite a duração"
          register={register}
          disabled={loading}
          hasError={errors?.duration}
          errorMessage={errors?.duration?.message}
          loading={loading}
          type="number"
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
            loading={loading}
            disabled={loading}
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

export default ModalService;
