import formatMoneyBRL from "../../utils/formatMoneyBRL";

const ServiceCards = ({ services, onClickService }) => {
  return (
    <div className="block md:hidden mt-6 space-y-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
          onClick={() => onClickService(service)}
        >
          <div>
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-medium">Preço:</span>{" "}
              {formatMoneyBRL(service.price)}
            </p>
            <p>
              <span className="font-medium">Duração:</span> {service.duration}{" "}
              min
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
