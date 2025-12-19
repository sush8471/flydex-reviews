"use client";

import { History, Trash2, Clock, MessageCircle, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewResponse } from "@/lib/api";
import { toast } from "sonner";

export interface HistoryItem extends ReviewResponse {
  id: string;
  original_review: string;
  timestamp: number;
}

interface HistoryPanelProps {
  items: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export function HistoryPanel({ items, onSelectItem, onClearHistory }: HistoryPanelProps) {
  const exportHistory = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `flydex-history-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success("History exported as JSON");
  };

  if (items.length === 0) return null;

  return (
    <div className="mt-16 space-y-6">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-zinc-400" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Generation History</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={exportHistory} className="text-zinc-500 hover:text-blue-600">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button variant="ghost" size="sm" onClick={onClearHistory} className="text-zinc-500 hover:text-red-600">
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-200 dark:hover:border-blue-900 transition-all text-left group"
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
              <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {item.reply}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <span className="capitalize">{item.tone_used}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider">
                  {item.sentiment}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-blue-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
