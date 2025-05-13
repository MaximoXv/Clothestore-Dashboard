import { clx } from "./utils/clx";

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
          ? "bg-gray-200 text-violet-500 font-bold text-md"
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
    <div className="flex gap-3">
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

function App() {
  return (
    <>
      <div className="w-full flex">
        <header className="w-1/5 p-4">
          <aside className=" w-full flex">
            <ul className="w-full flex flex-col gap-1">
              <ListItem label="Dashboard" icon="fa-house" active />
              <ListItem label="Clientes" icon="fa-users" />
              <ListItem label="Productos" icon="fa-cart-shopping" />
              <ListItem label="Configuración" icon="fa-gear" />
            </ul>
          </aside>
        </header>
        <main className="w-4/5 bg-gray-100 gap-4 p-6 flex flex-col">
          <div className="flex">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-gray-400">
                Información detallada de tu tienda
              </p>
            </div>
          </div>
          <div className="flex bg-white p-10 rounded-lg shadow-2xl justify-around">
            <SectionPanel
              textColor="text-orange-400"
              iconBgColor="bg-orange-200"
              icon="fa-shopping-cart"
              label="Productos totales"
              value="20000"
            />
            <SectionPanel
              textColor="text-violet-400"
              iconBgColor="bg-violet-200"
              icon="fa-users"
              label="Usuarios totales"
              value="20000"
            />
            <SectionPanel
              textColor="text-blue-400"
              iconBgColor="bg-blue-200"
              icon="fa-box-archive"
              label="Categorias totales"
              value="7"
            />
          </div>
          <div className="flex bg-white p-10 rounded-lg shadow-2xl justify-around"></div>
        </main>
      </div>
    </>
  );
}

export default App;
