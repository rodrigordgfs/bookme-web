import { FaSpinner, FaTrash } from "react-icons/fa";
import ServiceSelect from "../../ServiceSelect";
import { IoMdAdd } from "react-icons/io";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth";
import ServiceService from "../../../services/services";
import ProfissionalService from "../../../services/profissionals";
import { toast } from "react-toastify";

const ModaProfissionalServices = ({ profissional }) => {
  const { user } = useContext(AuthContext);

  const [services, setServices] = useState([]);
  const [serviceSelected, setServiceSelected] = useState(null);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingSavingService, setLoadingSavingService] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  const [profissionalServices, setProfissionalServices] = useState([]);

  const handleLoadingServices = useCallback(() => {
    setLoadingServices(true);
    ServiceService.getServices(user.token)
      .then(({ data }) => {
        setServices(data);
        setLoadingServices(false);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }, [user.token]);

  const handleServiceChange = (service) => {
    setServiceSelected(service);
  };

  const handleSaveProfissionalService = () => {
    setLoadingSavingService(true);
    ProfissionalService.postProfessionalService(
      profissional.id,
      serviceSelected.id,
      user.token
    )
      .then(({ data }) => {
        toast.success("Serviço adicionado ao profissional!");
        setProfissionalServices((prevServices) => {
            return [...prevServices, data];
          });
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(
          response?.data?.error ||
            "Erro ao adicionar o serviço ao profissional!"
        );
      })
      .finally(() => {
        setLoadingSavingService(false);
      });
  };

  const handleDeleteProfessionalService = (serviceId, service) => {
    console.log('service', service);
    
    setDeletingServiceId(serviceId);
    ProfissionalService.deleteProfessionalService(
      profissional.id,
      serviceId,
      user.token
    )
      .then(() => {
        toast.success("Serviço removido com sucesso!");
        setProfissionalServices((prevServices) => {
          return prevServices.filter((service) => service.service.id !== serviceId);
        });
      })
      .catch(({ response }) => {
        toast.error(response?.data?.error || "Erro ao remover o serviço!");
      })
      .finally(() => {
        setDeletingServiceId(null);
      });
  };

  useEffect(() => {
    handleLoadingServices();
  }, [handleLoadingServices]);

  useEffect(() => {
    if (profissional?.ProfessionalService) {
      setProfissionalServices(profissional.ProfessionalService);
    }
  }, [profissional]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2">
        <ServiceSelect
          services={services}
          onChange={handleServiceChange}
          loading={loadingServices}
          disabled={loadingServices}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/4 disabled:cursor-not-allowed disabled:bg-blue-300"
          onClick={handleSaveProfissionalService}
          disabled={!serviceSelected || loadingSavingService}
        >
          {loadingSavingService ? (
            <FaSpinner className="animate-spin mx-auto" />
          ) : (
            <IoMdAdd className="mx-auto text-white h-6 w-6" />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {profissionalServices.length === 0
          ? <div className="text-center text-zinc-500 my-6">Nenhum serviço adicionado</div>
          : profissionalServices.map((service) => (
              <div
                key={service.id}
                className="flex items-start gap-2 px-4 py-2 hover:bg-zinc-50"
              >
                <div className="flex-1">
                  <span className="font-semibold">
                    {service?.service?.name}
                  </span>
                  <p className="text-sm text-zinc-500">
                    {service?.service?.description}
                  </p>
                  <span className="text-sm text-green-600">
                    R$ {service?.service?.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-center h-full">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    disabled={deletingServiceId === service.service.id}
                    onClick={() =>
                      handleDeleteProfessionalService(service.service.id, service)
                    }
                  >
                    {deletingServiceId === service.service.id ? (
                      <FaSpinner className="animate-spin mx-auto" />
                    ) : (
                      <FaTrash className="mx-auto text-white h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
        {}
      </div>
    </div>
  );
};

export default ModaProfissionalServices;
