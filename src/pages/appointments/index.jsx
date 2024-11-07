import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ptBR from "date-fns/locale/pt-BR";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import ModalAppointment from "../../components/ModalAppointment";

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: ptBR }),
  getDay,
  locales,
});

const myEventsList = [
  {
    id: 1,
    title: "Reunião com Cliente",
    start: new Date("2024-11-07T13:45:00-05:00"),
    end: new Date("2024-11-07T14:00:00-05:00"),
  },
  {
    id: 2,
    title: "Planejamento de Projeto",
    start: new Date("2024-11-06T13:45:00-05:00"),
    end: new Date("2024-11-06T14:00:00-05:00"),
  },
];

const Appointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewAppointment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full max-w-full">
      <div className="flex flex-row h-20 items-center justify-between">
        <h1 className="text-2xl font-medium">Agendamentos</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleNewAppointment}
        >
          Novo Agendamento
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        onSelectEvent={(event) => console.log(event)}
        style={{ height: "calc(100vh - 170px)" }}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          noEventsInRange: "Nenhum evento neste intervalo",
          allDay: "Dia inteiro",
          date: "Data",
          time: "Hora",
          event: "Evento",
          showMore: (total) => `+ Mais ${total} eventos`,
        }}
      />

      <ModalAppointment
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Appointments;
