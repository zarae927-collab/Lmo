import React, { useState } from 'react';
import { BirthdayState, GalleryPhoto } from '../types/birthday';
import { 
  Sparkles, 
  Heart, 
  Grid, 
  Layers, 
  Maximize2, 
  X, 
  Upload, 
  Trash2, 
  Edit3, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from 'lucide-react';

interface GalleryPageProps {
  data: BirthdayState;
  onUpdateGallery: (updatedGallery: BirthdayState['gallery']) => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  data,
  onUpdateGallery,
  onNavigateNext,
  onNavigatePrev,
}) => {
  const { heading, subheading, activeLayout, photos } = data.gallery;
  const [layout, setLayout] = useState<'polaroid' | 'grid' | 'heart' | 'scrapbook'>(activeLayout || 'polaroid');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);

  const handleLayoutChange = (newLayout: 'polaroid' | 'grid' | 'heart' | 'scrapbook') => {
    setLayout(newLayout);
    onUpdateGallery({
      ...data.gallery,
      activeLayout: newLayout,
    });
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
            caption: 'A precious moment captured together ✨',
            date: 'Happy Memory',
            location: 'Our Adventure',
            rotation: Math.floor(Math.random() * 8) - 4,
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

  const handleDeletePhoto = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = photos.filter((p) => p.id !== photoId);
    onUpdateGallery({
      ...data.gallery,
      photos: updated,
    });
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(null);
    }
  };

  const handleSavePhotoEdit = (updatedPhoto: GalleryPhoto) => {
    const updated = photos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p));
    onUpdateGallery({
      ...data.gallery,
      photos: updated,
    });
    setEditingPhoto(null);
  };

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % photos.length);
  };

  const prevLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header Bar */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-200 bg-white/80 text-xs tracking-widest text-pink-600 uppercase font-cinzel font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Page 2 of 7 · Photo Vault</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-medium text-[#2D121F] tracking-tight">
          {heading}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-light">
          {subheading}
        </p>

        {/* Action Controls: Layout Switcher & Upload */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <div className="flex items-center gap-1 p-1 bg-white border border-pink-200 rounded-2xl shadow-sm backdrop-blur-md">
            <button
              onClick={() => handleLayoutChange('polaroid')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                layout === 'polaroid'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-pink-600'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Polaroid</span>
            </button>
            <button
              onClick={() => handleLayoutChange('grid')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                layout === 'grid'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-pink-600'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => handleLayoutChange('heart')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                layout === 'heart'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-pink-600'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Heart Collage</span>
            </button>
          </div>

          {/* Upload Button */}
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-pink-50 border border-pink-200 text-pink-600 text-xs font-semibold shadow-sm hover:scale-105 active:scale-95 transition-all">
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

      {/* PHOTO GALLERIES BY LAYOUT */}

      {/* 1. POLAROID LAYOUT (Ref Video Style) */}
      {layout === 'polaroid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              style={{
                transform: `rotate(${photo.rotation || (index % 2 === 0 ? -2 : 2)}deg)`,
              }}
              className="group relative cursor-pointer bg-white p-4 pt-4 pb-6 rounded-2xl shadow-xl shadow-pink-100/70 border border-pink-100 transition-all duration-300 hover:scale-105 hover:z-20 hover:rotate-0"
            >
              {/* Cute Washi Tape on top in soft pink */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/70 backdrop-blur-sm border-l-2 border-r-2 border-dashed border-pink-300 transform -rotate-1 shadow-xs" />

              {/* Photo Frame */}
              <div className="relative aspect-square w-full overflow-hidden bg-pink-50 rounded-xl border border-pink-100">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Birthday memory'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-pink-50 text-pink-500 p-4 text-center">
                          <span class="text-2xl mb-1">📸</span>
                          <span class="text-xs font-serif font-medium">Memory Snapshot</span>
                        </div>
                      `;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-pink-900/0 group-hover:bg-pink-900/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 text-pink-600 rounded-full p-2.5 backdrop-blur-sm shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Polaroid Bottom Caption */}
              <div className="pt-4 text-slate-800">
                <p className="font-serif text-sm leading-snug line-clamp-2 italic text-[#2D121F]">
                  "{photo.caption}"
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-sans border-t border-pink-100 pt-2">
                  <span>{photo.date || 'Sweet Memory'}</span>
                  <span>{photo.location || 'Forever'}</span>
                </div>
              </div>

              {/* Quick actions for photo owner */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingPhoto(photo);
                  }}
                  title="Edit Caption"
                  className="p-1.5 bg-white/90 hover:bg-white text-pink-600 rounded-full text-xs shadow-sm border border-pink-200"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => handleDeletePhoto(photo.id, e)}
                  title="Delete Photo"
                  className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs shadow-sm"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. GRID LAYOUT */}
      {layout === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 py-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-pink-200 bg-white shadow-lg shadow-pink-100/60 cursor-pointer hover:border-pink-400 transition-all hover:scale-[1.02]"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-pink-950/20 to-transparent p-4 flex flex-col justify-end">
                <p className="text-sm font-serif text-white line-clamp-2">
                  {photo.caption}
                </p>
                <span className="text-[11px] text-pink-200 mt-1">{photo.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. HEART SHAPED COLLAGE (Directly inspired by Reference Video 0:17!) */}
      {layout === 'heart' && (
        <div className="py-8 flex flex-col items-center justify-center">
          <div className="mb-4 text-center">
            <span className="font-script text-3xl text-pink-600">
              Wrapped in All My Love & Memories
            </span>
          </div>

          {/* Heart Arrangement Container */}
          <div className="relative max-w-3xl w-full p-6 md:p-10 rounded-3xl border-2 border-pink-200 bg-white/80 backdrop-blur-md shadow-2xl shadow-pink-100 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {photos.map((photo, index) => {
              const isCenter = index === 0;
              const cardSize = isCenter ? 'w-44 h-44 md:w-56 md:h-56' : 'w-28 h-28 md:w-36 md:h-36';
              return (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className={`group relative ${cardSize} rounded-2xl overflow-hidden border-2 border-pink-300 hover:border-pink-500 cursor-pointer shadow-md hover:scale-105 transition-all z-10`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-pink-900/0 group-hover:bg-pink-900/25 transition-colors flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity fill-current drop-shadow" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SCRAPBOOK LAYOUT */}
      {layout === 'scrapbook' && (
        <div className="py-6 space-y-8">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl border border-pink-200 bg-white shadow-lg shadow-pink-100/60 cursor-pointer hover:border-pink-300 transition-all"
            >
              <div className="w-full md:w-64 h-52 shrink-0 rounded-2xl overflow-hidden border border-pink-200">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs uppercase font-cinzel text-pink-500 font-bold tracking-wider">
                  Memory #{index + 1} · {photo.date || 'Timeless'}
                </span>
                <p className="text-lg md:text-xl font-serif text-[#2D121F] leading-relaxed">
                  "{photo.caption}"
                </p>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>📍 {photo.location || 'Special Place'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Page Navigation Controls */}
      <div className="mt-12 pt-6 border-t border-pink-200 flex items-center justify-between">
        <button
          onClick={onNavigatePrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-pink-200 bg-white text-slate-700 hover:text-pink-600 hover:bg-pink-50 text-sm shadow-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous: Gateway</span>
        </button>

        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-sm shadow-md shadow-pink-200 hover:scale-105 transition-all"
        >
          <span>Next: The Sweet Letter</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && photos[activeLightboxIndex] && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white border border-pink-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white hover:text-pink-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Prev Arrow */}
            <button
              onClick={prevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white hover:text-pink-300 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right/Next Arrow */}
            <button
              onClick={nextLightbox}
              className="absolute right-4 md:right-[33%] top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white hover:text-pink-300 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Canvas */}
            <div className="md:w-2/3 h-72 md:h-auto bg-[#1A0B12] flex items-center justify-center p-2">
              <img
                src={photos[activeLightboxIndex].url}
                alt={photos[activeLightboxIndex].caption}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Info Sidebar */}
            <div className="md:w-1/3 p-6 flex flex-col justify-between space-y-4 bg-white border-t md:border-t-0 md:border-l border-pink-100">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-pink-600 font-cinzel font-bold">
                  Photo {activeLightboxIndex + 1} of {photos.length}
                </span>
                <p className="text-lg font-serif text-[#2D121F] leading-relaxed">
                  "{photos[activeLightboxIndex].caption}"
                </p>
                <div className="space-y-1 text-xs text-slate-600 font-sans border-t border-pink-100 pt-4">
                  <p>📅 <strong className="text-slate-800">Date:</strong> {photos[activeLightboxIndex].date || 'Special Day'}</p>
                  <p>📍 <strong className="text-slate-800">Location:</strong> {photos[activeLightboxIndex].location || 'With You'}</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-pink-100">
                <button
                  onClick={() => setEditingPhoto(photos[activeLightboxIndex])}
                  className="inline-flex items-center gap-1.5 text-xs text-pink-600 hover:text-pink-700 font-semibold"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Caption</span>
                </button>
                <button
                  onClick={(e) => handleDeletePhoto(photos[activeLightboxIndex].id, e)}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK EDIT CAPTION MODAL */}
      {editingPhoto && (
        <div
          onClick={() => setEditingPhoto(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-white border-2 border-pink-200 rounded-3xl p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-lg font-serif text-[#2D121F] font-bold">Edit Memory Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Caption / Memory</label>
                <textarea
                  rows={3}
                  value={editingPhoto.caption}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-2xl p-2.5 text-sm text-[#2D121F] focus:border-pink-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Date / Occasion</label>
                  <input
                    type="text"
                    value={editingPhoto.date || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F] focus:border-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Location</label>
                  <input
                    type="text"
                    value={editingPhoto.location || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F] focus:border-pink-500 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setEditingPhoto(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePhotoEdit(editingPhoto)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-md shadow-pink-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
