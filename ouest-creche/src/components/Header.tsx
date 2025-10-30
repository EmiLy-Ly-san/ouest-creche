
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-[#202940] shadow-md h-[50px] flex items-center p-3 justify-between">
      <Link to="/" className="transition">
        <img src="logo.svg" alt="Logo Tribu" />
      </Link>
      <img src="menu-burger.png" alt="" />
    </header>
  );
}