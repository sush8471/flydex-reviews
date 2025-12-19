"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";

interface AIInputProps {
  id?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  onSubmit?: (value: string) => void;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function AIInput({
  id = "ai-input",
  placeholder = "Type your review here...",
  minHeight = 48,
  maxHeight = 164,
  onSubmit,
  className,
  value: controlledValue,
  onChange: controlledOnChange,
}: AIInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = controlledOnChange !== undefined ? controlledOnChange : setInternalValue;

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit?.(value);
      // Don't clear value if controlled - parent component manages state
      if (controlledValue === undefined) {
        setValue("");
        adjustHeight(true);
      }
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full group">
        {/* Gradient glow effect on focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-focus-within:opacity-20 blur-lg transition-all duration-500"></div>
        
        <div className="relative flex flex-col shadow-2xl shadow-zinc-900/10 dark:shadow-black/40 hover:shadow-zinc-900/15 dark:hover:shadow-black/60 transition-all duration-300 rounded-3xl">
          <div
            className="overflow-y-auto"
            style={{ maxHeight: `${maxHeight}px` }}
          >
            <Textarea
              id={id}
              value={value}
              placeholder={placeholder}
              className="w-full rounded-3xl rounded-b-none px-5 py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-200/80 dark:border-zinc-700/80 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none focus-visible:ring-0 focus-visible:border-blue-400 dark:focus-visible:border-blue-500 focus-visible:ring-offset-0 leading-relaxed text-base border-b-0 transition-all duration-300 shadow-inner shadow-zinc-100/50 dark:shadow-zinc-950/50"
              ref={textareaRef}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
            />
          </div>

          <div className="h-16 bg-gradient-to-br from-white to-zinc-50/50 dark:from-zinc-900 dark:to-zinc-900/50 rounded-b-3xl border-2 border-t-0 border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-end px-5 backdrop-blur-sm">
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={!value.trim()}
              whileHover={{ scale: value.trim() ? 1.08 : 1, y: value.trim() ? -2 : 0 }}
              whileTap={{ scale: value.trim() ? 0.92 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={cn(
                "relative rounded-2xl p-3 transition-all duration-300 overflow-hidden",
                value.trim()
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed shadow-sm"
              )}
            >
              {/* Shine effect on active button */}
              {value.trim() && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
              )}
              <Send className="w-5 h-5 relative z-10" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
