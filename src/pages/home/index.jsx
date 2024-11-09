import { useCallback, useContext, useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import DashboardService from "../../services/dashboard";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";
import formatMoneyBRL from "../../utils/formatMoneyBRL";
import Skeleton from "react-loading-skeleton";
import { MdOutlineMoodBad } from "react-icons/md";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  const [dateRangeStart, setDateRangeStart] = useState(new Date());
  const [dateRangeEnd, setDateRangeEnd] = useState(new Date());
  const [periodRecept, setPeriodRecept] = useState({
    series: [
      {
        name: "Agendamentos (R$)",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 400,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  });
  const [popularServices, setPopularServices] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [totalRecept, setTotalRecept] = useState(0);
  const [totalReceptPercentageChange, setTotalReceptPercentageChange] =
    useState(0);
  const [totalAppointmentsMonth, setTotalAppointmentsMonth] = useState(0);
  const [
    totalAppointmentsPercentageChange,
    setTotalAppointmentsPercentageChange,
  ] = useState(0);
  const [totalAppointmentsDay, setTotalAppointmentsDay] = useState(0);
  const [
    totalAppointmentsDayPercentageChange,
    setTotalAppointmentsDayPercentageChange,
  ] = useState(0);
  const [totalCancellationsMonth, setTotalCancellationsMonth] = useState(0);

  const handleLoadDashboard = useCallback(() => {
    setLoadingDashboard(true);

    Promise.all([
      DashboardService.getTotalMonth(user?.token),
      DashboardService.getAppointmentsMonth(user?.token),
      DashboardService.getAppointmentsDay(user?.token),
      DashboardService.getAppointmentsInterval(
        {
          start_date: moment(dateRangeStart).format("YYYY-MM-DD"),
          end_date: moment(dateRangeEnd).format("YYYY-MM-DD"),
        },
        user?.token
      ),
      DashboardService.getServicesInterval(
        {
          start_date: moment(dateRangeStart).format("YYYY-MM-DD"),
          end_date: moment(dateRangeEnd).format("YYYY-MM-DD"),
        },
        user?.token
      ),
    ])
      .then(
        ([
          { data: totalMonth },
          { data: appointmentsMonth },
          { data: appointmentsDay },
          { data: appointmentsInterval },
          { data: servicesInterval },
        ]) => {
          setTotalRecept(totalMonth.amount);
          setTotalReceptPercentageChange(totalMonth.percentageChange);
          setTotalAppointmentsMonth(appointmentsMonth.appointments);
          setTotalAppointmentsPercentageChange(
            appointmentsMonth.percentageChange
          );
          setTotalAppointmentsDay(appointmentsDay.appointments);
          setTotalAppointmentsDayPercentageChange(
            appointmentsDay.percentageChange
          );
          setPeriodRecept({
            series: [
              {
                name: "Receita",
                data: Object.values(appointmentsInterval).map(
                  (item) => item.totalAmount
                ),
              },
            ],
            options: {
              chart: {
                height: 400,
                type: "line",
                zoom: { enabled: false },
              },
              dataLabels: { enabled: false },
              stroke: { curve: "straight" },
              grid: {
                row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
              },
              xaxis: {
                categories: Object.keys(appointmentsInterval),
              },
            },
          });

          setPopularServices({
            series: Object.values(servicesInterval).map((item) => item) || [],
            options: {
              chart: {
                width: 400,
                type: "pie",
              },
              labels: Object.keys(servicesInterval) || [],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            },
          });
          setLoadingDashboard(false);
        }
      )
      .catch((error) => {
        console.log(error);
        if (error.response?.data?.error) {
          return toast.error(error.response.data.error);
        } else {
          toast.error("Erro ao buscar os dados!");
        }
      });
  }, [user?.token, dateRangeStart, dateRangeEnd]);

  useEffect(() => {
    handleLoadDashboard();
  }, [handleLoadDashboard]);

  return (
    <div className="flex flex-col w-full max-w-full p-4">
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row h-36 md:h-20 items-center justify-center md:justify-between">
        <div className="flex flex-col gap-2 md:gap-0">
          <h1 className="text-2xl font-medium md:text-start text-center">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-600 md:text-start text-center">
            Visualize algumas métricas importantes
          </p>
        </div>
      </div>
      {loadingDashboard ? (
        <>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <Skeleton height={120} />
            </div>
            <div className="flex-1">
              <Skeleton height={120} />
            </div>
            <div className="flex-1">
              <Skeleton height={120} />
            </div>
            <div className="flex-1">
              <Skeleton height={120} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-2">
            <div className="flex-1">
              <Skeleton height={400} />
            </div>
            <div className="max-w-[420px] w-full">
              <Skeleton height={400} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-md font-medium">Receita total (mês)</h2>
                <MdAttachMoney className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold">
                {formatMoneyBRL(totalRecept)}
              </p>
              <p className="text-xs">
                {totalReceptPercentageChange === 0 ? (
                  <span className="font-medium">0%</span>
                ) : totalReceptPercentageChange > 0 ? (
                  <span className="text-green-600 font-medium">{`+${totalReceptPercentageChange}%`}</span>
                ) : (
                  <span className="text-red-600 font-medium">{`-${totalReceptPercentageChange}%`}</span>
                )}{" "}
                em relação ao mês passado
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-md font-medium">Agendamentos (mês)</h2>
                <MdAttachMoney className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold">{totalAppointmentsMonth}</p>
              <p className="text-xs">
                {totalAppointmentsPercentageChange === 0 ? (
                  <span className="font-medium">0%</span>
                ) : totalAppointmentsPercentageChange > 0 ? (
                  <span className="text-green-600 font-medium">{`+${totalAppointmentsPercentageChange}%`}</span>
                ) : (
                  <span className="text-red-600 font-medium">{`-${totalAppointmentsPercentageChange}%`}</span>
                )}{" "}
                em relação ao mês passado
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-md font-medium">Agendamentos (dia)</h2>
                <MdAttachMoney className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold">{totalAppointmentsDay}</p>
              <p className="text-xs">
                {totalAppointmentsDayPercentageChange === 0 ? (
                  <span className="font-medium">0%</span>
                ) : totalAppointmentsDayPercentageChange > 0 ? (
                  <span className="text-green-600 font-medium">{`+${totalAppointmentsDayPercentageChange}%`}</span>
                ) : (
                  <span className="text-red-600 font-medium">{`-${totalAppointmentsDayPercentageChange}%`}</span>
                )}{" "}
                em relação a ontem
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-md font-medium">Cancelamentos (mês)</h2>
                <MdAttachMoney className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold">{totalCancellationsMonth}</p>
              <p className="text-xs">
                <span className="text-red-600 font-medium">+252.51%</span> em
                relação ao mês passado
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-2">
            <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="flex flex-col gap-1">
                  <h2 className="text-md font-medium text-center md:text-start">Receita no período</h2>
                  <p className="text-sm text-zinc-600 text-center md:text-start">
                    Receita diária no período
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <p className="text-sm font-medium">Período</p>
                  <div className="flex flex-col md:flex-row gap-2 items-center">
                    <input
                      type="date"
                      value={dateRangeStart}
                      onChange={(e) => setDateRangeStart(e.target.value)}
                      className="w-44 h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg"
                    />
                    <p>à</p>
                    <input
                      type="date"
                      value={dateRangeEnd}
                      onChange={(e) => setDateRangeEnd(e.target.value)}
                      className="w-44 h-10 px-4 bg-zinc-50 placeholder-zinc-700 border outline-none rounded-lg"
                    />
                  </div>
                </div>
              </div>
              {periodRecept.series[0].data.length === 0 ? (
                <div className="flex items-center justify-center h-[400px]">
                  <p className="text-lg font-medium">Sem dados neste período</p>
                </div>
              ) : (
                <ReactApexChart
                  options={periodRecept.options}
                  series={periodRecept.series}
                  type="line"
                  height={400}
                />
              )}
            </div>
            <div className="flex flex-col gap-2 max-w-[420px] w-full border border-zinc-400 rounded-lg p-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-md font-medium text-center md:text-start">Serviços populares</h2>
                <p className="text-sm text-zinc-600 text-center md:text-start">
                  Serviços mais utilizados neste mês
                </p>
              </div>
              <div className="flex items-center justify-center flex-1">
                {popularServices.series.length === 0 ? (
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-lg font-medium">
                      Sem dados neste período
                    </p>
                  </div>
                ) : (
                  <ReactApexChart
                    options={popularServices.options}
                    series={popularServices.series}
                    type="pie"
                    width={400}
                    height={300}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
