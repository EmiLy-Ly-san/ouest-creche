import type { Nursery, User } from "../types";

interface ModalSelectChildrenProps {
  user: User;
  nursery: Nursery;
  selectedChildren: string[];
  toggleChild: (child: string, max: number) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ModalSelectChildren({
  user,
  nursery,
  selectedChildren,
  toggleChild,
  onConfirm,
  onClose,
}: ModalSelectChildrenProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
      <div className="bg-[#feffee] rounded-2xl shadow-xl p-6 w-80 text-center">
        <h2 className="text-lg font-semibold mb-3">Hello {user.prenom} 👋</h2>
        <p className="text-gray-700 mb-3">
          Choisissez les enfants pour <strong>{nursery.name}</strong>:
        </p>

        <div className="flex flex-col gap-2 mb-4">
          {user.enfants.map((child) => (
            <button
              key={child}
              onClick={() => toggleChild(child, nursery.placesDispo)}
              className={`py-2 rounded-lg border transition flex-1 
        ${selectedChildren.includes(child)
                  ? "border-[#202940] bg-[#202940] text-white"
                  : "border-[#202940] text-[#202940] hover:bg-[#202940] hover:text-white"
                }`}
            >
              {child}
            </button>
          ))}
        </div>

        <button
          onClick={onConfirm}
          className="bg-[#202940] text-white px-4 py-2 rounded-lg hover:bg-[#495d8b] transition"
        >
          Confirmer
        </button>

        <button
          onClick={onClose}
          className="mt-3 ml-3 text-sm text-gray-500 hover:text-gray-700"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

