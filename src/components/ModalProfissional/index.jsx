import { useState } from "react";
import Modal from "../Modal";
import ModalProfissionalData from "./ModalProfissionalData";
import ModalProfissionalServices from "./ModalProfissionalServices";

const ModalProfissional = ({ isModalOpen, handleCloseModal, profissional }) => {
  const [activeTab, setActiveTab] = useState("dados");

  const closeModal = () => {
    handleCloseModal();
    setActiveTab("dados");
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={profissional ? "Editar Profissional" : "Novo Profissional"}
      subtitle={
        profissional
          ? "Edite os dados do profissional"
          : "Preencha os dados do profissional"
      }
    >
      {/* Nav de Abas */}
      {profissional && (
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("dados")}
            className={`flex-1 px-4 py-2 ${
              activeTab === "dados" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Dados do Profissional
          </button>
          <button
            onClick={() => setActiveTab("servicos")}
            className={`flex-1 px-4 py-2 ${
              activeTab === "servicos" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Serviços
          </button>
        </div>
      )}

      {/* Conteúdo das Abas */}
      {activeTab === "dados" && (
        <ModalProfissionalData
          profissional={profissional}
          closeModal={handleCloseModal}
        />
      )}

      {activeTab === "servicos" && (
        <ModalProfissionalServices profissional={profissional} />
      )}
    </Modal>
  );
};

export default ModalProfissional;
