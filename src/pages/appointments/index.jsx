import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useCallback, useContext, useEffect, useState } from "react";
import ModalAppointment from "../../components/ModalAppointment";
import AppointmentsService from "../../services/appointment";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import { add } from "date-fns";
import "moment-timezone";
import "moment/locale/pt-br";
import Header from "../../components/Header";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const Appointments = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [defaultView, setDefaultView] = useState(
    window.innerWidth < 768 ? "day" : "month"
  );
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [calendarHeight, setCalendarHeight] = useState(
    window.innerWidth < 768 ? "calc(100vh - 245px)" : "calc(100vh - 170px)"
  );

  const handleNewAppointment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    handleLoadAppointments();
  };

  const handleOpenAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
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
          date: moment(new Date(appointment.dateTime)).format("YYYY-MM-DD"),
          hour: moment(new Date(appointment.dateTime)).format("HH:mm"),
          status: appointment.status,
          observation: appointment.observation,
          client: {
            id: appointment.client.id,
            name: appointment.client.user.name,
            photo: null,
          },
          professional: {
            id: appointment.professionalService.professional.id,
            name: appointment.professionalService.professional.user.name,
            specialty: appointment.professionalService.professional.specialty,
            photo: null,
          },
          service: {
            id: appointment.professionalService.service.id,
            description: appointment.professionalService.service.description,
            duration: appointment.professionalService.service.duration,
            price: appointment.professionalService.service.price,
          },
        }));
        setAppointments(appointmentsData);
      })
      .catch((data) => {
        console.log(data.response);
        if (data?.response?.data?.error) {
          return toast.error(data.response.data.error);
        } else {
          console.log(data);
          toast.error("Erro ao buscar os agendamentos!");
        }
      });
  }, [user.token]);

  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad";
    if (event.status === "completed") backgroundColor = "#65A30D";
    else if (event.status === "confirmed") backgroundColor = "#2563EB";
    else if (event.status === "pending") backgroundColor = "#52525B";
    else if (event.status === "canceled") backgroundColor = "#DC2626";

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "4px",
        border: "none",
        display: "block",
      },
    };
  };

  useEffect(() => {
    handleLoadAppointments();
  }, [handleLoadAppointments]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDefaultView("day");
        setCalendarHeight("calc(100vh - 245px)");
      } else {
        setDefaultView("month");
        setCalendarHeight("calc(100vh - 170px)");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-full">
      <Header
        title="Agendamentos"
        subtitle="Visualize e controle todos os seus horários e compromissos agendados."
        actionTitle="Novo Agendamento"
        onAction={handleNewAppointment}
      />

      <Calendar
        className="mt-4 md:mt-0"
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        onSelectEvent={(event) => handleOpenAppointment(event)}
        style={{ height: calendarHeight }}
        defaultView={defaultView}
        eventPropGetter={eventStyleGetter}
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
        selectedAppointment={selectedAppointment}
      />
    </div>
  );
};

export default Appointments;
