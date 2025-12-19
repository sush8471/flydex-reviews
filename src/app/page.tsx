"use client";

import { useState, useCallback, useEffect } from "react";
import { ToneSelector, Tone } from "@/components/ToneSelector";

import { ResponseCard } from "@/components/ResponseCard";
import { HistoryPanel, HistoryItem } from "@/components/HistoryPanel";
import { Footer } from "@/components/Footer";
import { generateReply, ReviewResponse } from "@/lib/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Toaster, toast } from "sonner";

import { SegmentedProgress } from "@/components/ui/progress-bar";
import { HeroSection } from "@/components/blocks/hero-section";
import { Header } from "@/components/Header";
import TestimonialSection from "@/components/ui/testimonials";
import { AIInput } from "@/components/ui/ai-input";

export default function Home() {
  const [reviewText, setReviewText] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentResponse, setCurrentResponse] = useState<ReviewResponse | null>(
    null
  );
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    "replydex-history",
    []
  );

  const handleGenerate = useCallback(async () => {
    if (!reviewText || reviewText.length < 10) {
      toast.error("Review must be at least 10 characters long");
      return;
    }

    setIsLoading(true);
    setLoadingProgress(0);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);

    const result = await generateReply({ review_text: reviewText, tone });

    clearInterval(progressInterval);
    setLoadingProgress(100);

    if (result.status === "success") {
      setCurrentResponse(result);

      const newItem: HistoryItem = {
        ...result,
        id: crypto.randomUUID(),
        original_review: reviewText,
        timestamp: Date.now(),
      };

      setHistory((prev) => [newItem, ...prev].slice(0, 50));

      if (history.length === 0) {
        // Dynamic import for confetti to reduce bundle size
        import("canvas-confetti").then((module) => {
          const confetti = module.default;
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#3B82F6", "#8B5CF6", "#2DD4BF"],
          });
        });
      }

      toast.success("Reply generated successfully!");
    } else {
      toast.error(
        result.error || "Failed to generate reply. Please try again."
      );
    }

    setIsLoading(false);
  }, [reviewText, tone, setHistory, history.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (!isLoading && reviewText.length >= 10) {
          handleGenerate();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGenerate, isLoading, reviewText]);

  const selectHistoryItem = (item: HistoryItem) => {
    setReviewText(item.original_review);
    setTone(item.tone_used as Tone);
    setCurrentResponse(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info("History item loaded");
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your entire history?")) {
      setHistory([]);
      toast.success("History cleared");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] dark:bg-black font-sans">
      <Toaster position="top-center" richColors />
      <Header />

      <HeroSection
        title="The Professional AI Engine for Review Management"
        description="Automate your customer interactions with context-aware, personalized responses. ReplyDEX turns every review into a growth opportunity with high-fidelity AI."
        actions={[
          {
            text: "Get Started",
            href: "#generator",
            variant: "glow",
          },
        ]}
      />

      <main
        id="generator"
        className="max-w-screen-md mx-auto px-4 sm:px-6 mt-32 sm:mt-48"
      >
        <div className="pt-0 space-y-8">
          <section className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-zinc-200/40 dark:shadow-none transition-all">
            {/* Section Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Generate Your Reply
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Paste a customer review, choose your tone, and let AI craft the perfect response
              </p>
            </div>

            <div className="space-y-8">
              <AIInput 
                value={reviewText} 
                onChange={setReviewText}
                placeholder="Paste your customer review here..."
                onSubmit={handleGenerate}
              />

              <ToneSelector selected={tone} onSelect={setTone} />
            </div>

            {isLoading && (
              <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-500">
                <SegmentedProgress
                  value={loadingProgress}
                  label="Generating AI Reply..."
                  showDemo={false}
                  segments={30}
                />
              </div>
            )}
          </section>

          <ResponseCard
            reply={currentResponse?.reply || null}
            sentiment={currentResponse?.sentiment || "neutral"}
            wordCount={currentResponse?.word_count || 0}
            onRegenerate={handleGenerate}
          />

          <HistoryPanel
            items={history}
            onSelectItem={selectHistoryItem}
            onClearHistory={clearHistory}
          />

          <TestimonialSection />
        </div>

        <Footer />
      </main>
    </div>
  );
}
