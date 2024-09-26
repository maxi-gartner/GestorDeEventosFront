const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "SignUp", href: "#", current: false },
  { name: "SignIn", href: "#", current: false },
  { name: "EventS", href: "#", current: false },
  { name: "About Us", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar({ open, setOpen }) {
  return (
    <div
      className={`${open ? "block" : "hidden"} sm:hidden h-screen`}
      onClick={() => setOpen(!open)}
    >
      <div className="space-y-1 px-2 pb-3 pt-2 bg-[#312e31]">
        {navigation.map((item) => (
          <a
            key={item.name}
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
          </a>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
