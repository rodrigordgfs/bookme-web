import { formatDate } from "../../utils/formatDate";
import Pagination from "../Pagination";

const ProfissionalTable = ({
  profissionals,
  onClickProfissional,
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
                Foto
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500  hidden md:table-cell">
                E-mail
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500  hidden md:table-cell">
                Especialidade
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">
                Data de Nascimento
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {profissionals.map((profissional, index) => (
              <tr
                key={profissional.id}
                className={`hover:bg-zinc-100 transition-all cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => onClickProfissional(profissional)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {profissional.photoUrl ? (
                    <img
                      src={profissional.photoUrl}
                      alt={profissional.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center">
                      {profissional.user.name.charAt(0)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {profissional.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {profissional.user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {profissional.specialty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {formatDate(profissional.birthDate)}
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

export default ProfissionalTable;
