import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import ClientSelect from "../ClientSelect";
import Modal from "../Modal";
import ProfissionalSelect from "../ProfissionalSelect";
import ServiceSelect from "../ServiceSelect";
import ClientService from "../../services/clients";
import ProfissionalsService from "../../services/profissionals";
import AppointmentService from "../../services/appointment";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const ModalAppointment = ({
  isModalOpen,
  onClose,
  handleCloseModal,
  selectedAppointment,
}) => {
  const { user } = useContext(AuthContext);

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProfissional, setSelectedProfissional] = useState(null);
  const [selectedProfissionalService, setSelectedProfissionalService] =
    useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [observation, setObservation] = useState("");
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [profissionals, setProfissionals] = useState([]);
  const [loadingProfissionals, setLoadingProfissionals] = useState(false);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveAppointment = (e) => {
    e.preventDefault();
    setLoading(true);
    AppointmentService.postAppointment(
      {
        professionalServiceId: selectedProfissionalService.id,
        clientId: selectedClient.id,
        dateTime: `${selectedDate}T${selectedTime}:00`,
        observation,
      },
      user.token
    )
      .then(() => {
        toast.success("Agendamento criado com sucesso!");
        handleCloseModal();
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          return toast.error(response.data.error);
        } else {
          toast.error("Erro ao criar o agendamento!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditAppointment = (e) => {
    e.preventDefault();
    setLoading(true);
    AppointmentService.patchAppointment(
      selectedAppointment.id,
      {
        professionalServiceId: selectedProfissionalService.id,
        clientId: selectedClient.id,
        dateTime: `${selectedDate}T${selectedTime}:00`,
        observation,
      },
      user.token
    )
      .then(() => {
        toast.success("Agendamento editado com sucesso!");
        handleCloseModal();
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          return toast.error(response.data.error);
        } else {
          toast.error("Erro ao editar o agendamento!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClientChange = (client) => {
    setSelectedClient(client);
  };

  const handleProfissionalChange = (profissional) => {
    setSelectedProfissional(profissional);
    handleLoadProfessionalServices(profissional.id);
  };

  const handleServiceChange = (service) => {
    setSelectedProfissionalService(service);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleLoadClients = useCallback(() => {
    setLoadingClients(true);
    ClientService.getClients(user.token)
      .then(({ data }) => {
        setClients(data);
        setLoadingClients(false);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          return toast.error(response.data.error);
        } else {
          toast.error("Erro ao buscar os clientes!");
        }
      });
  }, [user.token]);

  const handleLoadProfissionals = useCallback(() => {
    setLoadingProfissionals(true);
    ProfissionalsService.getProfissionals(user.token)
      .then(({ data }) => {
        setProfissionals(data);
        setLoadingProfissionals(false);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          return toast.error(response.data.error);
        } else {
          toast.error("Erro ao buscar os profissionais!");
        }
      });
  }, [user.token]);

  const handleLoadProfessionalServices = useCallback(
    (professionalId, professionalService = null) => {
      setLoadingServices(true);
      ProfissionalsService.getProfessionalServices(professionalId, user.token)
        .then(({ data }) => {
          setServices(data);
          if (professionalService) {
            setSelectedProfissionalService(professionalService);
          }
          setLoadingServices(false);
        })
        .catch(({ response }) => {
          console.log(response);
          if (response?.data?.error) {
            return toast.error(response.data.error);
          } else {
            toast.error("Erro ao buscar os serviços!");
          }
        });
    },
    [user.token]
  );

  useEffect(() => {
    handleLoadClients();
    handleLoadProfissionals();
  }, [handleLoadClients, handleLoadProfissionals]);

  useEffect(() => {
    if (selectedAppointment) {
      handleLoadProfessionalServices(
        selectedAppointment.professional.id,
        selectedAppointment.service
      );
      setSelectedClient(selectedAppointment.client);
      setSelectedProfissional(selectedAppointment.professional);
      setSelectedDate(selectedAppointment.date);
      setSelectedTime(selectedAppointment.hour);
      setObservation(selectedAppointment.observation || "");
    } else {
      setSelectedClient(null);
      setSelectedProfissional(null);
      setSelectedProfissionalService(null);
      setSelectedDate("");
      setSelectedTime("");
      setObservation("");
    }
  }, [selectedAppointment, handleLoadProfessionalServices]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={selectedAppointment ? "Editar Agendamento" : "Novo Agendamento"}
      subtitle={
        selectedAppointment
          ? "Edite os dados do agendamento"
          : "Preencha os dados do agendamento"
      }
    >
      <div>
        <form
          className="flex flex-col gap-2"
          onSubmit={
            selectedAppointment ? handleEditAppointment : handleSaveAppointment
          }
        >
          <div className="flex flex-col">
            <p>Cliente</p>
            <ClientSelect
              clients={clients}
              onChange={handleClientChange}
              loading={loadingClients}
              disabled={loadingClients || loading}
              clientSelected={selectedClient}
            />
          </div>
          <div className="flex flex-col">
            <p>Profissional</p>
            <ProfissionalSelect
              professionals={profissionals}
              onChange={handleProfissionalChange}
              loading={loadingProfissionals}
              disabled={loadingProfissionals || loading}
              professionalSelected={selectedProfissional}
            />
          </div>
          <div className="flex flex-col">
            <p>Serviços</p>
            <ServiceSelect
              services={services}
              onChange={handleServiceChange}
              disabled={selectedProfissional === null || loading}
              loading={loadingServices}
              serviceSelected={selectedProfissionalService}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 relative">
              <p>Data</p>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg pr-10"
                disabled={loading || selectedProfissionalService === null}
              />
            </div>
            <div className="flex flex-col flex-1 relative">
              <p>Hora</p>
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg pr-10"
                disabled={selectedDate === "" || loading}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p>Observações</p>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="w-full h-24 px-4 py-2 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg"
              placeholder="Digite aqui as observações sobre o agendamento"
              disabled={loading}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
      </div>
    </Modal>
  );
};

export default ModalAppointment;
