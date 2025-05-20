import { clx } from "./utils/clx";
// import clothestore from "./assets/images/clothestore-logo_v3 - copia.png";
import logo from "./assets/images/logo.png";
import texto from "./assets/images/texto.png";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import { Table, Tag } from "antd";

const ListItem = ({
  label,
  icon,
  liClassName = "",
  iconClassName = "",
  labelClassName = "",
  active,
}: {
  label: string;
  icon: string;
  liClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  active?: boolean;
}) => {
  return (
    <li
      className={clx(
        "flex items-center gap-3 rounded-md p-2",
        active
          ? "bg-gray-200 text-violet-400 font-bold text-md"
          : "text-gray-500 text-sm",
        liClassName
      )}
    >
      <i className={clx("fa-solid", icon, iconClassName)}></i>
      <span className={clx(labelClassName)}>{label}</span>
    </li>
  );
};

const SectionPanel = ({
  icon,
  textColor,
  iconBgColor,
  label,
  value,
}: {
  icon: string;
  textColor: string;
  iconBgColor: string;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex gap-3 w-48">
      <i
        className={clx(
          `fa-solid text-lg p-4 rounded-md`,
          textColor,
          iconBgColor,
          icon
        )}
      ></i>
      <div className="flex flex-col">
        <span className="text-sm text-gray-400">{label}</span>
        <span className={clx(`text-lg font-bold`, textColor)}>{value}</span>
      </div>
    </div>
  );
};

const Section = ({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-2xl">
      <div className="flex">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-400">{subTitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([
    {
      key: "1",
      name: "Zapatillas Flac Deportivas",
      model: "LANA033",
      branch: "Puma",
      price: "$10000",
      status: "Realizado",
    },
    {
      key: "2",
      name: "Zapatillas Flac Deportivas",
      model: "LANA033",
      branch: "Puma",
      price: "$10000",
      status: "Pendiente",
    },
    {
      key: "2",
      name: "Zapatillas Flac Deportivas",
      model: "LANA033",
      branch: "Puma",
      price: "$10000",
      status: "Cancelado",
    },
  ]);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      // fixed: "left",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Marca",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      // fixed: "right",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      // fixed: "right",
      render: (tag, { status }) => {
        const myClassName =
          status == "Realizado"
            ? "!text-violet-400 !border-0 !bg-violet-200"
            : status == "Pendiente"
            ? "!text-indigo-400 !border-0 !bg-indigo-200"
            : status == "Cancelado"
            ? "!text-blue-400 !border-0 !bg-blue-200"
            : "!text-sky-400 !border-0 !bg-sky-200";
        console.log(tag);

        return (
          <Tag className={myClassName} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];
  return (
    <>
      <div className="w-full flex max-h-screen">
        <header className="w-1/5 p-4 max-lg:hidden">
          <aside className=" w-full flex">
            <ul className="w-full flex flex-col gap-1">
              <li className="flex p-4 gap-4 items-center w-full">
                <img className="max-w-1/5" src={logo} alt="clothestore-logo" />
                <img
                  className="max-w-4/5 max-h-4/5"
                  src={texto}
                  alt="clothestore-texto"
                />
              </li>
              <ListItem label="Dashboard" icon="fa-house" active />
              <ListItem label="Clientes" icon="fa-users" />
              <ListItem label="Productos" icon="fa-cart-shopping" />
              <ListItem label="Configuración" icon="fa-gear" />
            </ul>
          </aside>
        </header>
        <main className="w-4/5 bg-gray-100 gap-4 p-6 flex flex-col overflow-auto max-lg:w-full">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-gray-400">
                Información detallada de tu tienda
              </p>
            </div>
            <div className="w-10 h-10 hover:bg-gray-300 hidden max-lg:flex items-center justify-center rounded-lg shadow-3xl transition-all cursor-pointer">
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="flex bg-white gap-3 p-10 rounded-lg shadow-2xl justify-around w-full flex-wrap">
            <div
              className={
                "flex justify-evenly grow max-sm:flex-wrap max-sm:gap-3"
              }
            >
              <SectionPanel
                textColor="text-violet-400"
                iconBgColor="bg-violet-200"
                icon="fa-shopping-cart"
                label="Productos totales"
                value="20000"
              />
              <SectionPanel
                textColor="text-indigo-400"
                iconBgColor="bg-indigo-200"
                icon="fa-users"
                label="Usuarios totales"
                value="20000"
              />
            </div>
            <div
              className={
                "flex justify-evenly grow max-sm:flex-wrap max-sm:gap-3"
              }
            >
              <SectionPanel
                textColor="text-blue-400"
                iconBgColor="bg-blue-200"
                icon="fa-box-archive"
                label="Categorias totales"
                value="7"
              />
              <SectionPanel
                textColor="text-sky-400"
                iconBgColor="bg-sky-200"
                icon="fa-box-archive"
                label="Categorias totales"
                value="7"
              />
            </div>
          </div>
          <div className="flex w-full gap-4 max-md:flex-wrap">
            <div className="flex flex-col gap-4 rounded-lg grow max-w-2/3 max-md:max-w-full">
              <Section title="Ventas" subTitle="Ventas de marcas">
                <div className="grow min-h-64">
                  <ReactApexChart
                    type="area"
                    height={"100%"}
                    width={"100%"}
                    series={[
                      {
                        name: "Nike",
                        data: [31, 40, 28],
                      },
                      {
                        name: "Puma",
                        data: [11, 32, 45],
                      },
                    ]}
                    options={{
                      // responsive: [
                      //   { breakpoint: 1000, options: { width: 300 } },
                      // ],
                      colors: [
                        "#a78bfa",
                        "#818cf8",
                        "#60a5fa",
                        "#38bdf8",
                        "#34d399",
                        // "#4ade80",
                      ],
                      xaxis: {
                        title: { text: "Marcas vendidas en meses" },
                        categories: [
                          "Enero",
                          "Febrero",
                          "Marzo",
                          "Abril",
                          "Mayo",
                          "Junio",
                          "Julio",
                          "Agosto",
                          "Septiembre",
                          "Octubre",
                          "Noviembre",
                          "Diciembre",
                        ],
                        type: "category",
                      },
                      tooltip: {
                        x: {
                          format: "dd/MM/yy HH:mm",
                        },
                      },
                      plotOptions: {
                        pie: {
                          donut: {
                            labels: {
                              show: true,
                              total: {
                                show: true,
                              },
                            },
                          },
                        },
                      },
                      dataLabels: {
                        enabled: false,
                      },
                    }}
                  />
                </div>
              </Section>
              <Section title="Productos" subTitle="Listado de productos">
                <Table
                  scroll={{ x: "max-content" }}
                  bordered
                  className="mt-2"
                  dataSource={products}
                  columns={columns}
                />
              </Section>
            </div>
            <div className="w-full flex flex-col gap-4 rounded-lg grow max-w-1/3 max-md:max-w-full">
              <Section title="Categorias" subTitle="Listado categorias">
                <div className="max-w-full mx-auto max-md:h-44 mt-2">
                  <ReactApexChart
                    type="donut"
                    height={"100%"}
                    series={[40, 100, 130, 12, 30]}
                    options={{
                      colors: [
                        "#a78bfa",
                        "#818cf8",
                        "#60a5fa",
                        "#38bdf8",
                        "#34d399",
                        // "#4ade80",
                      ],
                      labels: ["dia 1", "dia 2", "dia 3", "dia 4", "dia 5"],
                      plotOptions: {
                        pie: {
                          donut: {
                            labels: {
                              show: true,
                              total: {
                                show: true,
                                fontSize: "20",
                              },
                              value: {
                                show: true,
                                fontSize: "20",
                              },
                              name: {
                                show: false,
                              },
                            },
                            size: "50",
                          },
                        },
                      },
                      dataLabels: {
                        enabled: false,
                      },
                    }}
                  />
                </div>
              </Section>
              <Section title="Nuevo producto" subTitle="Ultimo producto creado">
                <div className="w-full mt-2 flex flex-col border-[1px] border-gray-400 rounded-lg overflow-hidden">
                  <div className="w-full bg-gray-200 flex justify-center relative">
                    <img
                      className="max-h-48"
                      src="https://vcp.com.ar/cdn/shop/files/CurbiNegra2.jpg?v=1747147261&width=700"
                      alt=""
                    />
                    <div className="absolute flex flex-col right-0 top-0 p-4 gap-2">
                      <span className="w-6 h-6 bg-blue-400 rounded-[50%] border-[2px] border-black"></span>
                      <span className="w-6 h-6 bg-gray-400 rounded-[50%] border-[2px] border-black"></span>
                      <span className="w-6 h-6 bg-black rounded-[50%] border-[2px] border-black"></span>
                    </div>
                    <div className="absolute flex flex-col right-[50%] translate-1/2 bottom-0 p-4 gap-2">
                      <span className="bg-violet-200 text-violet-400 px-3 py-1 rounded-lg border-[1px] border-violet-400 font-bold">
                        Puma
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col p-4">
                    <div className="w-full flex justify-between items-center flex-wrap">
                      <h4 className="font-bold text-xl">
                        Remera deportiva de verano
                      </h4>
                      <h4 className="font-bold text-xl">$4000</h4>
                    </div>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Neque, mollitia velit quae optio ad vitae?
                    </p>
                    <div className="w-full flex mt-2 gap-1 flex-wrap justify-center">
                      <span className="text-sm py-1 px-3 rounded-lg border-[1px] border-indigo-400 text-indigo-400 bg-indigo-200">
                        Verano
                      </span>
                      <span className="text-sm py-1 px-3 rounded-lg border-[1px] border-indigo-400 text-indigo-400 bg-indigo-200">
                        Adulto
                      </span>
                      <span className="text-sm py-1 px-3 rounded-lg border-[1px] border-indigo-400 text-indigo-400 bg-indigo-200">
                        Masculino
                      </span>
                    </div>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
