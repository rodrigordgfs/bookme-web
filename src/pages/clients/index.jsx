import { useCallback, useContext, useEffect, useState } from "react";
import ModalClient from "../../components/ModalClient";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import ClientService from "../../services/clients";
import Header from "../../components/Header";
import ClientTable from "../../components/ClientTable";
import ClientCards from "../../components/ClientCards";

const ClientsPage = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCloseModal = () => {
    handleLoadClients();
    setIsModalOpen(false);
  };

  const handleNewClient = () => {
    setIsModalOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
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
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao buscar os clientes!");
        }
      });
  }, [user.token]);

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

      <ClientTable clients={clients} onClickClient={handleEditClient} />
      <ClientCards clients={clients} onClickClient={handleEditClient} />

      <ModalClient
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onClose={handleCloseModal}
        client={selectedClient}
      />
    </div>
  );
};

export default ClientsPage;
