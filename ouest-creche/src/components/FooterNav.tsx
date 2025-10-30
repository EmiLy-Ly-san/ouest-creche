export default function FooterNav() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#202940] text-white flex justify-around items-center py-3 z-50">
      <button className="flex flex-col items-center text-center focus:outline-none">
        <img
          src="home-icon.png"
          alt="Crèches"
          className="w-6 h-6 mb-1"
        />
      </button>

      <button className="flex flex-col items-center text-center focus:outline-none">
        <img
          src="valise-icon.png"
          alt="Valise"
          className="w-6 h-6 mb-1"
        />
      </button>

      <button className="flex flex-col items-center text-center focus:outline-none">
        <img
          src="profil-icon.png"
          alt="Profil"
          className="w-6 h-6 mb-1"
        />
      </button>
    </footer>
  );
}