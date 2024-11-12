import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaSpinner, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import UserSelect from "../../UserSelect";
import { AuthContext } from "../../../contexts/auth";
import UserService from "../../../services/user";
import ProfissionalService from "../../../services/profissionals";

export const ModalProfissionalData = ({ profissional, closeModal }) => {
  const { user } = useContext(AuthContext);

  const fileInputRef = useRef(null);

  const [imageBase64, setImageBase64] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [specialty, setSpecialty] = useState("");

  const handleUserChange = (user) => {
    setSelectedUser(user);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && ["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setSelectedImage(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Selecione uma imagem no formato JPG ou PNG.");
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleLoadUsers = useCallback(() => {
    setLoadingUsers(true);
    UserService.getUsers(user.token)
      .then(({ data }) => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response?.data?.error || "Erro ao buscar os usuários!");
      });
  }, [user.token]);

  const clearFields = () => {
    setSelectedUser(null);
    setSpecialty("");
    setImageBase64("");
    setSelectedImage(null);
  };

  useEffect(() => {
    handleLoadUsers();
  }, [handleLoadUsers]);

  const handleSaveProfissional = (e) => {
    e.preventDefault();
    setLoading(true);
    ProfissionalService.postProfessional(
      {
        id_user: selectedUser.id,
        photo: imageBase64,
        specialty,
      },
      user.token
    )
      .then(() => {
        toast.success("Profissional cadastrado com sucesso!");
        closeModal();
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(
          response?.data?.error || "Erro ao cadastrar o profissional!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditProfissional = (e) => {
    e.preventDefault();
    setLoading(true);
    ProfissionalService.patchProfessional(
      profissional.id,
      {
        id_user: selectedUser.id,
        photo: imageBase64 || selectedImage || undefined,
        specialty,
      },
      user.token
    )
      .then(() => {
        toast.success("Profissional editado com sucesso!");
        closeModal();
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response?.data?.error || "Erro ao editar o profissional!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (profissional) {
      setSelectedUser(profissional.user);
      setSpecialty(profissional.specialty);
      setSelectedImage(profissional.photoUrl);
    } else {
      clearFields();
    }
  }, [profissional]);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={profissional ? handleEditProfissional : handleSaveProfissional}
    >
      <div className="flex flex-col mt-4 items-center">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Imagem do profissional"
            className="mt-2 w-32 h-32 object-cover rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center mt-2 w-32 h-32 bg-gray-200 rounded-full">
            <FaUser className="w-16 h-16 text-gray-500" />
          </div>
        )}
        <button
          type="button"
          onClick={openFileSelector}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto mt-2"
          disabled={loading}
        >
          Selecionar Foto
        </button>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
      <div className="flex flex-col">
        <p>Usuário</p>
        <UserSelect
          users={users}
          onChange={handleUserChange}
          loading={loadingUsers}
          disabled={profissional || loadingUsers || loading}
          userSelected={selectedUser}
        />
      </div>
      <div className="flex flex-col">
        <p>Especialidade</p>
        <input
          type="text"
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Digite a especialidade"
          disabled={loading}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={closeModal}
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          type="submit"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Salvar"}
        </button>
      </div>
    </form>
  );
};

export default ModalProfissionalData;
