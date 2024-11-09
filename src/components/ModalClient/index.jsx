import { useCallback, useContext, useEffect, useState, useRef } from "react";
import Modal from "../Modal";
import UserSelect from "../UserSelect";
import UserService from "../../services/user";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import { FaSpinner, FaUser } from "react-icons/fa"; // Importando o ícone de usuário
import moment from "moment";

const ModalClient = ({ isModalOpen, handleCloseModal, client }) => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const fileInputRef = useRef(null);

  const closeModal = () => {
    handleCloseModal();
    clearFields();
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
        if (response?.data?.error) {
          return toast.error(response.data.error);
        } else {
          toast.error("Erro ao buscar os usuário!");
        }
      });
  }, [user.token]);

  const handleUserChange = (user) => {
    setSelectedUser(user);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png")
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setSelectedImage(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Por favor, selecione uma imagem no formato JPG ou PNG.");
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearFields = () => {
    setSelectedUser(null);
    setPhone("");
    setBirthDate("");
    setGender("");
    setImageBase64("");
    setSelectedImage(null);
  };

  const handleSaveCliente = (e) => {
    e.preventDefault();
    setLoading(true);
    UserService.postClient(
      {
        id_user: selectedUser.id,
        photo: imageBase64,
        phone,
        birthDate,
        gender,
      },
      user.token
    )
      .then(() => {
        toast.success("Cliente cadastrado com sucesso!");
        closeModal();
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          return toast.error(response.data.error);
        } else {
          toast.error("Erro ao cadastrar o cliente!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditCliente = (e) => {
    e.preventDefault();
    setLoading(true);
    UserService.patchClient(
      client.id,
      {
        id_user: selectedUser.id,
        photo: selectedImage,
        phone,
        birthDate,
        gender,
      },
      user.token
    )
      .then(() => {
        toast.success("Cliente editado com sucesso!");
        closeModal();
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          return toast.error(response.data.error);
        } else {
          toast.error("Erro ao editar o cliente!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleLoadUsers();
  }, [handleLoadUsers]);

  useEffect(() => {
    if (client) {
      setSelectedUser(client.user);
      setPhone(client.phone);
      setBirthDate(moment(client.birthDate).format("YYYY-MM-DD"));
      setGender(client.gender);
      setSelectedImage(client.photoUrl);
    } else {
      clearFields();
    }
  }, [client]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={client ? "Editar Cliente" : "Novo Cliente"}
      subtitle={
        client ? "Edite os dados do cliente" : "Preencha os dados do cliente"
      }
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={client ? handleEditCliente : handleSaveCliente}
      >
        <div className="flex flex-col mt-4 items-center">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Imagem do cliente selecionada"
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
            disabled={loadingUsers || loading}
            userSelected={selectedUser}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm">
            Telefone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="Digite o telefone"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="birthDate" className="text-sm">
            Data de Nascimento
          </label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="text-sm">
            Gênero
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            <option value="">Selecione o Gênero</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
          </select>
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Salvar"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalClient;
