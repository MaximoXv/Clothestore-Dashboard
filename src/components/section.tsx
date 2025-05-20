interface SectionProps {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
}

const Section = ({ title, subTitle, children }: SectionProps) => {
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

export default Section;
