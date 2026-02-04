import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-10 border-t border-zinc-100 dark:border-zinc-800 mt-20">
      <div className="flex flex-col items-center justify-center gap-4">
          <Image 
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ReplyDEX-1766166150955.png?width=8000&height=8000&resize=contain"
            alt="Replydex Logo"
            width={120}
            height={30}
              className="h-4 sm:h-6 w-auto dark:invert opacity-80 hover:opacity-100 transition-opacity"
          />
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            © {new Date().getFullYear()} ReplyDEX AI. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            The intelligent standard for customer review automation.
          </p>
        </div>
      </div>
    </footer>
  );
}
