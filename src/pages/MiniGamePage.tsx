import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BirthdayState } from '../types/birthday';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, Award, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface MiniGamePageProps {
  data: BirthdayState;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

export const MiniGamePage: React.FC<MiniGamePageProps> = ({
  data,
  onNavigateNext,
  onNavigatePrev,
}) => {
  const { quiz, global } = data;
  const questions = quiz.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#FF5A82', '#FF8BA7', '#FFB6C1', '#4ECDC4'],
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#FF5A82', '#FF8BA7', '#FFB6C1', '#FFFFFF', '#D81B60'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] bg-candy-stripes flex flex-col justify-center px-4 py-8">
      {/* Side Star Stickers */}
      <div className="absolute top-10 left-6 text-[#FFD166] text-3xl select-none">★</div>
      <div className="absolute bottom-16 left-8 text-[#FF8BA7] text-3xl select-none">★</div>
      <div className="absolute top-10 right-6 text-[#FF8BA7] text-3xl select-none">★</div>
      <div className="absolute bottom-16 right-8 text-[#FFD166] text-3xl select-none">★</div>

      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bubble font-bold text-[#FF5A82] tracking-tight">
          {quiz.heading}
        </h2>
        <p className="text-sm sm:text-base font-cute text-slate-600 max-w-xl mx-auto font-medium">
          {quiz.subheading}
        </p>
      </div>

      {!isCompleted ? (
        /* ACTIVE QUESTION CARD */
        <div className="max-w-2xl mx-auto bg-white border-2 border-pink-200 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-pink-100 backdrop-blur-xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-600 font-cinzel">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-pink-600 font-bold">Score: {score} pts</span>
          </div>

          <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xl sm:text-2xl font-serif text-[#2D121F] leading-snug font-bold">
              {currentQ.question}
            </h3>
          </div>

          {/* Answer Choices */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrectAnswer = optIdx === currentQ.correctIndex;

              let btnStyles = 'border-pink-200 bg-pink-50/40 text-slate-800 hover:border-pink-400 hover:bg-pink-100/50';

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  btnStyles = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold shadow-xs';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyles = 'border-rose-400 bg-rose-50 text-rose-900';
                } else {
                  btnStyles = 'border-pink-100 bg-white text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base flex items-center justify-between transition-all duration-200 ${btnStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl border border-pink-300 bg-white flex items-center justify-center text-xs font-mono font-bold text-pink-600 shadow-xs">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback Card */}
          {hasAnswered && (
            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 space-y-3 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 font-serif leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-pink-200 hover:scale-105 transition-all"
                >
                  {currentIndex + 1 < questions.length ? 'Next Question →' : 'View Results 🎉'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* FINAL RESULTS CARD */
        <div className="max-w-xl mx-auto bg-white border-2 border-pink-300 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-pink-100 text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-rose-500 p-1 shadow-lg shadow-pink-200 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-pink-500">
              <Award className="w-10 h-10" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-cinzel text-pink-600 tracking-widest font-bold">
              Challenge Complete
            </span>
            <h3 className="text-3xl font-serif text-[#2D121F] font-bold">
              {quiz.resultTitle}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-light">
              {quiz.resultMessage}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200">
            <p className="text-xs text-slate-500 font-cinzel uppercase tracking-wider font-semibold">
              Friendship Affinity Score
            </p>
            <p className="text-3xl font-serif font-bold text-pink-600 mt-1">
              {score} / {questions.length} (100% Certified Soulmate)
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-pink-50 border border-pink-200 text-slate-700 hover:text-pink-600 text-xs font-semibold shadow-xs transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>

            <button
              onClick={onNavigateNext}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-pink-200 hover:scale-105 transition-all"
            >
              <span>Go to Grand Finale 🎉</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="mt-12 pt-6 border-t border-pink-200 flex items-center justify-between">
        <button
          onClick={onNavigatePrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-pink-200 bg-white text-slate-700 hover:text-pink-600 hover:bg-pink-50 text-sm shadow-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous: Surprise Room</span>
        </button>

        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-sm shadow-md shadow-pink-200 hover:scale-105 transition-all"
        >
          <span>Next: Grand Finale</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
