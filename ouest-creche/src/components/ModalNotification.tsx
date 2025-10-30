import type { Nursery, User } from "../types";

interface ModalNotificationProps {
  user: User;
  nursery: Nursery;
  entreprise: string;
  onClose: () => void;
}

export default function ModalNotification({
  user,
  nursery,
  entreprise,
  onClose,
}: ModalNotificationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
        <h2 className="text-lg font-semibold mb-3">Hello {user.prenom} 👋</h2>
        <p className="text-gray-700">
          Vous recevrez une notification si une place se libère pour la
          <strong>{nursery.name}</strong>.
        </p>
        <p className="mt-3 text-gray-700">
          Votre entreprise <strong>{entreprise}</strong> sera notifié de votre recherche.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-[#202940] text-white px-4 py-2 rounded-lg hover:bg-[#495d8b] transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}