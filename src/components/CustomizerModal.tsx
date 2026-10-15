import React, { useState } from 'react';
import { BirthdayState, INITIAL_BIRTHDAY_DATA, saveStoredBirthdayData } from '../types/birthday';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Sliders, 
  Sparkles, 
  Image as ImageIcon, 
  Mail, 
  Music, 
  HelpCircle, 
  Gift, 
  PartyPopper,
  Plus,
  Trash2
} from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BirthdayState;
  onSaveData: (newData: BirthdayState) => void;
  initialTab?: 'global' | 'gateway' | 'gallery' | 'letter' | 'music' | 'hub' | 'quiz' | 'finale' | 'backup';
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  initialTab = 'global',
}) => {
  const [formData, setFormData] = useState<BirthdayState>(data);
  const [activeTab, setActiveTab] = useState<'global' | 'gateway' | 'gallery' | 'letter' | 'music' | 'hub' | 'quiz' | 'finale' | 'backup'>(initialTab);
  const [saveToast, setSaveToast] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Sync formData when data prop changes or modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData(data);
      if (initialTab) {
        setActiveTab(initialTab);
      }
    }
  }, [isOpen, data, initialTab]);

  if (!isOpen) return null;

  const showStatus = (text: string, isError = false) => {
    setStatusMessage({ text, isError });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSave = () => {
    saveStoredBirthdayData(formData);
    onSaveData(formData);
    setSaveToast(true);
    showStatus('Saved all customizations successfully!');
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleReset = () => {
    setFormData(INITIAL_BIRTHDAY_DATA);
    saveStoredBirthdayData(INITIAL_BIRTHDAY_DATA);
    onSaveData(INITIAL_BIRTHDAY_DATA);
    setConfirmResetOpen(false);
    showStatus('Reset all settings to default template!');
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `birthday-surprise-${formData.global.recipientName.toLowerCase() || 'config'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showStatus('Exported birthday config JSON file!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setFormData(parsed);
        saveStoredBirthdayData(parsed);
        onSaveData(parsed);
        showStatus('Configuration imported successfully!');
      } catch {
        showStatus('Invalid JSON file format. Please check file.', true);
      }
    };
    reader.readAsText(file);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) {
          const newPhoto = {
            id: 'photo-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            url: res,
            caption: 'Our special memory ✨',
            date: 'Happy Moment',
            location: 'Favorite Spot',
            rotation: 0,
          };
          setFormData((prev) => ({
            ...prev,
            gallery: {
              ...prev.gallery,
              photos: [newPhoto, ...prev.gallery.photos],
            },
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative max-w-5xl w-full h-[92vh] bg-white border-2 border-pink-300 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#2D121F]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-pink-200 bg-pink-50/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center font-bold shadow-xs">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2D121F] leading-none">
                Website Personalizer & Control Studio
              </h2>
              <p className="text-xs text-pink-600 font-sans mt-0.5">
                Customize every word, photograph, song, and interaction for {formData.global.recipientName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold animate-fadeIn">
                <Check className="w-3.5 h-3.5" /> Saved to browser!
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-pink-200 hover:scale-105 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast / Notification Bar */}
        {statusMessage && (
          <div
            className={`px-6 py-2 text-xs font-semibold flex items-center justify-between border-b ${
              statusMessage.isError
                ? 'bg-rose-100 text-rose-800 border-rose-200'
                : 'bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}
          >
            <span>{statusMessage.text}</span>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        )}

        {/* Reset Confirmation Prompt */}
        {confirmResetOpen && (
          <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-4">
            <span>Are you sure you want to reset all customizations back to default template?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold hover:bg-rose-600"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-3 py-1 rounded-lg bg-amber-200 text-amber-900 font-medium hover:bg-amber-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation Strip */}
        <div className="px-6 py-2.5 bg-pink-50/40 border-b border-pink-200 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'global', label: '1. Global', icon: Sparkles },
            { id: 'gateway', label: '2. Gateway', icon: Sparkles },
            { id: 'gallery', label: '3. Memories & Photos', icon: ImageIcon },
            { id: 'letter', label: '4. Letter', icon: Mail },
            { id: 'music', label: '5. Music & Song', icon: Music },
            { id: 'hub', label: '6. Surprise Hub', icon: Gift },
            { id: 'quiz', label: '7. Quiz Challenge', icon: HelpCircle },
            { id: 'finale', label: '8. Finale & Cake', icon: PartyPopper },
            { id: 'backup', label: 'Backup / JSON', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-pink-600 hover:bg-pink-100/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {/* TAB: GLOBAL */}
          {activeTab === 'global' && (
            <div className="max-w-3xl space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Friend's Name / Recipient</label>
                  <input
                    type="text"
                    value={formData.global.recipientName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        global: { ...formData.global, recipientName: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-sm text-[#2D121F] focus:border-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1">Nickname / Title</label>
                  <input
                    type="text"
                    value={formData.global.nickname}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        global: { ...formData.global, nickname: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-sm text-[#2D121F] focus:border-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1">Your Name / Sign-off Signature</label>
                  <input
                    type="text"
                    value={formData.global.senderName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        global: { ...formData.global, senderName: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-sm text-[#2D121F] focus:border-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1">Official Birthday Date</label>
                  <input
                    type="date"
                    value={formData.global.birthdayDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        global: { ...formData.global, birthdayDate: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-sm text-[#2D121F] focus:border-pink-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1">Website Main Header Title</label>
                <input
                  type="text"
                  value={formData.global.websiteTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      global: { ...formData.global, websiteTitle: e.target.value },
                    })
                  }
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-sm text-[#2D121F] focus:border-pink-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB: GATEWAY (PAGE 1) */}
          {activeTab === 'gateway' && (
            <div className="max-w-3xl space-y-5 animate-fadeIn">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Opening Heading</label>
                  <input
                    type="text"
                    value={formData.gateway.heading}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gateway: { ...formData.gateway, heading: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-sm text-[#2D121F] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1">Opening Subheading / Teaser</label>
                  <textarea
                    rows={2}
                    value={formData.gateway.subheading}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gateway: { ...formData.gateway, subheading: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-sm text-[#2D121F] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">The Playful Question</label>
                    <input
                      type="text"
                      value={formData.gateway.questionText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gateway: { ...formData.gateway, questionText: e.target.value },
                        })
                      }
                      className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">YES Button Label</label>
                    <input
                      type="text"
                      value={formData.gateway.yesBtnText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gateway: { ...formData.gateway, yesBtnText: e.target.value },
                        })
                      }
                      className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">NO Button Label</label>
                    <input
                      type="text"
                      value={formData.gateway.noBtnText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gateway: { ...formData.gateway, noBtnText: e.target.value },
                        })
                      }
                      className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                  <h4 className="text-xs uppercase font-cinzel text-rose-600 font-bold">
                    When They Click "NO" (Playful Harmless Reaction Screen)
                  </h4>
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Reaction Title</label>
                    <input
                      type="text"
                      value={formData.gateway.noReactionTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gateway: { ...formData.gateway, noReactionTitle: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-[#2D121F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Reaction Subtitle</label>
                    <input
                      type="text"
                      value={formData.gateway.noReactionSubtitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gateway: { ...formData.gateway, noReactionSubtitle: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-[#2D121F]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200 space-y-3">
                  <h4 className="text-xs uppercase font-cinzel text-pink-600 font-bold">
                    Celebration Greeting Screen
                  </h4>
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Celebration Headline</label>
                    <input
                      type="text"
                      value={formData.gateway.celebrationTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gateway: { ...formData.gateway, celebrationTitle: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Celebration Subtitle</label>
                    <input
                      type="text"
                      value={formData.gateway.celebrationSubtitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gateway: { ...formData.gateway, celebrationSubtitle: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: GALLERY (PAGE 2) */}
          {activeTab === 'gallery' && (
            <div className="max-w-4xl space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2D121F]">Your Friend's Photo Gallery</h3>
                  <p className="text-xs text-slate-500">
                    Upload your own real photos of your friend. They are saved directly in your browser.
                  </p>
                </div>

                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs shadow-md shadow-pink-200 hover:scale-105 transition-all">
                  <Plus className="w-4 h-4" />
                  <span>Upload Real Photos</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Photo list cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {formData.gallery.photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="p-3 rounded-2xl bg-white border border-pink-200 shadow-sm space-y-2 relative"
                  >
                    <div className="w-full h-36 rounded-xl overflow-hidden bg-pink-50 border border-pink-100">
                      <img
                        src={photo.url}
                        alt="Uploaded preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block">Caption</label>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => {
                          const updated = formData.gallery.photos.map((p) =>
                            p.id === photo.id ? { ...p, caption: e.target.value } : p
                          );
                          setFormData({
                            ...formData,
                            gallery: { ...formData.gallery, photos: updated },
                          });
                        }}
                        className="w-full bg-pink-50/50 border border-pink-200 rounded-lg p-1.5 text-xs text-[#2D121F]"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-pink-600 font-mono font-bold">#{index + 1}</span>
                      <button
                        onClick={() => {
                          const updated = formData.gallery.photos.filter((p) => p.id !== photo.id);
                          setFormData({
                            ...formData,
                            gallery: { ...formData.gallery, photos: updated },
                          });
                        }}
                        className="p-1 rounded bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white text-xs transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: LETTER (PAGE 3) */}
          {activeTab === 'letter' && (
            <div className="max-w-3xl space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Envelope Seal Label</label>
                  <input
                    type="text"
                    value={formData.letter.envelopeSealText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        letter: { ...formData.letter, envelopeSealText: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Letter Title</label>
                  <input
                    type="text"
                    value={formData.letter.letterTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        letter: { ...formData.letter, letterTitle: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1">Letter Paragraphs</label>
                {formData.letter.paragraphs.map((p, idx) => (
                  <div key={idx} className="mb-2">
                    <textarea
                      rows={2}
                      value={p}
                      onChange={(e) => {
                        const newParagraphs = [...formData.letter.paragraphs];
                        newParagraphs[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          letter: { ...formData.letter, paragraphs: newParagraphs },
                        });
                      }}
                      className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-xs text-[#2D121F]"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1">Secret Hidden Wish (Revealed on click)</label>
                <textarea
                  rows={2}
                  value={formData.letter.hiddenMessage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letter: { ...formData.letter, hiddenMessage: e.target.value },
                    })
                  }
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                />
              </div>
            </div>
          )}

          {/* TAB: MUSIC (PAGE 4) */}
          {activeTab === 'music' && (
            <div className="max-w-3xl space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Song Title</label>
                  <input
                    type="text"
                    value={formData.music.currentTrackTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        music: { ...formData.music, currentTrackTitle: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-xs text-[#2D121F]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 block mb-1">Artist / Dedication Label</label>
                  <input
                    type="text"
                    value={formData.music.currentArtist}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        music: { ...formData.music, currentArtist: e.target.value },
                      })
                    }
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2.5 text-xs text-[#2D121F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1">Dedication Note</label>
                <textarea
                  rows={2}
                  value={formData.music.dedicationText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      music: { ...formData.music, dedicationText: e.target.value },
                    })
                  }
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 space-y-2">
                <p className="text-xs text-pink-700 font-cinzel uppercase font-bold">
                  Audio Source
                </p>
                <p className="text-xs text-slate-600">
                  {formData.music.audioUrl
                    ? 'Custom audio file loaded.'
                    : 'Currently using built-in peaceful acoustic synthesizer chimes (works without internet or external MP3s!).'}
                </p>
                <div className="pt-2">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs shadow-md shadow-pink-200">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload MP3 Audio File</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            setFormData({
                              ...formData,
                              music: {
                                ...formData.music,
                                audioUrl: ev.target?.result as string,
                                currentTrackTitle: file.name.replace(/\.[^/.]+$/, ''),
                              },
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB: QUIZ (PAGE 6) */}
          {activeTab === 'quiz' && (
            <div className="max-w-3xl space-y-6 animate-fadeIn">
              <h3 className="text-sm font-cinzel text-pink-600 uppercase tracking-wider font-bold">
                5 Customizable Friendship Questions
              </h3>
              {formData.quiz.questions.map((q, qIndex) => (
                <div key={q.id} className="p-4 rounded-2xl bg-white border border-pink-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-cinzel text-pink-600 font-bold">Question {qIndex + 1}</span>
                  </div>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...formData.quiz.questions];
                      updated[qIndex].question = e.target.value;
                      setFormData({ ...formData, quiz: { ...formData.quiz, questions: updated } });
                    }}
                    className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                  />
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={q.correctIndex === optIndex}
                          onChange={() => {
                            const updated = [...formData.quiz.questions];
                            updated[qIndex].correctIndex = optIndex;
                            setFormData({ ...formData, quiz: { ...formData.quiz, questions: updated } });
                          }}
                          className="accent-pink-500"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...formData.quiz.questions];
                            updated[qIndex].options[optIndex] = e.target.value;
                            setFormData({ ...formData, quiz: { ...formData.quiz, questions: updated } });
                          }}
                          className="flex-1 bg-pink-50/40 border border-pink-200 rounded-lg p-1.5 text-xs text-[#2D121F]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: FINALE (PAGE 7) */}
          {activeTab === 'finale' && (
            <div className="max-w-3xl space-y-4 animate-fadeIn">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Final Headline</label>
                <input
                  type="text"
                  value={formData.finale.heading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      finale: { ...formData.finale, heading: e.target.value },
                    })
                  }
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1">Wish Title & Message</label>
                <input
                  type="text"
                  value={formData.finale.wishTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      finale: { ...formData.finale, wishTitle: e.target.value },
                    })
                  }
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F] mb-2"
                />
                <textarea
                  rows={2}
                  value={formData.finale.wishMessage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      finale: { ...formData.finale, wishMessage: e.target.value },
                    })
                  }
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1">Secret Star Wish (Revealed on star click)</label>
                <textarea
                  rows={2}
                  value={formData.finale.secretStarWish}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      finale: { ...formData.finale, secretStarWish: e.target.value },
                    })
                  }
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-xl p-2 text-xs text-[#2D121F]"
                />
              </div>
            </div>
          )}

          {/* TAB: BACKUP & JSON */}
          {activeTab === 'backup' && (
            <div className="max-w-2xl space-y-6 animate-fadeIn">
              <div className="p-6 rounded-3xl bg-pink-50/50 border border-pink-200 space-y-4">
                <h3 className="font-serif text-lg text-[#2D121F] font-bold">Export or Import Configuration</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Download your customized website setup as a JSON file so you can share it, back it up, or load it onto another computer.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={handleExportJSON}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs shadow-md shadow-pink-200 hover:scale-105 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export JSON File</span>
                  </button>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-pink-50 border border-pink-200 text-slate-700 text-xs font-semibold shadow-xs transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Import JSON File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 space-y-3">
                <h4 className="text-xs uppercase font-cinzel text-rose-600 font-bold">Danger Zone</h4>
                <p className="text-xs text-slate-600">
                  Reset everything back to the initial template state.
                </p>
                <button
                  onClick={() => setConfirmResetOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
