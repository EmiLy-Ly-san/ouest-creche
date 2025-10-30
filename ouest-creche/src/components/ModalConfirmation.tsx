import type { Nursery, User } from "../types";

interface ModalConfirmationProps {
  user: User;
  nursery: Nursery;
  selectedChildren: string[];
  onClose: () => void;
}

export default function ModalConfirmation({
  user,
  nursery,
  selectedChildren = [], // ← valeur par défaut de sécurité
  onClose,
}: ModalConfirmationProps) {
  const canConfirm =
    Array.isArray(selectedChildren) && selectedChildren.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] px-4">
      <div className="relative bg-[#FEFFF2] rounded-3xl shadow-xl p-6 w-full max-w-sm text-center text-[#202940]">
        {/* Croix */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#202940] hover:text-[#7162F0] transition"
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg font-semibold mb-3">Merci {user.prenom} 🎉</h2>

        <p className="text-gray-700">
          Votre place a bien été réservée à <strong>{nursery.name}</strong>{" "}
          {canConfirm && <>pour <strong>{selectedChildren.join(", ")}</strong>.</>}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Un e-mail de confirmation vous sera envoyé prochainement.
        </p>

        <button
          type="button"
          onClick={onClose}
          disabled={!canConfirm}
          className="
            w-full mt-6 py-2.5 rounded-lg font-semibold text-white transition
            bg-[#202940] hover:bg-[#495d8b]
          "
        >
          Confirmer
        </button>
      </div>
    </div>
  );
}




