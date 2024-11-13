import Skeleton from "react-loading-skeleton";

const ServiceTableSkeleton = () => {
  const skeletonRows = Array(5).fill(null);

  return (
    <div className="mt-6">
      <table className="min-w-full table-auto">
        <thead className="bg-zinc-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600">
              Nome do Serviço
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600 hidden md:table-cell">
              Preço
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-zinc-600 hidden md:table-cell">
              Duração
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {skeletonRows.map((_, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Skeleton width={150} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Skeleton width={150} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                <Skeleton width={100} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                <Skeleton width={100} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTableSkeleton;
