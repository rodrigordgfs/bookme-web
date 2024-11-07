import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import { useCallback, useContext, useEffect, useState } from "react";
import ModalAppointment from "../../components/ModalAppointment";
import AppointmentsService from "../../services/appointment";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import { add } from "date-fns";
import 'moment-timezone';
import 'moment/locale/pt-br';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const Appointments = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [defaultView, setDefaultView] = useState(window.innerWidth < 768 ? 'day' : 'month'); // Define a visualização inicial

  const handleNewAppointment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleLoadAppointments();
  };

  const handleLoadAppointments = useCallback(() => {
    AppointmentsService.getAppointments(user.token)
      .then(({ data }) => {
        const appointmentsData = data.map((appointment) => ({
          id: appointment.id,
          title: `${appointment.professionalService.service.description} - ${appointment.client.user.name}`,
          start: new Date(appointment.dateTime),
          end: add(new Date(appointment.dateTime), {
            minutes: appointment.professionalService.service.duration,
          }),
        }));
        setAppointments(appointmentsData);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          return toast.error(response.data.error);
        } else {
          toast.error("Erro ao buscar os agendamentos!");
        }
      })
  }, [user.token]);

  useEffect(() => {
    handleLoadAppointments();
  }, [handleLoadAppointments]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDefaultView('day');
      } else {
        setDefaultView('month');
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-full">
      <div className="flex flex-row h-20 items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Agendamentos</h1>
          <p className="text-sm text-zinc-600">
            Visualize e controle todos os seus horários e compromissos
            agendados.
          </p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleNewAppointment}
        >
          Novo Agendamento
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        onSelectEvent={(event) => console.log(event)}
        style={{ height: "calc(100vh - 170px)" }}
        defaultView={defaultView}
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
