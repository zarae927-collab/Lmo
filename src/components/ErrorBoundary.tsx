import React, { Component, ErrorInfo, ReactNode } from 'react';
import { STORAGE_KEY } from '../types/birthday';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Birthday Surprise App:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    window.location.reload();
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-6 text-center text-[#2D121F]">
          <div className="max-w-md w-full bg-white border-2 border-pink-300 rounded-3xl p-8 shadow-2xl space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-3xl">
              🎀
            </div>
            <h2 className="font-bubble text-2xl font-bold text-[#E91E63]">
              Oops! A Little Birthday Hiccup
            </h2>
            <p className="text-sm text-slate-600 font-cute">
              Something unexpected happened while displaying the page. Don't worry, your template can be restored in a click!
            </p>
            {this.state.error && (
              <div className="p-3 bg-pink-50 rounded-xl text-left text-xs font-mono text-rose-800 max-h-28 overflow-auto border border-pink-200">
                {this.state.error.message}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-[#E91E63] text-white font-bubble font-bold text-sm shadow hover:bg-[#D81B60] transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 rounded-xl bg-pink-100 text-pink-700 font-bubble font-bold text-sm hover:bg-pink-200 transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
