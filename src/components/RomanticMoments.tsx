import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Sparkles,
  Maximize2,
  X,
  Upload,
  ChevronLeft,
  ChevronRight,
  Camera,
  Trash2,
  Image as ImageIcon,
  Wifi,
  Gamepad2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audioSynth';

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  dateTag?: string;
  isCustom?: boolean;
}

interface RomanticMomentsProps {
  recipientName?: string;
  senderName?: string;
}

export const RomanticMoments: React.FC<RomanticMomentsProps> = ({
  recipientName = 'Nashalie',
  senderName = 'Abdias',
}) => {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      // Clear any previous references to the unwanted generated photo
      localStorage.removeItem('romantic_photos_nashalie_real_v3');
      const saved = localStorage.getItem('romantic_photos_nashalie_user_v4');
      if (saved) {
        const parsed: PhotoItem[] = JSON.parse(saved);
        // Filter out any potential legacy generated photo
        const filtered = parsed.filter(
          (p) => p.url && !p.url.includes('nashalie.jpg') && p.id !== 'photo-nashalie-main'
        );
        return filtered;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<PhotoItem | null>(null);
  const [heartLiked, setHeartLiked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('romantic_photos_nashalie_user_v4', JSON.stringify(photos));
    } catch {
      // ignore storage quota error
    }
  }, [photos]);

  // Adjust index if out of bounds after deletion
  useEffect(() => {
    if (currentIndex >= photos.length && photos.length > 0) {
      setCurrentIndex(photos.length - 1);
    }
  }, [photos.length, currentIndex]);

  const currentPhoto = photos[currentIndex];

  const handleNext = () => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    romanticAudio.playSoftPop();
  };

  const handlePrev = () => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    romanticAudio.playSoftPop();
  };

  const handleLoveClick = () => {
    setHeartLiked(true);
    romanticAudio.playChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fb7185', '#f43f5e', '#ec4899'],
    });
    setTimeout(() => setHeartLiked(false), 800);
  };

  const handleDeleteCurrent = (idToDelete: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== idToDelete));
    romanticAudio.playSoftPop();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        if (resultUrl) {
          const newPhoto: PhotoItem = {
            id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            url: resultUrl,
            title: `Mi Niña Hermosa, ${recipientName}`,
            caption: `La carita más linda del mundo entero. Cada vez que te veo, me vuelvo a enamorar como el primer día.`,
            dateTag: 'Recuerdo Especial',
            isCustom: true,
          };
          setPhotos((prev) => [newPhoto, ...prev]);
          setCurrentIndex(0);
          romanticAudio.playChime();
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b'],
          });
        }
      };
      reader.readAsDataURL(file);
    });

    if (e.target) {
      e.target.value = '';
    }
  };

  return (
    <section id="momentos" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-800 shadow-2xs">
          <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
          <span>Nuestras Fotos</span>
          <span className="text-rose-300">•</span>
          <span>{recipientName} & {senderName}</span>
        </div>
        <h2 className="mt-3 font-serif text-3xl font-bold text-rose-950 sm:text-4xl">
          La Dueña de Mi Corazón
        </h2>
        <p className="mt-2 text-sm text-stone-600 max-w-lg mx-auto">
          No hay distancia que opaque tu belleza ni tu luz. Eres lo más lindo que me ha pasado, mi compañera de Roblox y el amor de mi vida.
        </p>
      </div>

      {/* Hidden file input accessible anywhere */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Photo Frame Container */}
      <div className="mt-8 relative mx-auto max-w-md">
        {/* Decorative Tape Badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full border border-amber-200/90 bg-amber-100/95 px-4 py-1 text-[11px] font-bold text-amber-900 shadow-xs uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>{recipientName} & {senderName}</span>
        </div>

        {/* If photos exist: display Polaroid */}
        {photos.length > 0 && currentPhoto ? (
          <div className="overflow-hidden rounded-3xl border border-rose-200/80 bg-white p-4 sm:p-6 shadow-xl transition hover:shadow-2xl">
            {/* Photo Stage */}
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-stone-100 shadow-inner group">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
              />

              {/* Tags over photo */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs">
                  <Wifi className="h-3 w-3 text-rose-300" />
                  <span>Amor a Distancia</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs">
                  <Gamepad2 className="h-3 w-3 text-emerald-300" />
                  <span>Roblox Duo</span>
                </span>
              </div>

              {/* Action buttons on photo */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {/* Delete button to delete photo directly */}
                <button
                  onClick={() => handleDeleteCurrent(currentPhoto.id)}
                  title="Eliminar esta foto"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-rose-300 backdrop-blur-xs transition hover:bg-rose-600 hover:text-white hover:scale-110 active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Fullscreen button */}
                <button
                  onClick={() => setFullscreenPhoto(currentPhoto)}
                  title="Ver en pantalla completa"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs transition hover:bg-black/75 hover:scale-110 active:scale-95"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {/* Next/Prev buttons if multiple photos */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-rose-950 shadow-md backdrop-blur-xs hover:bg-white transition"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-rose-950 shadow-md backdrop-blur-xs hover:bg-white transition"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Floating Love Button */}
              <button
                onClick={handleLoveClick}
                className={`absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full border border-rose-300 bg-white/90 text-rose-600 shadow-md backdrop-blur-xs transition hover:scale-110 active:scale-90 ${
                  heartLiked ? 'scale-125 bg-rose-500 text-white' : ''
                }`}
                title="Enviar amor"
              >
                <Heart className={`h-6 w-6 transition-transform ${heartLiked ? 'fill-white' : 'fill-rose-500'}`} />
              </button>
            </div>

            {/* Caption & Title */}
            <div className="pt-5 pb-2 text-center">
              <h3 className="font-serif text-xl font-bold text-rose-950">
                {currentPhoto.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 max-w-sm mx-auto italic font-serif">
                &ldquo;{currentPhoto.caption}&rdquo;
              </p>
            </div>

            {/* Bottom Bar: Add more photos */}
            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-stone-500">
              <span>{photos.length} foto{photos.length !== 1 ? 's' : ''} • 20 de Septiembre</span>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition active:scale-95"
              >
                <Camera className="h-3.5 w-3.5 text-rose-500" />
                <span>Añadir foto</span>
              </button>
            </div>
          </div>
        ) : (
          /* If no photos: Show clean romantic photo upload card */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer group overflow-hidden rounded-3xl border-2 border-dashed border-rose-300 bg-white/90 p-8 sm:p-10 shadow-lg text-center transition hover:border-rose-400 hover:bg-rose-50/40 hover:shadow-xl"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 group-hover:scale-110 transition duration-300 shadow-sm">
              <Upload className="h-8 w-8 text-rose-600" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-bold text-rose-950">
              Coloca aquí la foto de Nashalie
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xs mx-auto">
              Haz clic aquí para seleccionar la foto de tu niña hermosa desde tu teléfono o computadora.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2.5 text-xs font-bold text-white shadow-md group-hover:from-rose-600 group-hover:to-pink-600 transition">
              <Camera className="h-4 w-4" />
              <span>Subir Foto de Nashalie</span>
            </div>

            <div className="mt-4 text-[11px] text-stone-400">
              Se guardará automáticamente en el marco de recuerdos de la página
            </div>
          </div>
        )}

        {/* Thumbnail dots if multiple photos */}
        {photos.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-6 bg-rose-600'
                    : 'w-2 bg-rose-200 hover:bg-rose-300'
                }`}
                aria-label={`Foto ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {fullscreenPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <button
              onClick={() => setFullscreenPhoto(null)}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={fullscreenPhoto.url}
              alt={fullscreenPhoto.title}
              className="max-h-[75vh] w-auto mx-auto object-contain"
            />
            <div className="p-4 text-center bg-white">
              <h4 className="font-serif text-lg font-bold text-rose-950">
                {fullscreenPhoto.title}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                {fullscreenPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
