import { useState, useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const ClientSelect = ({ clients, onChange, loading, disabled }) => {
  const [search, setSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // eslint-disable-next-line react/prop-types
  const filteredClients = clients.filter((client) =>
    String(client.user.name).toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (client) => {
    onChange(client);
    setIsDropdownOpen(false);
    setSearch(client.user.name);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        disabled={loading || disabled}
        className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
        placeholder={loading ? 'Carregando clientes...' : 'Selecione um cliente'}
      />
      {isDropdownOpen && (
        <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-md mt-1">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => handleSelect(client)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-zinc-100"
              >
                {client.user.photoUrl ? (
                  <img
                    src={client.user.photoUrl}
                    alt={client.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className={`w-8 h-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full ${client.gender === 'M' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                    {client.user.name.split(" ")[0][0]}
                  </div>
                )}
                <span>{client.user.name}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-zinc-500">Nenhum cliente encontrado</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientSelect;
