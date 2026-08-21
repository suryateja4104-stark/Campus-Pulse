import { Component, type ErrorInfo, type ReactNode } from 'react';

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
    console.error('Campus Pulse Uncaught Error:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.hash = '#/feed';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#0B0F19] text-white flex items-center justify-center p-6 font-sans text-center">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#4361EE] flex items-center justify-center text-xl font-bold">
              CP
            </div>
            <h1 className="text-xl font-semibold">Campus Pulse</h1>
            <p className="text-sm text-gray-300">
              Something unexpected occurred while loading on your device.
            </p>
            <div className="text-xs text-rose-300 bg-rose-950/50 p-3 rounded-xl border border-rose-800/40 text-left font-mono max-w-full overflow-x-auto">
              {this.state.error?.message || 'Unknown runtime error'}
            </div>
            <button
              onClick={this.handleReload}
              className="mt-2 px-6 py-3 rounded-full bg-[#4361EE] hover:bg-[#3651d4] text-white font-medium text-sm transition-all shadow-lg active:scale-95"
            >
              Reload Campus Pulse
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
