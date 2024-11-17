import { formatDate } from "../../utils/formatDate";
import { formatPhone } from "../../utils/formatPhone";
import Pagination from "../Pagination";

const ClientTable = ({
  clients,
  onClickClient,
  totalPages,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
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
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mt-6 overflow-y-auto flex-1">
        <table className="min-w-full table-auto">
          <thead className="bg-zinc-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600">
                Foto
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600 hidden md:table-cell">
                E-mail
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600 hidden md:table-cell">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600 hidden md:table-cell">
                Data de Nascimento
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600 hidden md:table-cell">
                Gênero
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client, index) => (
              <tr
                key={client.id}
                className={`hover:bg-zinc-100 transition-all cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => onClickClient(client)}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {client.user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {formatPhone(client.phone)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {formatDate(client.birthDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {genderOptions(client.gender)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
};

export default ClientTable;
