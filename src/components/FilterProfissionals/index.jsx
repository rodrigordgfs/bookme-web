import { useState } from "react";
import Collapsible from "../Collapsible";
import { FaSpinner } from "react-icons/fa";

const FilterProfissionals = ({ onFilter, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter({ name, email, specialty });
  };

  const handleClearFields = () => {
    setName("");
    setEmail("");
    setSpecialty("");
    onFilter({});
  };

  return (
    <Collapsible title="Filtros">
      <form className="flex flex-col gap-4" onSubmit={handleFilter}>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="Nome do Cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <input
            type="text"
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="text"
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="Especialidade"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <button
            className="bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md md:w-auto"
            type="button"
            onClick={handleClearFields}
            disabled={loading}
          >
            Limpar
          </button>
          <button
            className="bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md md:w-auto"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto w-5 h-5" />
            ) : (
              "Filtrar"
            )}
          </button>
        </div>
      </form>
    </Collapsible>
  );
};

export default FilterProfissionals;
