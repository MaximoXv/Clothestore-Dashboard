import { Table, Tag } from "antd";
import ReactApexChart from "react-apexcharts";
import { clx } from "../utils/clx";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Section from "../components/section";

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

interface DashboardPageProps {
  changeStateNavbar: () => void;
}

interface Sale {
  key: number;
  image: string;
  name: string;
  model: string;
  branch: string;
  price: number;
  status: string;
}

interface AgeCategories {
  id: number;
  name: string;
  productCount: number;
}

interface BranchSales {
  branchId: number;
  branchName: string;
  salesCount: number[];
}

interface Totals {
  totalProducts: number;
  totalUsers: number;
  totalCategories: number;
}

interface LastProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  branch: string;
  image: string;
  colors: string[];
  season: string;
  age: string;
  genre: string;
}

const DashboardPage = ({ changeStateNavbar }: DashboardPageProps) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [lastProduct, setLastProduct] = useState<LastProduct>({
    id: 0,
    name: "",
    description: "",
    image: "",
    price: 0,
    branch: "",
    age: "",
    genre: "",
    season: "",
    colors: [],
  });
  const [ageCategories, setAgeCategories] = useState<AgeCategories[]>([]);
  const [branchSales, setBranchSales] = useState<BranchSales[]>([]);
  const [totals, setTotals] = useState<Totals>({
    totalProducts: 0,
    totalUsers: 0,
    totalCategories: 0,
  });

  const columns = [
    {
      title: "Imagen",
      dataIndex: "image",
      key: "image",
      // fixed: "left",
      render: (_, { image }) => {
        return (
          <img
            className="h-12 w-12 object-cover rounded-[50%]"
            src={`http://localhost:3000/images/${image}`}
          />
        );
      },
    },
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

        return (
          <Tag className={myClassName} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/sales");
        const data = await response.json();
        const saleArray = data.map((sale) => {
          const auxSale: Sale = {
            key: sale.id,
            image: sale.product.Images[0].url,
            name: sale.product.name,
            model: sale.product.model,
            branch: sale.product.branch.name,
            price: sale.price,
            status: sale.status,
          };
          return auxSale;
        });
        setSales(saleArray);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    const fetchAgeCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/ageCategories");
        const data = await response.json();

        setAgeCategories(data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    const fetchBranchSales = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/branchSales");
        const data = await response.json();

        setBranchSales(data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    const fetchTotals = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getTotals");
        const data = await response.json();

        setTotals(data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    const fetchLastProduct = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/lastProduct");
        const data = await response.json();
        const lastProd: LastProduct = {
          id: data.id,
          name: data.name,
          description: data.description,
          image: data.Images[0].url,
          price: data.price,
          branch: data.branch.name,
          age: data.age.name,
          genre: data.genre.name,
          season: data.season.name,
          colors: data.Colors.map((color) => color.value),
        };
        setLastProduct(lastProd);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchSales();
    fetchBranchSales();
    fetchAgeCategories();
    fetchTotals();
    fetchLastProduct();
  }, []);
  return (
    <>
      <main className="w-4/5 bg-gray-100 gap-4 p-6 flex flex-col overflow-auto max-lg:w-full">
        <Header
          key={1}
          title="Dashboard"
          subTitle="Información detallada de tu tienda"
          changeStateNavbar={changeStateNavbar}
        />
        <div className="flex bg-white gap-3 p-10 rounded-lg shadow-2xl justify-around w-full flex-wrap">
          <div
            className={"flex justify-evenly grow max-sm:flex-wrap max-sm:gap-3"}
          >
            <SectionPanel
              textColor="text-violet-400"
              iconBgColor="bg-violet-200"
              icon="fa-shopping-cart"
              label="Productos totales"
              value={totals.totalProducts.toString()}
            />
            <SectionPanel
              textColor="text-indigo-400"
              iconBgColor="bg-indigo-200"
              icon="fa-users"
              label="Usuarios totales"
              value={totals.totalUsers.toString()}
            />
          </div>
          <div
            className={"flex justify-evenly grow max-sm:flex-wrap max-sm:gap-3"}
          >
            <SectionPanel
              textColor="text-blue-400"
              iconBgColor="bg-blue-200"
              icon="fa-box-archive"
              label="Categorias totales"
              value={totals.totalCategories.toString()}
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
                  // series={[
                  //   {
                  //     name: "Nike",
                  //     data: [31, 40, 28],
                  //   },
                  //   {
                  //     name: "Puma",
                  //     data: [11, 32, 45],
                  //   },
                  // ]}
                  series={branchSales.map((branch) => ({
                    name: branch.branchName,
                    data: branch.salesCount,
                  }))}
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
                dataSource={sales}
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
                  series={ageCategories.map((age) => age.productCount)}
                  options={{
                    colors: [
                      "#a78bfa",
                      "#818cf8",
                      "#60a5fa",
                      "#38bdf8",
                      "#34d399",
                      // "#4ade80",
                    ],
                    labels: ageCategories.map((age) => age.name),
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
                    src={`http://localhost:3000/images/${lastProduct.image}`}
                    alt=""
                  />
                  <div className="absolute flex flex-col right-0 top-0 p-4 gap-2">
                    {lastProduct.colors.map((color) => {
                      const auxColor =
                        color == "#181818"
                          ? "!bg-black"
                          : color == "#f3f3f3"
                          ? "!bg-white"
                          : color == "#b8b8b8"
                          ? "!bg-zinc-400"
                          : color == "#4177eb"
                          ? "!bg-blue-500"
                          : "!bg-white";
                      return (
                        <span
                          className={`!w-6 !h-6 !rounded-[50%] !border-[2px] !border-black ${auxColor}`}
                        ></span>
                      );
                    })}
                  </div>
                  <div className="absolute flex flex-col right-[50%] translate-1/2 bottom-0 p-4 gap-2">
                    <span className="bg-violet-200 text-violet-400 px-3 py-1 rounded-lg border-[1px] border-violet-400 font-bold">
                      {lastProduct.branch}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-4">
                  <div className="w-full flex justify-between items-center flex-wrap">
                    <h4 className="font-bold text-xl">{lastProduct.name}</h4>
                    <h4 className="font-bold text-xl">${lastProduct.price}</h4>
                  </div>
                  <p className="text-sm">{lastProduct.description}</p>
                  <div className="w-full flex mt-2 gap-1 flex-wrap justify-center">
                    <span className="text-sm py-1 px-3 rounded-lg border-[1px] border-indigo-400 text-indigo-400 bg-indigo-200">
                      {lastProduct.season}
                    </span>
                    <span className="text-sm py-1 px-3 rounded-lg border-[1px] border-indigo-400 text-indigo-400 bg-indigo-200">
                      {lastProduct.age}
                    </span>
                    <span className="text-sm py-1 px-3 rounded-lg border-[1px] border-indigo-400 text-indigo-400 bg-indigo-200">
                      {lastProduct.genre}
                    </span>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
