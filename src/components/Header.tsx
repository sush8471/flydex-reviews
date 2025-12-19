import Image from "next/image";

export function Header() {
  return (
    <header className="pt-4 pb-2 border-b border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-full mx-auto px-0 flex items-center">
          <div className="flex items-center">
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ReplyDEX1-1766167499469.png?width=8000&height=8000&resize=contain"
                alt="ReplyDEX Logo"
                width={300}
                height={80}
                className="h-4 sm:h-6 w-auto dark:invert transition-all"
                priority
              />
          </div>
      </div>
    </header>
  );
}
