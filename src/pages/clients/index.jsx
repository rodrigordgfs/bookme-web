import { formatDate } from "../../utils/formatDate";
import { formatPhone } from "../../utils/formatPhone";
import { useCallback, useContext, useEffect, useState } from "react";
import ModalClient from "../../components/ModalClient";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import ClientService from "../../services/clients";

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

  const genderOptions = (gender) => {
    switch (gender) {
      case "M":
        return "Masculino";
      case "F":
        return "Feminino";
      case "O":
        return "Outro";
      default:
        break;
    }
  }

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  }

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

  useEffect(() => {
    handleLoadClients();
  }, [handleLoadClients]);

  return (
    <div className="flex flex-col w-full max-w-full p-4">
      {/* Título e botão */}
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row h-36 md:h-20 items-center justify-center md:justify-between">
        <div className="flex flex-col gap-2 md:gap-0">
          <h1 className="text-2xl font-medium md:text-start text-center">
            Clientes
          </h1>
          <p className="text-sm text-zinc-600 md:text-start text-center">
            Visualize todos os seus clientes
          </p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
          onClick={handleNewClient}
        >
          Novo Cliente
        </button>
      </div>

      {/* Modo Desktop - Tabela */}
      <div className="hidden md:block mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Foto
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                E-mail
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Data de Nascimento
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Gênero
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-zinc-50 transition-all cursor-pointer"
                onClick={() => handleEditClient(client)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {client.photoUrl ? (
                    <img
                      src={client.photoUrl}
                      alt={client.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center">
                      {client.user.name.charAt(0)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {client.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatPhone(client.phone)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(client.birthDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {genderOptions(client.gender)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modo Mobile - Cards */}
      <div className="block md:hidden mt-6 space-y-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
            onClick={() => handleEditClient(client)}
          >
            <div className="flex items-center gap-4">
              {client.photoUrl ? (
                <img
                  src={client.photoUrl}
                  alt={client.user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  {client.user.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">{client.user.name}</h3>
                <p className="text-sm text-gray-500">{genderOptions(client.gender)}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span> {client.user.email}
              </p>
              <p>
                <span className="font-medium">Telefone:</span>{" "}
                {formatPhone(client.phone)}
              </p>
              <p>
                <span className="font-medium">Data de Nascimento:</span>{" "}
                {formatDate(client.birthDate)}
              </p>
            </div>
          </div>
        ))}
      </div>

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
