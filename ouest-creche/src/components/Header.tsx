
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <Link to="/" className="text-2xl font-bold text-pink-700 hover:text-pink-800 transition">
        La Tribu
      </Link>
    </header>
  );
}