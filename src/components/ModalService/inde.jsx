import { useState, useContext, useEffect } from "react";
import Modal from "../Modal";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import ServiceService from "../../services/services";

const ModalService = ({ isModalOpen, handleCloseModal, service }) => {
  const { user } = useContext(AuthContext);

  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    handleCloseModal();
    clearFields();
  };

  const clearFields = () => {
    setServiceName("");
    setDescription("");
    setPrice("");
    setDuration("");
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    setLoading(true);

    const newService = {
      name: serviceName,
      price: Number(price),
      duration: Number(duration),
      description,
    };

    ServiceService.postService(newService, user.token)
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

  const handleEditService = (e) => {
    e.preventDefault();
    setLoading(true);

    const editedService = {
      id: service.id,
      name: serviceName,
      price: Number(price),
      duration: Number(duration),
      description,
    };

    ServiceService.patchService(editedService, user.token)
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
      setServiceName(service.name);
      setDescription(service.description);
      setPrice(service.price);
      setDuration(service.duration);
    } else {
      clearFields();
    }
  }, [service]);

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
        onSubmit={service ? handleEditService : handleSaveService}
      >
        <div className="flex flex-col">
          <label htmlFor="serviceName" className="text-sm">
            Nome do Serviço
          </label>
          <input
            type="text"
            id="serviceName"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg"
            placeholder="Digite o nome do serviço"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm">
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-20 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg"
            placeholder="Digite a descrição do serviço"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm">
            Preço
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg"
            placeholder="Digite o preço"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="duration" className="text-sm">
            Duração (em minutos)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg"
            placeholder="Digite a duração"
            disabled={loading}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Salvar"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalService;
