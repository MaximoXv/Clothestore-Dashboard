interface HeaderProps {
  title: string;
  subTitle: string;

  changeStateNavbar: () => void;
}

const Header = ({ title, subTitle, changeStateNavbar }: HeaderProps) => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-400">{subTitle}</p>
      </div>
      <div
        onClick={changeStateNavbar}
        className="w-10 h-10 hover:bg-gray-300 hidden max-lg:flex items-center justify-center rounded-lg shadow-3xl transition-all cursor-pointer"
      >
        <i className="fa-solid fa-bars"></i>
      </div>
    </div>
  );
};

export default Header;
