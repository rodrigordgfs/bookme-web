import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import ServiceService from "../../services/services";
import formatMoneyBRL from "../../utils/formatMoneyBRL";
import ModalService from "../../components/ModalService/inde";
import Header from "../../components/Header";


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

  const handleLoadServices = useCallback(() => {
    setLoadingServices(true);
    ServiceService.getServices(user.token)
      .then(({ data }) => {
        setServices(data);
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
  }, [user.token]);

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

      {/* Modo Desktop - Tabela */}
      <div className="hidden md:block mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Nome do Serviço
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Duração
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr
                key={service.id}
                className="hover:bg-zinc-50 transition-all cursor-pointer"
                onClick={() => handleEditService(service)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {service.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatMoneyBRL(service.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.duration} min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modo Mobile - Cards */}
      <div className="block md:hidden mt-6 space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
            onClick={() => handleEditService(service)}
          >
            <div>
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Preço:</span> {formatMoneyBRL(service.price)}
              </p>
              <p>
                <span className="font-medium">Duração:</span> {service.duration} min
              </p>
            </div>
          </div>
        ))}
      </div>

      <ModalService
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        service={selectedService}
      />
    </div>
  );
};

export default ServicesPage;
