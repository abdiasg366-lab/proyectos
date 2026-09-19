import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Heart } from 'lucide-react';
import { CoupleConfig } from '../types';

interface CustomizeModalProps {
  config: CoupleConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: CoupleConfig) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave,
}) => {
  const [recipient, setRecipient] = useState(config.recipientName);
  const [sender, setSender] = useState(config.senderName);
  const [message, setMessage] = useState(config.customMessage || '');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...config,
      recipientName: recipient.trim() || 'Mi niña hermosa',
      senderName: sender.trim() || 'Quien te ama',
      customMessage: message.trim(),
    });
    onClose();
  };

  const handleCopyShareLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    if (recipient) params.set('para', recipient.trim());
    if (sender) params.set('de', sender.trim());
    if (message) params.set('msg', message.trim());

    const fullShareUrl = `${baseUrl}?${params.toString()}`;
    navigator.clipboard.writeText(fullShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl border border-rose-200 bg-[#fffdfa] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-stone-400 hover:bg-rose-50 hover:text-stone-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-rose-600">
          <Heart className="h-5 w-5 fill-rose-500" />
          <h2 className="font-serif text-xl font-bold text-rose-950">
            Personalizar este Detalle de Amor
          </h2>
        </div>

        <p className="mt-1 text-xs text-stone-600">
          Personaliza los nombres para que el sobre, la carta y las dedicatorias lleven sus nombres reales.
        </p>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              ¿Para quién es? (Su nombre o apodo cariñoso)
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Ej: Valentina, Mi amor, Princesa..."
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-2xs focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              ¿De parte de quién? (Tu nombre o apodo)
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Ej: Alejandro, Tu niño, Quien más te ama..."
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-2xs focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Mensaje personal adicional (opcional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe una frase íntima o algo especial que quieras decirle hoy 20 de septiembre..."
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-2xs focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none"
            />
          </div>

          {/* Share link button */}
          <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3.5 text-center">
            <span className="text-xs text-rose-900 font-medium block mb-2">
              ¿Quieres enviárselo directamente con estos nombres configurados?
            </span>
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-rose-800 shadow-2xs hover:bg-rose-100/50 transition"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>¡Enlace copiado para compartir!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-rose-600" />
                  <span>Copiar enlace personalizado con estos nombres</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-full bg-rose-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 transition active:scale-95"
            >
              Guardar y Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
