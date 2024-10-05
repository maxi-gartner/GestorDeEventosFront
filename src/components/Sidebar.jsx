import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar({ open, setOpen, navigation }) {
  return (
    <div
      className={`${open ? "block" : "hidden"} lg:hidden h-screen`}
      onClick={() => setOpen(!open)}
    >
      <div className="space-y-1 px-2 pb-3 pt-2 bg-[#312e31] sm:max-w-sm sm:rounded-none sm:rounded-br-lg sm:rounded-bl">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.name}
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className={classNames(
              item.current
                ? "font-extrabold text-yellow-500 shadow-md shadow-black/30 hover:bg-[#1c1d21]"
                : "text-white hover:bg-[#1c1d21] hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
