import React, { useState } from 'react';
import { BirthdayState, GalleryPhoto } from '../types/birthday';
import { 
  X, 
  Upload, 
  Edit3, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface GalleryPageProps {
  data: BirthdayState;
  onUpdateGallery: (updatedGallery: BirthdayState['gallery']) => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
  onOpenCustomizer?: (tab?: 'global' | 'gateway' | 'gallery' | 'letter' | 'music' | 'hub' | 'quiz' | 'finale' | 'backup') => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  data,
  onUpdateGallery,
  onNavigatePrev,
  onOpenCustomizer,
}) => {
  const { heading, photos } = data.gallery;
  // Two slides matching the video:
  // Slide 0: "To my love," + photo frame + note (0:15 - 0:17)
  // Slide 1: Photo Collage + Bubu & Dudu hugging sticker (0:18 - 0:20)
  const [slide, setSlide] = useState<0 | 1>(0);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);

  const featuredPhoto = photos[0] || {
    id: 'default',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    caption: 'Happy birthday to my favorite person!',
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const newPhoto: GalleryPhoto = {
            id: 'photo-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            url: result,
            caption: 'Happy birthday to my favorite person! ❤️',
            date: 'Special Moment',
            location: 'With You',
            rotation: 0,
          };
          onUpdateGallery({
            ...data.gallery,
            photos: [newPhoto, ...photos],
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 py-8 overflow-hidden">
      {/* Background: Pastel cyan & white vertical stripes with scattered pink stars (Video 0:15 - 0:20) */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'repeating-linear-gradient(90deg, #E8F4F8, #E8F4F8 28px, #F4FAFC 28px, #F4FAFC 56px)',
        }}
      />

      {/* Decorative Pastel Pink Stars */}
      <div className="absolute top-10 left-6 text-[#F48FB1] text-3xl select-none animate-pulse">★</div>
      <div className="absolute bottom-16 left-8 text-[#F06292] text-3xl select-none">★</div>
      <div className="absolute top-10 right-6 text-[#F06292] text-3xl select-none animate-pulse">★</div>
      <div className="absolute bottom-16 right-8 text-[#F48FB1] text-3xl select-none">★</div>

      <div className="max-w-4xl w-full mx-auto relative">
        {/* SLIDE 0: "To my love," Featured Photo & Note (Video 0:15 - 0:17) */}
        {slide === 0 && (
          <div className="animate-fadeIn bg-white/95 border-2 border-pink-200 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-pink-100/60 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative">
            {/* Left Column: "To my love," Script + Pink border frame with pink stars */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div className="w-full text-left pl-2">
                <h3 className="font-script text-4xl sm:text-5xl text-[#E91E63] mb-3">
                  {heading || 'To my love,'}
                </h3>
              </div>

              <div
                onClick={() => setActiveLightboxIndex(0)}
                className="group relative cursor-pointer bg-white p-3 rounded-2xl shadow-lg border-4 border-[#F8BBD0] max-w-sm w-full transition-transform hover:scale-102 relative"
              >
                {/* Decorative Pink Stars on the photo frame corners */}
                <span className="absolute -top-3 -left-3 text-[#FF4081] text-2xl drop-shadow">★</span>
                <span className="absolute -top-3 -right-3 text-[#FF4081] text-2xl drop-shadow">★</span>
                <span className="absolute -bottom-3 -left-3 text-[#FF4081] text-2xl drop-shadow">★</span>
                <span className="absolute -bottom-3 -right-3 text-[#FF4081] text-2xl drop-shadow">★</span>

                <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-pink-50 border border-pink-100">
                  <img
                    src={featuredPhoto.url}
                    alt={featuredPhoto.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white drop-shadow" />
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-xs text-pink-600 font-bubble font-semibold">
                    Tap photo to view full size
                  </span>
                </div>
              </div>

              {/* Upload photos button */}
              <div className="mt-4">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 font-bubble text-xs font-bold transition-all shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Your Photos</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Right Column: Heartfelt Birthday Message from Video Frame 16 */}
            <div className="w-full md:w-1/2 space-y-4 text-left">
              <div className="space-y-3 font-cute text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                <p className="font-bold text-[#C92A2A] text-lg">
                  Happy Birthday! 🎂
                </p>
                <p>
                  Cheers to another year of amazing memories!
                </p>
                <p>
                  Have the best birthday ever!
                </p>
                <p>
                  You're more than just a friend, you're family.
                </p>
                <p>
                  May your birthday be as wonderful as you are.
                </p>
                <p className="font-bold text-[#E91E63]">
                  Wishing u the absolute best on your special day! ❤️
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setEditingPhoto(featuredPhoto)}
                  className="inline-flex items-center gap-1 text-xs text-pink-600 hover:underline font-cute font-bold"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Customize message</span>
                </button>
              </div>
            </div>

            {/* Red Arrow `>` to go to Slide 1 (Collage) */}
            <button
              onClick={() => setSlide(1)}
              className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D04848] hover:bg-[#B83232] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer z-20"
              title="Next: Photo Collage"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        )}

        {/* SLIDE 1: PHOTO COLLAGE + BUBU & DUDU HUGGING (Video 0:18 - 0:20) */}
        {slide === 1 && (
          <div className="animate-fadeIn bg-white/95 border-2 border-pink-200 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-pink-100/60 relative">
            {/* Left Arrow `<` to return to Slide 0 */}
            <button
              onClick={() => setSlide(0)}
              className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D04848] hover:bg-[#B83232] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer z-20"
              title="Previous Slide"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Right Arrow `>` to return to Surprise Items Hub */}
            <button
              onClick={onNavigatePrev}
              className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D04848] hover:bg-[#B83232] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer z-20"
              title="Return to Surprise Hub"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Photo Collage Layout matching Frame 19 in Reference Video */}
            <div className="max-w-2xl mx-auto py-2">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 p-2">
                {photos.slice(0, 8).map((photo, i) => (
                  <div
                    key={photo.id}
                    onClick={() => setActiveLightboxIndex(i)}
                    className="relative aspect-square rounded-xl overflow-hidden border-2 border-pink-200 shadow-sm cursor-pointer hover:scale-105 hover:border-pink-500 transition-all bg-pink-50"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Speech bubble + Authentic Bubu & Dudu Hugging Sticker from Video Frame 19 */}
            <div className="pt-2 flex items-end justify-between px-2 sm:px-4">
              <span className="text-xs text-slate-500 font-cute font-medium">
                Tap any photo to expand
              </span>

              {/* Bubu & Dudu Hugging with speech bubble: "how cute!" */}
              <div className="flex flex-col items-center">
                <div className="mb-1 px-3 py-1 rounded-full bg-white border border-pink-300 shadow-sm">
                  <span className="font-bubble text-xs text-[#E91E63] font-bold">
                    how cute! ♡
                  </span>
                </div>
                <img
                  src="/assets/bubu_dudu_hug.gif"
                  alt="Bubu and Dudu hugging"
                  className="w-24 sm:w-28 h-auto drop-shadow-sm select-none"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        )}

        {/* Return & Customization Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onNavigatePrev}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-300 text-pink-700 font-bubble text-xs font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            ← Return to Surprise Items Hub
          </button>

          {onOpenCustomizer && (
            <button
              onClick={() => onOpenCustomizer('gallery')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bubble text-xs font-bold shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              📷 Add / Edit Photos
            </button>
          )}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && photos[activeLightboxIndex] && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white border-2 border-pink-300 rounded-3xl overflow-hidden shadow-2xl p-4 text-center"
          >
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={photos[activeLightboxIndex].url}
              alt="Memory"
              className="max-h-[70vh] w-auto mx-auto rounded-2xl object-contain"
            />
            <p className="mt-4 font-cute text-sm text-slate-700 font-medium">
              "{photos[activeLightboxIndex].caption}"
            </p>
          </div>
        </div>
      )}

      {/* QUICK EDIT MODAL */}
      {editingPhoto && (
        <div
          onClick={() => setEditingPhoto(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-white border-2 border-pink-300 rounded-3xl p-6 space-y-4 shadow-2xl"
          >
            <h3 className="font-bubble text-lg text-[#C92A2A] font-bold">Edit Birthday Message</h3>
            <textarea
              rows={3}
              value={editingPhoto.caption}
              onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
              className="w-full bg-pink-50/50 border border-pink-200 rounded-2xl p-3 text-sm text-slate-800 outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingPhoto(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 font-bubble"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updated = photos.map((p) => p.id === editingPhoto.id ? editingPhoto : p);
                  onUpdateGallery({ ...data.gallery, photos: updated });
                  setEditingPhoto(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#D04848] text-white text-xs font-bubble font-bold shadow"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
