"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function ReviewInput({ value, onChange, onClear }: ReviewInputProps) {
  const maxLength = 1000;
  const charCount = value.length;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Customer Review
        </label>
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 text-zinc-500 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      <div className="relative">
        <Textarea
          placeholder="Paste customer review here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[160px] resize-none text-base p-4 rounded-xl border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
          maxLength={maxLength}
        />
        <div className="absolute bottom-3 right-3">
          <span className={`text-xs font-medium ${charCount > 500 ? 'text-amber-500' : 'text-zinc-400'}`}>
            {charCount}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
}
