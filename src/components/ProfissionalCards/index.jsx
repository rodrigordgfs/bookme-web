import { formatDate } from "../../utils/formatDate";

const ProfissionalCards = ({ profissionals, onClickProfissional }) => {
  return (
    <div className="block md:hidden mt-6 space-y-4">
      {profissionals.map((profissional) => (
        <div
          key={profissional.id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
          onClick={() => onClickProfissional(profissional)}
        >
          <div className="flex items-center gap-4">
            {profissional.photoUrl ? (
              <img
                src={profissional.photoUrl}
                alt={profissional.user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                {profissional.user.name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">
                {profissional.user.name}
              </h3>
              <p className="text-sm text-gray-500">{profissional.specialty}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-medium">Email:</span>{" "}
              {profissional.user.email}
            </p>
            <p>
              <span className="font-medium">Data de Nascimento:</span>{" "}
              {formatDate(profissional.birthDate)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfissionalCards;
