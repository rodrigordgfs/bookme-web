import { useCallback, useContext, useEffect, useState } from "react";
import ModalProfissional from "../../components/ModalProfissional";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import ProfissionalsService from "../../services/profissionals";
import Header from "../../components/Header";
import ProfissionalTable from "../../components/ProfissionalTable";
import FilterProfissionals from "../../components/FilterProfissionals";
import ProfissionalTableSkeleton from "../../components/ProfissionalTableSkeleton";

const ProfissionalsPage = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profissionals, setProfissionals] = useState([]);
  const [loadingProfissionals, setLoadingProfissionals] = useState(false);
  const [selectedProfissional, setSelectedProfissional] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

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

  const handleLoadProfissionals = useCallback(
    (name, email, specialty, page, itemsPerPage) => {
      setLoadingProfissionals(true);
      ProfissionalsService.getProfissionals(user.token, {
        name: name || undefined,
        email: email || undefined,
        specialty: specialty || undefined,
        page,
        itemsPerPage,
      })
        .then(({ data }) => {
          setProfissionals(data.data);
          setTotalPages(Number(data.totalPages));
          setCurrentPage(Number(data.currentPage));
          setTotalItems(Number(data.totalItems));
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
    },
    [user.token]
  );

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

      <FilterProfissionals
        onFilter={(value) =>
          handleLoadProfissionals(value?.name, value?.email, value?.specialty)
        }
        loading={loadingProfissionals}
      />

      {loadingProfissionals ? (
        <ProfissionalTableSkeleton />
      ) : (
        <ProfissionalTable
          profissionals={profissionals}
          onClickProfissional={handleEditProfissional}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) =>
            handleLoadProfissionals(null, null, null, page)
          }
          onItemsPerPageChange={(itemsPerPage) =>
            handleLoadProfissionals(null, null, null, 1, itemsPerPage)
          }
        />
      )}

      <ModalProfissional
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        profissional={selectedProfissional}
      />
    </div>
  );
};

export default ProfissionalsPage;
