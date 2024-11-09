import { useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { DateRange } from "react-date-range";
import moment from "moment";
import { IoCloseSharp } from "react-icons/io5";
import ReactApexChart from "react-apexcharts";

const HomePage = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [periodRecept, setPeriodRecept] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });
  const [popularServices, setPopularServices] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: "donut",
      },
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

  const formattedStartDate = moment(dateRange[0].startDate).format(
    "DD/MM/YYYY"
  );
  const formattedEndDate = moment(dateRange[0].endDate).format("DD/MM/YYYY");

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    setShowCalendar(false);
  };

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
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
          <div className="flex flex-row justify-between items-center gap-2">
            <h2 className="text-md font-medium">Receita total (mês)</h2>
            <MdAttachMoney className="h-5 w-5" />
          </div>
          <p className="text-lg font-semibold">R$ 1.200,00</p>
          <p className="text-xs">
            <span className="text-green-600 font-medium">+252.51%</span> em
            relação ao mês passado
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
          <div className="flex flex-row justify-between items-center gap-2">
            <h2 className="text-md font-medium">Agendamentos (mês)</h2>
            <MdAttachMoney className="h-5 w-5" />
          </div>
          <p className="text-lg font-semibold">156</p>
          <p className="text-xs">
            <span className="text-green-600 font-medium">+252.51%</span> em
            relação ao mês passado
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
          <div className="flex flex-row justify-between items-center gap-2">
            <h2 className="text-md font-medium">Agendamentos (dia)</h2>
            <MdAttachMoney className="h-5 w-5" />
          </div>
          <p className="text-lg font-semibold">28</p>
          <p className="text-xs">
            <span className="text-green-600 font-medium">+252.51%</span> em
            relação a ontem
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
          <div className="flex flex-row justify-between items-center gap-2">
            <h2 className="text-md font-medium">Cancelamentos (mês)</h2>
            <MdAttachMoney className="h-5 w-5" />
          </div>
          <p className="text-lg font-semibold">27</p>
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
              <h2 className="text-md font-medium">Receita no período</h2>
              <p className="text-sm text-zinc-600">Receita diária no período</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-sm font-medium">Período</p>
              <div
                onClick={() => setShowCalendar(true)}
                className="h-8 px-4 bg-zinc-50 text-sm cursor-pointer border outline-none rounded-lg flex items-center gap-2"
              >
                <p>
                  {formattedStartDate} à {formattedEndDate}
                </p>
              </div>
            </div>
          </div>
          <ReactApexChart
            options={periodRecept.options}
            series={periodRecept.series}
            type="line"
            height={400}
          />
        </div>
        <div className="flex flex-col gap-2 max-w-[420px] w-full border border-zinc-400 rounded-lg p-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-md font-medium">Serviços populares</h2>
            <p className="text-sm text-zinc-600">
              Serviços mais utilizados neste mês
            </p>
          </div>
          <div className="flex items-center justify-center flex-1">
            <ReactApexChart
              options={popularServices.options}
              series={popularServices.series}
              type="donut"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>

      {showCalendar && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-row items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Selecione o período</h2>
              <button onClick={() => setShowCalendar(false)}>
                <IoCloseSharp className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <DateRange
              className="font-sans"
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={true}
              ranges={dateRange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
