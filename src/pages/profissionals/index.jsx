import { useCallback, useContext, useEffect, useState } from "react";
import ModalProfissional from "../../components/ModalProfissional";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import ProfissionalsService from "../../services/profissionals";
import Header from "../../components/Header";
import ProfissionalTable from "../../components/ProfissionalTable";
import ProfissionalCards from "../../components/ProfissionalCards";

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
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
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

      <ProfissionalTable
        profissionals={profissionals}
        onClickProfissional={handleEditProfissional}
      />
      <ProfissionalCards
        profissionals={profissionals}
        onClickProfissional={handleEditProfissional}
      />

      <ModalProfissional
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        profissional={selectedProfissional}
      />
    </div>
  );
};

export default ProfissionalsPage;
