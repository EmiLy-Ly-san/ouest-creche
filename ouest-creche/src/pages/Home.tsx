import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div
      className="h-main flex flex-col items-center justify-center bg-pink-50 text-center"
    >
      <h1 className="text-4xl font-bold text-pink-700 mb-6">
        Tu crèches où 👶 ?
      </h1>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          `text-lg px-6 py-2 rounded-full transition ${isActive
            ? 'bg-pink-700 text-white shadow-md'
            : 'bg-pink-600 hover:bg-pink-700 text-white'
          }`
        }
      >
        Voir les places disponibles 🔍
      </NavLink>
    </div>
  );
}
