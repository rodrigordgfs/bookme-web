import { useState, useEffect, useRef } from "react";

const UserSelect = ({
  users,
  onChange,
  userSelected,
  loading,
  disabled,
}) => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filtrar usuários com base no campo de pesquisa
  const filteredUsers = users.filter((user) =>
    String(user.name).toLowerCase().includes(String(search).toLowerCase())
  );

  const handleSelect = (user) => {
    onChange(user);
    setIsDropdownOpen(false);
    setSearch(user.name);
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
    // Atualiza o campo de pesquisa se um usuário estiver selecionado
    if (userSelected && userSelected.name) {
      setSearch(userSelected.name);
    } else {
      setSearch("");
    }
  }, [userSelected]);

  return (
    <div ref={dropdownRef} className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        disabled={loading || disabled}
        className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
        placeholder={loading ? "Carregando usuários..." : "Selecione um usuário"}
      />
      {isDropdownOpen && (
        <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-md mt-1">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelect(user)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-zinc-100"
              >
                <div
                  className="w-8 h-8 flex items-center justify-center text-white font-bold rounded-full"
                >
                  {user.name.charAt(0)}
                </div>
                <span>{user.name}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-zinc-500">
              Nenhum usuário encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSelect;
