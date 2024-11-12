import { formatDate } from "../../utils/formatDate";
import { formatPhone } from "../../utils/formatPhone";

const ClientCards = ({ clients, onClickService }) => {
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
    <div className="block md:hidden mt-6 space-y-4">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
          onClick={() => onClickService(client)}
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
              <p className="text-sm text-gray-500">
                {genderOptions(client.gender)}
              </p>
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
  );
};

export default ClientCards;
