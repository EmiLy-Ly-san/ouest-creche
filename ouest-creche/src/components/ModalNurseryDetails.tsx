import type { Nursery } from "../types";

interface ModalNurseryDetailsProps {
  nursery: Nursery;
  onReserve: () => void;
  onNotify: () => void;
  onClose: () => void;
}

export default function ModalNurseryDetails({
  nursery,
  onReserve,
  onNotify,
  onClose,
}: ModalNurseryDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
      <div className="bg-white rounded-2xl shadow-xl p-5 w-80 max-w-[90%] text-center">
        {nursery.image && (
          <img
            src={nursery.image}
            alt={nursery.name}
            className="h-40 w-full object-cover rounded-xl mb-3"
          />
        )}
        <h2 className="text-xl font-semibold">{nursery.name}</h2>
        <p className="text-gray-600">{nursery.ville}</p>
        <p className="mt-2">
          {nursery.placesDispo > 0 ? (
            <span className="text-green-600 font-medium">
              {nursery.placesDispo} place disponible
              {nursery.placesDispo > 1 ? "s" : ""}
            </span>
          ) : (
            <span className="text-red-500 font-medium">Aucune place disponible</span>
          )}
        </p>

        <div className="mt-4 flex gap-2">
          {nursery.placesDispo > 0 ? (
            <button
              onClick={onReserve}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Reserver
            </button>
          ) : (
            <button
              onClick={onNotify}
              className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Être notifié
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
