import React, { useState } from 'react';
import { X, FileSpreadsheet, Download, Upload, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import { useApp } from '../context/AppContext';
import { parseCsvText, getSampleCsvString } from '../utils/csvParser';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({ isOpen, onClose }) => {
  const { importEvents, resetEventsToDefault, events } = useApp();

  const [csvRawText, setCsvRawText] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      processCsv(content);
    };
    reader.readAsText(file);
  };

  const processCsv = (text: string) => {
    try {
      const parsed = parseCsvText(text);
      importEvents(parsed);
      setStatusMessage({
        type: 'success',
        text: `Successfully imported ${parsed.length} events from CSV! Live feed updated.`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to parse CSV file. Please check column format.',
      });
    }
  };

  const handleDownloadSample = () => {
    const sampleCsv = getSampleCsvString();
    const blob = new Blob([sampleCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'campus_pulse_sample_events.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePasteSubmit = () => {
    if (!csvRawText.trim()) {
      setStatusMessage({ type: 'error', text: 'Please paste CSV content first.' });
      return;
    }
    processCsv(csvRawText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <GlassPanel weight="chrome" className="w-full max-w-lg max-h-[85vh] overflow-y-auto no-scrollbar p-6 rounded-[32px] shadow-2xl relative border border-white/90">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 min-w-[40px] min-h-[40px] rounded-full bg-peach/50 hover:bg-peach flex items-center justify-center text-ink transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-coral text-white shadow-md">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs text-coral-deep font-semibold uppercase tracking-wider block">
              Dynamic Data Importer
            </span>
            <h2 className="font-display font-semibold text-xl text-ink">
              Upload CSV Content
            </h2>
          </div>
        </div>

        {/* Alert Notification Toast */}
        {statusMessage && (
          <div
            className={`p-3.5 rounded-chip mb-4 flex items-start gap-3 text-xs font-body ${
              statusMessage.type === 'success'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-white/60 rounded-full border border-white/80 mb-4">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-4 rounded-full font-mono text-xs font-medium transition-all ${
              activeTab === 'upload' ? 'bg-coral text-white shadow-sm' : 'text-ink-2 hover:text-ink'
            }`}
          >
            Upload File (.csv)
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex-1 py-2 px-4 rounded-full font-mono text-xs font-medium transition-all ${
              activeTab === 'paste' ? 'bg-coral text-white shadow-sm' : 'text-ink-2 hover:text-ink'
            }`}
          >
            Paste Raw CSV
          </button>
        </div>

        {/* Tab 1: File Upload */}
        {activeTab === 'upload' && (
          <div className="flex flex-col gap-4">
            <label className="border-2 border-dashed border-coral/40 hover:border-coral rounded-card p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/40 hover:bg-white/70 transition-all text-center">
              <Upload className="w-8 h-8 text-coral animate-bounce" />
              <span className="font-display font-semibold text-sm text-ink">
                Click to browse or drop CSV file
              </span>
              <span className="font-mono text-xs text-ink-2">
                Supports .csv files with Title, Category, Date, Time, Location columns
              </span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleDownloadSample}
                className="min-h-[40px] px-4 py-2 rounded-full bg-peach/60 hover:bg-peach text-ink font-mono text-xs font-medium flex items-center gap-2 transition-all active:scale-95 border border-white/80"
              >
                <Download className="w-3.5 h-3.5 text-coral-deep" />
                Download Sample CSV
              </button>

              <button
                onClick={() => {
                  resetEventsToDefault();
                  setStatusMessage({ type: 'success', text: 'Reset feed events to default mock dataset.' });
                }}
                className="min-h-[40px] px-3.5 py-2 rounded-full text-ink-2 hover:text-ink font-mono text-xs font-medium flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Raw CSV Paste */}
        {activeTab === 'paste' && (
          <div className="flex flex-col gap-3">
            <textarea
              rows={6}
              value={csvRawText}
              onChange={(e) => setCsvRawText(e.target.value)}
              placeholder={`Title,Category,Date,Time,Location,Club,Description\n"AI Product Hackathon","Competition","Sat, Nov 20","10:00 AM - 4:00 PM","Lab 301","TechSoc","Building AI tools"`}
              className="w-full p-3 rounded-2xl bg-white/80 border border-white/90 font-mono text-xs text-ink outline-none focus:ring-2 focus:ring-coral"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handlePasteSubmit}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-coral text-white font-display font-semibold text-sm shadow-md hover:bg-coral-deep transition-all active:scale-95"
              >
                Import CSV Text
              </button>
            </div>
          </div>
        )}

        {/* Current Active Count */}
        <div className="mt-5 pt-3 border-t border-white/60 text-center">
          <span className="font-mono text-xs text-ink-2">
            Currently displaying <strong className="text-coral-deep font-semibold">{events.length} events</strong> in live session memory.
          </span>
        </div>
      </GlassPanel>
    </div>
  );
};
