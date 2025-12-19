import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";

interface Testimonial {
    name: string;
    role: string;
    review: string;
}

const testimonials: Testimonial[] = [
    {
        name: "John Doe",
        role: "Product Designer",
        review: "Using ReplyDEX has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility, enabling us to create UIs that are as stunning as they are user-friendly."
    },
    {
        name: "Sarah Smith",
        role: "CX Manager",
        review: "ReplyDEX has completely transformed our customer support workflow. The AI generated replies are remarkably natural and professional, saving us hours every single day."
    },
    {
        name: "Michael Chen",
        role: "Operations Director",
        review: "The ability to switch tones instantly and maintain a consistent brand voice across all reviews is a game changer for our global business operations."
    }
];

export default function TestimonialSection() {
    return (
        <section className="bg-zinc-50 dark:bg-zinc-950/50 py-12 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
            <div className="mx-auto w-full max-w-5xl px-6">
                <h2 className="text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-zinc-100">Loved by teams everywhere</h2>
                <TestimonialCarousel testimonials={testimonials} className="py-8" />
            </div>
        </section>
    )
}
