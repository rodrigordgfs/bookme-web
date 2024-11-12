import { formatDate } from "../../utils/formatDate";

const ProfissionalTable = ({ profissionals, onClickProfissional }) => {
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
              Especialidade
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Data de Nascimento
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {profissionals.map((profissional) => (
            <tr
              key={profissional.id}
              className="hover:bg-zinc-50 transition-all cursor-pointer"
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {profissional.user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {profissional.specialty}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(profissional.birthDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfissionalTable;
