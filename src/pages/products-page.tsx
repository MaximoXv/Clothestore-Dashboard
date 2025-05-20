import { Table, Tag } from "antd";
import Header from "../components/header";
import Section from "../components/section";
import { useEffect, useState } from "react";

interface ProductsPageProps {
  changeStateNavbar: () => void;
}

interface Product {
  key: number;
  name: string;
  description: string;
  model: string;
  price: number;
  stock: number;
  branch: string;
  categories: string[];
  image: string;
  colors: string[];
  sizes: string[];
}

const ProductsPage = ({ changeStateNavbar }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);

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
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Marca",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Categorias",
      dataIndex: "categories",
      key: "categories",
      // fixed: "right",
      render: (_, { categories }) => {
        const myClassName = "!text-violet-400 !border-0 !bg-violet-200";

        return categories.map((category) => (
          <Tag className={myClassName}>{category.toUpperCase()}</Tag>
        ));
      },
    },
    {
      title: "Colores",
      dataIndex: "colors",
      key: "colors",
      // fixed: "right",
      render: (_, { colors }) => {
        return colors.map((color) => {
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
            <Tag
              className={`!w-6 !h-6 !rounded-[50%] !border-[2px] !border-black ${auxColor}`}
            ></Tag>
          );
        });
      },
    },
    {
      title: "Tamaños",
      dataIndex: "sizes",
      key: "sizes",
      // fixed: "right",
      render: (_, { sizes }) => {
        const myClassName = "!text-violet-400 !border-0 !bg-violet-200";

        return sizes.map((size) => (
          <Tag className={myClassName}>{size.toUpperCase()}</Tag>
        ));
      },
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        const productArray = data.map((product) => {
          const auxProduct: Product = {
            key: product.id,
            name: product.name,
            description: product.description,
            model: product.model,
            price: product.price,
            stock: product.stock,
            branch: product.branch.name,
            categories: [
              product.season.name,
              product.age.name,
              product.genre.name,
            ],
            image: product.Images[0].url,
            colors: product.Colors.map((color) => color.value),
            sizes: product.Sizes.map((size) => size.name),
          };
          return auxProduct;
        });
        setProducts(productArray);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchProducts();
  }, []);
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
