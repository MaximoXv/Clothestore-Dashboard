import { Table, Tag } from "antd";
import Header from "../components/header";
import Section from "../components/section";
import { useState } from "react";

interface ProductsPageProps {
  changeStateNavbar: () => void;
}

const ProductsPage = ({ changeStateNavbar }: ProductsPageProps) => {
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
      key: "3",
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
    <main className="w-4/5 min-h-screen bg-gray-100 gap-4 p-6 flex flex-col overflow-auto max-lg:w-full">
      <Header
        key={2}
        title="Productos"
        subTitle="Toda la información de los productos registrados"
        changeStateNavbar={changeStateNavbar}
      />
      <Section title="Tabla de productos" subTitle="Información registrada">
        <Table
          scroll={{ x: "max-content" }}
          bordered
          className="mt-2"
          dataSource={products}
          columns={columns}
        />
      </Section>
    </main>
  );
};

export default ProductsPage;
