import { useState } from "react";
import type { Nursery, User } from "../types";

interface ModalNotificationProps {
  user: User;
  nursery: Nursery;
  entreprise: string;
  onClose: () => void;
}

export default function ModalNotification({
  onClose,
}: ModalNotificationProps) {
  const [choices, setChoices] = useState({
    notif: false,
    newsletter: false,
    rh: false,
  });

  const toggleChoice = (key: keyof typeof choices) => {
    setChoices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] px-4">
      <div className="relative bg-[#FEFFF2] rounded-3xl shadow-xl p-6 w-full max-w-sm text-gray-900 text-left">
        {/* ❌ Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#202940] hover:text-[#7162F0] transition"
          aria-label="Fermer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* En-tête */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src="couche.svg"
            alt="Icône triste"
            className="w-6 h-6 text-[#7162F0]"
          />
          <h2 className="text-[#202940] text-lg font-semibold">
            Malheureusement …
          </h2>
        </div>

        <p className="text-sm text-[#202940] mb-5">
          Pas de place disponible pour le moment…
          <br />
          mais plusieurs solutions s’offrent à vous 💡
        </p>

        {/* Liste des options */}
        <div className="space-y-4 mb-6">
          {/* Option 1 */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={choices.notif}
              onChange={() => toggleChoice("notif")}
              className="mt-1 w-4 h-4 accent-[#7162F0] cursor-pointer"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <img src="mail-round.svg" alt="" className="w-4 h-4 opacity-80" />
                <span className="font-semibold text-[#202940]">
                  Recevoir une{" "}
                  <mark className="bg-[#d9f855] px-0.5 rounded-sm">
                    notification
                  </mark>
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-tight mt-0.5">
                Soyez averti dès qu’une place se libère dans une crèche
                partenaire.
              </p>
            </div>
          </label>

          {/* Option 2 */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={choices.newsletter}
              onChange={() => toggleChoice("newsletter")}
              className="mt-1 w-4 h-4 accent-[#7162F0] cursor-pointer"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <img src="mail.svg" alt="" className="w-4 h-4 opacity-80" />
                <span className="font-semibold text-[#202940]">
                  S’abonner à la{" "}
                  <mark className="bg-[#d9f855] px-0.5 rounded-sm">
                    newsletter
                  </mark>
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-tight mt-0.5">
                Découvrez nos conseils pour les jeunes parents et restez
                informé des nouvelles ouvertures.
              </p>
            </div>
          </label>

          {/* Option 3 */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={choices.rh}
              onChange={() => toggleChoice("rh")}
              className="mt-1 w-4 h-4 accent-[#7162F0] cursor-pointer"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <img src="tel.svg" alt="" className="w-4 h-4 opacity-80" />
                <span className="font-semibold text-[#202940]">
                  <mark className="bg-[#d9f855] px-0.5 rounded-sm">
                    Contacter
                  </mark>{" "}
                  votre RH
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-tight mt-0.5">
                Proposez un partenariat entre votre entreprise et notre solution
                pour faciliter l’accès aux crèches.
              </p>
            </div>
          </label>
        </div>

        {/* Bouton Suivant */}
        <button
          onClick={onClose}
          disabled={!choices.notif && !choices.newsletter && !choices.rh}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition ${choices.notif || choices.newsletter || choices.rh
              ? "bg-[#202940] hover:bg-[#495d8b]"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

