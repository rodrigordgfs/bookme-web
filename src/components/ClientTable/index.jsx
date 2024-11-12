import { formatDate } from "../../utils/formatDate";
import { formatPhone } from "../../utils/formatPhone";

const ClientTable = ({ clients, onClickClient }) => {
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
  );
};

export default ClientTable;
