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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

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
    (name, email, phone, page, itemsPerPage) => {
      setLoadingClients(true);
      ClientService.getClients(user.token, {
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        page,
        itemsPerPage,
      })
        .then(({ data }) => {
          setClients(data.data);
          setTotalPages(Number(data.totalPages));
          setCurrentPage(Number(data.currentPage));
          setTotalItems(Number(data.totalItems));
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
        <ClientTable
          clients={clients}
          onClickClient={handleEditClient}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => handleLoadClients(null, null, null, page)}
          onItemsPerPageChange={(itemsPerPage) =>
            handleLoadClients(null, null, null, 1, itemsPerPage)
          }
        />
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
