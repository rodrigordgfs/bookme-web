import formatMoneyBRL from "../../utils/formatMoneyBRL";

const ServiceTable = ({ services, onClickService }) => {
  return (
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
              onClick={() => onClickService(service)}
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
  );
};

export default ServiceTable;
