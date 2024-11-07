import { useState, useEffect, useRef } from 'react';

const ServiceSelect = ({ services, onChange, serviceSelected, disabled, loading }) => {
  const [search, setSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredServices = services.filter((service) =>
    String(service.service.name).toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (service) => {
    onChange(service);
    setIsDropdownOpen(false);
    setSearch(service.service.name);
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

  useEffect(() => {
    if (serviceSelected) {
      console.log('serviceSelected', serviceSelected);
      setSearch(serviceSelected.description || '');
    } else {
      setSearch('');
    }
  }, [serviceSelected]);
  

  return (
    <div ref={dropdownRef} className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        disabled={disabled}
        className="w-full h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg flex items-center gap-2 disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
        placeholder={loading ? 'Carregando serviços...' : 'Selecione um serviço'}
      />
      {isDropdownOpen && (
        <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-md mt-1">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleSelect(service)}
                className="flex items-start gap-2 px-4 py-2 cursor-pointer hover:bg-zinc-100"
              >
                <div>
                  <span className="font-semibold">{service.service.name}</span>
                  <p className="text-sm text-zinc-500">{service.service.description}</p>
                  <span className="text-sm text-green-600">R$ {service.service.price.toFixed(2)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-zinc-500">Nenhum serviço encontrado</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceSelect;
