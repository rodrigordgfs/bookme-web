import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import ServiceService from "../../services/services";
import ModalService from "../../components/ModalService/inde";
import Header from "../../components/Header";
import ServiceTable from "../../components/ServiceTable";
import FilterServices from "../../components/FilterServices";
import ServiceTableSkeleton from "../../components/ServiceTableSkeleton";

const ServicesPage = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleCloseModal = () => {
    handleLoadServices();
    setIsModalOpen(false);
  };

  const handleNewService = () => {
    setIsModalOpen(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleLoadServices = useCallback(
    (name, price, duration) => {
      setLoadingServices(true);
      ServiceService.getServices(user.token, {
        name: name || undefined,
        price: price || undefined,
        duration: duration || undefined,
      })
        .then(({ data }) => {
          setServices(data);
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
    handleLoadServices();
  }, [handleLoadServices]);

  return (
    <div className="flex flex-col w-full max-w-full p-4">
      <Header
        title="Serviços"
        subtitle="Visualize todos os seus serviços"
        actionTitle="Novo Serviço"
        onAction={handleNewService}
      />

      <FilterServices
        onFilter={(value) =>
          handleLoadServices(value?.name, value?.price, value?.duration)
        }
        loading={loadingServices}
      />

      {loadingServices ? (
        <ServiceTableSkeleton />
      ) : (
        <ServiceTable services={services} onClickService={handleEditService} />
      )}

      <ModalService
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        service={selectedService}
      />
    </div>
  );
};

export default ServicesPage;
