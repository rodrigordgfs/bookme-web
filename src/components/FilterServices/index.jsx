import { useState } from "react";
import Collapsible from "../Collapsible";
import Button from "../Button";

const FilterServices = ({ onFilter, loading }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter({ name, price, duration });
  };

  const handleClearFields = () => {
    setName("");
    setPrice("");
    setDuration("");
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
            type="number"
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
          />
          <input
            type="number"
            className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="Duração"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <Button
            onClick={handleClearFields}
            disabled={loading}
            type="button"
            variant="danger"
            size="fit"
          >
            Limpar
          </Button>
          <Button disabled={loading} type="submit" size="fit">
            Filtrar
          </Button>
        </div>
      </form>
    </Collapsible>
  );
};

export default FilterServices;
