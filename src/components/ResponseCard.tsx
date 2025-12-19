"use client";

import { useState } from "react";
import { Copy, Check, RotateCcw, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ResponseCardProps {
  reply: string | null;
  sentiment: string;
  wordCount: number;
  onRegenerate: () => void;
}

export function ResponseCard({ reply, sentiment, wordCount, onRegenerate }: ResponseCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!reply) return;
    navigator.clipboard.writeText(reply);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getSentimentBadge = (s: string) => {
    switch (s.toLowerCase()) {
      case "positive":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Positive</Badge>;
      case "negative":
        return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">Negative</Badge>;
      default:
        return <Badge className="bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-100">Neutral</Badge>;
    }
  };

  return (
    <div className="mt-8">
      <AnimatePresence mode="wait">
        {!reply ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20"
          >
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-full shadow-sm mb-4">
              <MessageSquare className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Your AI-generated reply will appear here</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-zinc-200/50 dark:shadow-none"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 items-center">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mr-2">
                  Generated Reply
                </span>
                {getSentimentBadge(sentiment)}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onRegenerate} className="h-9 rounded-lg">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="default" size="sm" onClick={handleCopy} className="h-9 rounded-lg bg-blue-600 hover:bg-blue-700">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied" : "Copy Reply"}
                </Button>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
              {reply}
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-1">
                <Info className="w-3 h-3" />
                <span>Word count: {wordCount}</span>
              </div>
              <span>Generated in ~2 seconds</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
