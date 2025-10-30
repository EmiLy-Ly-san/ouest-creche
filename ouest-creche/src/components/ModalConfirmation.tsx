import type { Nursery, User } from "../types";

interface ModalConfirmationProps {
  user: User;
  nursery: Nursery;
  children: string[];
  onClose: () => void;
}

export default function ModalConfirmation({
  user,
  nursery,
  children,
  onClose,
}: ModalConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
        <h2 className="text-lg font-semibold mb-3">Merci {user.prenom} 🎉</h2>
        <p className="text-gray-700">
          Votre place a bien été réservée à <strong>{nursery.name}</strong> pour
          {children.join(" and ")}.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Un e-mail de confirmation vous sera envoyé prochainement.
        </p>

        <button
          onClick={onClose}
          className="mt-4 bg-[#202940] text-white px-4 py-2 rounded-lg hover:bg-[#495d8b] transition"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
