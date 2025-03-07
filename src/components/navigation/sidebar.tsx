import { paths } from "@/config/paths";

export const SideBar = () => {
  return (
    <div className="flex flex-col p-6">
      <div className="mb-11">
        <img
          src="/logo.svg"
          alt="logo"
          width={198}
          height={54}
          className="mx-auto bg-cover"
        />
      </div>
      {paths.app.map((item) => {
        return (
          <div key={item.path} className="mb-4">
            <a
              href={item.path}
              className="flex items-center space-x-4 text-white"
            >
              {item.name}
            </a>
          </div>
        );
      })}
    </div>
  );
};
