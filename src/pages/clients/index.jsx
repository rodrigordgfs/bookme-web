const ClientsPage = () => {
    const clients = [
      {
        id: 1,
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "João Silva",
        email: "joao@exemplo.com",
        phone: "(11) 98765-4321",
        birthDate: "1990-05-15",
        gender: "Masculino",
      },
      {
        id: 2,
        photo: "https://randomuser.me/api/portraits/women/2.jpg",
        name: "Maria Oliveira",
        email: "maria@exemplo.com",
        phone: "(21) 91234-5678",
        birthDate: "1985-08-25",
        gender: "Feminino",
      },
      // Adicione mais clientes conforme necessário
    ];
  
    return (
      <div className="flex flex-col w-full max-w-full p-4">
        {/* Título e botão */}
        <div className="flex flex-col gap-2 md:gap-0 md:flex-row h-36 md:h-20 items-center justify-center md:justify-between">
          <div className="flex flex-col gap-2 md:gap-0">
            <h1 className="text-2xl font-medium md:text-start text-center">
              Clientes
            </h1>
            <p className="text-sm text-zinc-600 md:text-start text-center">
              Visualize todos os seus clientes
            </p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto">
            Novo Cliente
          </button>
        </div>
  
        {/* Exibição de clientes */}
        <div className="mt-6">
          {/* Exibição como tabela em telas grandes */}
          <div className="hidden md:block">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Foto</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">E-mail</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Telefone</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Data de Nascimento</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Gênero</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-zinc-50 transition-all cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img
                        src={client.photo}
                        alt={client.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.birthDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Exibição como cards em telas pequenas */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {clients.map((client) => (
              <div key={client.id} className="flex flex-col bg-white shadow-lg rounded-lg p-4">
                <img
                  src={client.photo}
                  alt={client.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-center text-gray-900">{client.name}</h3>
                <p className="text-sm text-center text-gray-500">{client.email}</p>
                <p className="text-sm text-center text-gray-500">{client.phone}</p>
                <p className="text-sm text-center text-gray-500">{client.birthDate}</p>
                <p className="text-sm text-center text-gray-500">{client.gender}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ClientsPage;
  