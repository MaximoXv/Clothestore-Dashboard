import { Table, Tag } from "antd";
import Header from "../components/header";
import Section from "../components/section";
import { useEffect, useState } from "react";

interface ClientsPageProps {
  changeStateNavbar: () => void;
}

interface User {
  key: number;
  fullname: string;
  direction: string;
  phonenumber: number;
  email: string;
  avatar: string;
  role: string;
}

const ClientsPage = ({ changeStateNavbar }: ClientsPageProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const columns = [
    {
      title: "Imagen",
      dataIndex: "avatar",
      key: "avatar",
      // fixed: "left",
      render: (_, { avatar }) => {
        return (
          <img
            className="h-12 w-12 object-cover rounded-[50%]"
            src={`http://localhost:3000/images/users/${avatar}`}
          />
        );
      },
    },
    {
      title: "Nombre",
      dataIndex: "fullname",
      key: "fullname",
      // fixed: "left",
    },
    {
      title: "Dirección",
      dataIndex: "direction",
      key: "direction",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Télefono",
      dataIndex: "phonenumber",
      key: "phonenumber",
      // fixed: "right",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      // fixed: "right",
      render: (_, { role }) => {
        const myClassName =
          role == "ADMIN"
            ? "!text-violet-400 !border-0 !bg-violet-200"
            : role == "CLIENT"
            ? "!text-indigo-400 !border-0 !bg-indigo-200"
            : role == "SELLER"
            ? "!text-blue-400 !border-0 !bg-blue-200"
            : "!text-sky-400 !border-0 !bg-sky-200";

        const auxRole =
          role == "ADMIN"
            ? "Administrador"
            : role == "CLIENT"
            ? "Cliente"
            : role == "SELLER"
            ? "Vendedor"
            : "Desconocido";

        return <Tag className={myClassName}>{auxRole.toUpperCase()}</Tag>;
      },
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        console.log(data);
        const userArray = data.map((user) => {
          const auxUser: User = {
            key: user.id,
            avatar: user.avatar,
            fullname: user.fullname,
            direction: user.direction,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role.name,
          };
          return auxUser;
        });
        setUsers(userArray);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <main className="w-4/5 min-h-screen bg-gray-100 gap-4 p-6 flex flex-col overflow-auto max-lg:w-full">
      <Header
        key={2}
        title="Clientes"
        subTitle="Toda la informacion de los clientes registrados"
        changeStateNavbar={changeStateNavbar}
      />
      <Section title="Tabla de clientes" subTitle="Información registrada">
        <Table
          scroll={{ x: "max-content" }}
          bordered
          className="mt-2"
          dataSource={users}
          columns={columns}
        />
      </Section>
    </main>
  );
};

export default ClientsPage;
