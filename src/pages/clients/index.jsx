import { useCallback, useContext, useEffect, useState } from "react";
import ModalClient from "../../components/ModalClient";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import ClientService from "../../services/clients";
import Header from "../../components/Header";
import ClientTable from "../../components/ClientTable";
import ClientTableSkeleton from "../../components/ClientTableSkeleton";
import FilterClients from "../../components/FilterClients";

const ClientsPage = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCloseModal = () => {
    handleLoadClients();
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  const handleNewClient = () => {
    setIsModalOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleLoadClients = useCallback(
    (name, email, phone) => {
      setLoadingClients(true);
      ClientService.getClients(user.token, {
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
      })
        .then(({ data }) => {
          setClients(data);
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
          setLoadingClients(false);
        });
    },
    [user.token]
  );

  useEffect(() => {
    handleLoadClients();
  }, [handleLoadClients]);

  return (
    <div className="flex flex-col w-full max-w-full p-4">
      <Header
        title="Clientes"
        subtitle="Visualize todos os seus clientes"
        actionTitle="Novo Cliente"
        onAction={handleNewClient}
      />

      <FilterClients
        onFilter={(value) =>
          handleLoadClients(value?.name, value?.email, value?.phone)
        }
        loading={loadingClients}
      />

      {loadingClients ? (
        <ClientTableSkeleton />
      ) : (
        <ClientTable clients={clients} onClickClient={handleEditClient} />
      )}

      <ModalClient
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        client={selectedClient}
      />
    </div>
  );
};

export default ClientsPage;
