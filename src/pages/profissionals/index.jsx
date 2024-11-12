import { formatDate } from "../../utils/formatDate";
import { useCallback, useContext, useEffect, useState } from "react";
import ModalProfissional from "../../components/ModalProfissional";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import ProfissionalsService from "../../services/profissionals";
import ServicesService from "../../services/services";
import Header from "../../components/Header";

const ProfissionalsPage = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profissionals, setProfissionals] = useState([]);
  const [loadingProfissionals, setLoadingProfissionals] = useState(false);
  const [selectedProfissional, setSelectedProfissional] = useState(null);

  const handleCloseModal = () => {
    handleLoadProfissionals();
    setSelectedProfissional(null);
    setIsModalOpen(false);
  };

  const handleNewProfissional = () => {
    setIsModalOpen(true);
  };

  const handleEditProfissional = (profissionals) => {
    setSelectedProfissional(profissionals);
    setIsModalOpen(true);
  };

  const handleLoadProfissionals = useCallback(() => {
    setLoadingProfissionals(true);
    ProfissionalsService.getProfissionals(user.token)
      .then(({ data }) => {
        setProfissionals(data);
        setLoadingProfissionals(false);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          return toast.error(response.data.error);
        } else {
          toast.error("Erro ao buscar os profissionais!");
        }
      });
  }, [user.token]);

  useEffect(() => {
    handleLoadProfissionals();
  }, [handleLoadProfissionals]);

  return (
    <div className="flex flex-col w-full max-w-full p-4">
      <Header
        title="Profissionais"
        subtitle="Visualize todos os seus profissionais"
        actionTitle="Novo Profissional"
        onAction={handleNewProfissional}
      />

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
                onClick={() => handleEditProfissional(profissional)}
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

      {/* Modo Mobile - Cards */}
      <div className="block md:hidden mt-6 space-y-4">
        {profissionals.map((profissional) => (
          <div
            key={profissional.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
            onClick={() => handleEditProfissional(profissional)}
          >
            <div className="flex items-center gap-4">
              {profissional.photoUrl ? (
                <img
                  src={profissional.photoUrl}
                  alt={profissional.user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  {profissional.user.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {profissional.user.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {profissional.specialty}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span>{" "}
                {profissional.user.email}
              </p>
              <p>
                <span className="font-medium">Data de Nascimento:</span>{" "}
                {formatDate(profissional.birthDate)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ModalProfissional
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        profissional={selectedProfissional}
      />
    </div>
  );
};

export default ProfissionalsPage;
