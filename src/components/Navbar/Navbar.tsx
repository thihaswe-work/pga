const Navbar = () => {
  return (
    <ul className="flex ">
      <li>
        <img src="/logo.svg" alt="logo" width={50} height={50} />
      </li>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/setting">Setting</a>
      </li>
    </ul>
  );
};

export default Navbar;
