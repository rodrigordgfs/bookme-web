import formatMoneyBRL from "../../utils/formatMoneyBRL";
import Pagination from "../Pagination";

const ServiceTable = ({
  services,
  onClickService,
  totalPages,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mt-6 overflow-y-auto flex-1">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Nome do Serviço
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">
                Duração
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service, index) => (
              <tr
                key={service.id}
                className={`hover:bg-zinc-100 transition-all cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => onClickService(service)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {service.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {service.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatMoneyBRL(service.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {service.duration} min
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

export default ServiceTable;
