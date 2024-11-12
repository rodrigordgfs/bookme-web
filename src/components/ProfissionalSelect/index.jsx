import { useState, useEffect, useRef } from "react";

const ProfissionalSelect = ({
  professionals,
  onChange,
  professionalSelected,
  loading,
  disabled,
}) => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredProfessionals = professionals.filter((professional) =>
    String(professional.user.name)
      .toLowerCase()
      .includes(String(search).toLowerCase())
  );

  const handleSelect = (professional) => {
    onChange(professional);
    setIsDropdownOpen(false);
    setSearch(professional.user.name);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (professionalSelected?.name) {
      setSearch(professionalSelected.name);
    } else {
      setSearch("");
    }
  }, [professionalSelected]);

  return (
    <div ref={dropdownRef} className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        disabled={loading || disabled}
        className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
        placeholder={
          loading ? "Carregando profissionais..." : "Selecione um profissional"
        }
      />
      {isDropdownOpen && (
        <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-md mt-1">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => (
              <div
                key={professional.id}
                onClick={() => handleSelect(professional)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-zinc-100"
              >
                {professional.user.photoUrl ? (
                  <img
                    src={professional.user.photoUrl}
                    alt={professional.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white font-bold rounded-full">
                    {professional.user.name.split(" ")[0][0]}
                  </div>
                )}
                <div>
                  <span className="block font-medium">
                    {professional.user.name}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {professional.specialty}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-zinc-500">
              Nenhum profissional encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfissionalSelect;
