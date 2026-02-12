import { useState } from "react";
import { Gift, Sparkles, Star, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import nailsBg from "@/assets/nails-bg.jpg";

const gifts = [
  {
    icon: Gift,
    title: "Exclusive Nail Kit",
    description: "A curated set of premium press-on nails and tools delivered to your door.",
  },
  {
    icon: Sparkles,
    title: "VIP Early Access",
    description: "Shop new collections before anyone else and get first picks on limited drops.",
  },
  {
    icon: Star,
    title: "Founding Member Perks",
    description: "Permanent discounts and a special badge as one of our original supporters.",
  },
];

const Index = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={nailsBg}
          alt="Nail art background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Radial glow overlay */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 pt-20 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-glow bg-secondary mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Coming Soon</span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 max-w-4xl leading-[1.1]">
          <span className="text-gradient-enchanted">Uniquely</span>
        </h1>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-[1.1]">
          <span className="text-gradient-enchanted">Enchanted</span>
        </h1>

        <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mb-12 font-light leading-relaxed">
          Sign up before we launch and unlock exclusive free gifts reserved only for our earliest supporters. ✨
        </p>

        {/* Signup form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-4 rounded-lg bg-gradient-enchanted text-primary-foreground font-semibold hover:opacity-90 transition-all glow-pink flex items-center gap-2 shrink-0"
              >
                Join
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-muted-foreground text-xs mt-3">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="flex items-center gap-3 px-6 py-4 rounded-lg border-glow bg-secondary">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <span className="text-foreground font-medium">You're in! Check your inbox for a confirmation.</span>
          </div>
        )}
      </section>

      {/* Gifts section */}
      <section className="relative px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Your Free <span className="text-gradient-enchanted">Gifts</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Here's what you'll receive just for signing up early.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {gifts.map((gift, i) => (
            <div
              key={i}
              className="group p-8 rounded-xl bg-card border-glow hover:glow-pink transition-all duration-500 cursor-default"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <gift.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {gift.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {gift.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-center py-10 border-t border-border">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Uniquely Enchanted · Launching Soon
        </p>
      </footer>
    </div>
  );
};

export default Index;
