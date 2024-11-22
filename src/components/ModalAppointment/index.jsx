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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SelectField from "../SelectField";
import Button from "../Button";
import moment from "moment";

const schema = z.object({
  status: z
    .enum(["pending", "confirmed", "completed", "canceled"], {
      errorMap: () => ({ message: "Selecione um status válido" }),
    }).optional(),
  clientSelected: z
    .object({
      id: z.string().min(1, "Selecione um cliente válido"),
    }),
  profissionalSelected: z
    .object({
      id: z.string().min(1, "Selecione um profissional válido"),
    }),
  serviceSelected: z
    .object({
      id: z.string().min(1, "Selecione um serviço válido"),
    }),
  date: z.preprocess(
    (input) => {
      if (typeof input === "string" || input instanceof Date) {
        const date = new Date(input);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    },
    z.date().refine((date) => date < new Date(), {
      message: "A data do agendamento deve ser maior ou igual a data atual",
    })
  ),
  hour: z.string().min(1, "Selecione um horário válido"),
  observation: z.string().optional(),
});

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
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [profissionals, setProfissionals] = useState([]);
  const [loadingProfissionals, setLoadingProfissionals] = useState(false);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loading, setLoading] = useState(false);

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
      status: undefined,
      clientSelected: { id: "", user: { id: "", name: "", email: "" } },
      professionalSelected: { id: "", user: { id: "", name: "", email: "" } },
      serviceSelected: {
        id: "",
        service: { id: "", name: "", price: "", duration: "" },
      },
      date: "",
      hour: "",
      observation: "",
    },
  });

  const handleSaveAppointment = ({ clientSelected, serviceSelected, date, hour, observation }) => {
    setLoading(true);
    AppointmentService.postAppointment(
      {
        professionalServiceId: serviceSelected.id,
        clientId: clientSelected.id,
        dateTime: `${moment(date).format('YYYY-MM-DD')}T${hour}:00`,
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
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao criar o agendamento!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditAppointment = ({ clientSelected, serviceSelected, date, hour, observation, status }) => {
    setLoading(true);
    AppointmentService.patchAppointment(
      selectedAppointment.id,
      {
        professionalServiceId: serviceSelected.id,
        clientId: clientSelected.id,
        dateTime: `${moment(date).format('YYYY-MM-DD')}T${hour}:00`,
        status,
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
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao editar o agendamento!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoadClients = useCallback(() => {
    setLoadingClients(true);
    ClientService.getClients(user.token)
      .then(({ data }) => {
        setClients(data.data);
        setLoadingClients(false);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao buscar os clientes!");
        }
      });
  }, [user.token]);

  const handleLoadProfissionals = useCallback(() => {
    setLoadingProfissionals(true);
    ProfissionalsService.getProfissionals(user.token)
      .then(({ data }) => {
        setProfissionals(data.data);
        setLoadingProfissionals(false);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
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
            toast.error(response.data.error);
          } else if (response?.data?.error[0]) {
            toast.error(response.data.error[0].message);
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
    console.log(selectedAppointment);
    if (selectedAppointment) {
      handleLoadProfessionalServices(
        selectedAppointment.professional.id,
        selectedAppointment.service
      );
      setValue("status", selectedAppointment.status);
      setValue("clientSelected", selectedAppointment.client);
      setSelectedClient(selectedAppointment.client);
      setValue("professionalSelected", selectedAppointment.professional);
      setSelectedProfissional(selectedAppointment.professional);
      setValue("service", selectedAppointment.service);
      setSelectedProfissionalService(selectedAppointment.service);
      setValue("date", selectedAppointment.date);
      setValue("hour", selectedAppointment.hour);
      setValue("observation", selectedAppointment.observation);
    } else {
      reset();
    }
  }, [selectedAppointment, handleLoadProfessionalServices, reset, setValue]);

  useEffect(() => {
    console.log('profissional', getValues('clientSelected'));
    console.log('error', errors);
    
    console.log(errors);
  }, [errors, getValues]);

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
          onSubmit={handleSubmit(
            selectedAppointment ? handleEditAppointment : handleSaveAppointment
          )}
        >
          {selectedAppointment && (
            <SelectField
              id="status"
              label="Status"
              name="status"
              register={register}
              error={errors.status}
              options={[
                { value: "pending", label: "Pendente" },
                { value: "confirmed", label: "Confirmado" },
                { value: "completed", label: "Completo" },
                { value: "canceled", label: "Cancelado" },
              ]}
              disabled={loading}
            />
          )}
          <div className="flex flex-col">
            <p>Cliente</p>
            <ClientSelect
              clients={clients}
              onChange={(selectedCliente) => {
                setValue("clientSelected", selectedCliente);
                trigger("clientSelected");
              }}
              loading={loadingClients}
              disabled={loadingClients || loading}
              clientSelected={selectedClient}
            />
            {errors.clientSelected && (
              <p className="text-xs text-red-500 mt-1">
                {errors.clientSelected.id.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <p>Profissional</p>
            <ProfissionalSelect
              professionals={profissionals}
              onChange={(selectedProfissional) => {
                setValue("profissionalSelected", selectedProfissional);
                trigger("profissionalSelected");
                handleLoadProfessionalServices(selectedProfissional.id);
              }}
              loading={loadingProfissionals}
              disabled={loadingProfissionals || loading}
              professionalSelected={selectedProfissional}
            />
            {errors.profissionalSelected && (
              <p className="text-xs text-red-500 mt-1">
                {errors.profissionalSelected.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <p>Serviços</p>
            <ServiceSelect
              services={services}
              onChange={(selectedService) => {
                setValue("serviceSelected", selectedService);
                trigger("serviceSelected");
              }}
              disabled={!getValues('profissionalSelected')?.id || loading}
              loading={loadingServices}
              serviceSelected={selectedProfissionalService}
            />
            {errors.serviceSelected && (
              <p className="text-xs text-red-500 mt-1">
                {errors.serviceSelected.message}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 relative">
              <p>Data</p>
              <input
                type="date"
                className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg pr-10"
                disabled={loading}
                {...register("date")}
              />
              {errors.date && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1 relative">
              <p>Hora</p>
              <input
                type="time"
                className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg pr-10"
                disabled={loading}
                {...register("hour")}
              />
              {errors.hour && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.hour.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <p>Observações</p>
            <textarea
              className="w-full h-24 px-4 py-2 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg"
              placeholder="Digite aqui as observações sobre o agendamento"
              disabled={loading}
              {...register("observation")}
            />
          </div>
          <div className="mt-4 gap-2 flex justify-end">
            <Button
              onClick={onClose}
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
      </div>
    </Modal>
  );
};

export default ModalAppointment;
