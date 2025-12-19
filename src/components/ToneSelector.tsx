"use client";

import { Briefcase, Smile, Heart } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Tone = "professional" | "friendly" | "apologetic";

interface ToneSelectorProps {
  selected: Tone;
  onSelect: (tone: Tone) => void;
}

const tones: { id: Tone; label: string; icon: any; description: string }[] = [
  {
    id: "professional",
    label: "Professional",
    icon: Briefcase,
    description: "Brief, formal, and efficient",
  },
  {
    id: "friendly",
    label: "Friendly",
    icon: Smile,
    description: "Warm, casual, and engaging",
  },
  {
    id: "apologetic",
    label: "Apologetic",
    icon: Heart,
    description: "Empathetic and solution-oriented",
  },
];

export function ToneSelector({ selected, onSelect }: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        Response Tone
      </label>
      <TooltipProvider>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tones.map((tone) => {
            const Icon = tone.icon;
            const isSelected = selected === tone.id;
            return (
              <Tooltip key={tone.id}>
                <TooltipTrigger asChild>
                  <div>
                    <Toggle
                      pressed={isSelected}
                      onPressedChange={() => onSelect(tone.id)}
                      className={`w-full flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all h-auto ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 data-[state=on]:bg-blue-50 dark:data-[state=on]:bg-blue-900/20"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected
                            ? "bg-blue-500 text-white"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`font-semibold text-sm ${
                          isSelected
                            ? "text-blue-700 dark:text-blue-400"
                            : "text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        {tone.label}
                      </span>
                    </Toggle>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1.5 text-xs">
                  <p>{tone.description}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
