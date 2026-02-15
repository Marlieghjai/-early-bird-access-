import { useState } from "react";
import { Gift, Sparkles, Star, Mail, ArrowRight, CheckCircle2, Instagram, Loader2 } from "lucide-react";
import nailsBg from "@/assets/nails-bg.jpg";
import { useToast } from "@/hooks/use-toast";

const KLAVIYO_API_REVISION = "2024-07-15";
const KLAVIYO_COMPANY_ID = import.meta.env.VITE_KLAVIYO_COMPANY_ID ?? "Wb4tTL";
const KLAVIYO_LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID;

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

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.01-.3z"/>
  </svg>
);

// Sparkle particles
const sparklePositions = [
  { top: "12%", left: "8%", delay: "0s", size: "3px" },
  { top: "20%", right: "12%", delay: "1.2s", size: "4px" },
  { top: "35%", left: "15%", delay: "2.4s", size: "3px" },
  { top: "45%", right: "20%", delay: "0.8s", size: "5px" },
  { top: "60%", left: "5%", delay: "1.6s", size: "3px" },
  { top: "70%", right: "8%", delay: "3s", size: "4px" },
  { top: "15%", left: "45%", delay: "2s", size: "3px" },
  { top: "80%", left: "25%", delay: "0.4s", size: "5px" },
  { top: "25%", right: "30%", delay: "1.8s", size: "3px" },
  { top: "55%", left: "40%", delay: "2.8s", size: "4px" },
];

const Index = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    try {
      const body = {
        data: {
          type: "subscription" as const,
          attributes: {
            profile: {
              data: {
                type: "profile" as const,
                attributes: { email: trimmed },
              },
            },
          },
          ...(KLAVIYO_LIST_ID && {
            relationships: {
              list: { data: { type: "list" as const, id: KLAVIYO_LIST_ID } },
            },
          }),
        },
      };
      if (KLAVIYO_LIST_ID) {
        body.data.relationships = {
          list: { data: { type: "list", id: KLAVIYO_LIST_ID } },
        };
      }

      const res = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Revision": KLAVIYO_API_REVISION,
          },
          body: JSON.stringify(body),
        }
      );

      if (res.status === 202) {
        setSubmitted(true);
        setEmail("");
        if (typeof window !== "undefined" && window.klaviyo?.push) {
          window.klaviyo.push([
            "track",
            "Joined Waitlist",
            { email: trimmed, $source: "Early bird signup" },
          ]);
        }
      } else {
        const text = await res.text();
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "We couldn't add you right now. Please try again later.",
        });
        console.error("Klaviyo subscription error", res.status, text);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please check your connection and try again.",
      });
      console.error("Klaviyo subscription error", err);
    } finally {
      setLoading(false);
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

      {/* Sparkle particles */}
      {sparklePositions.map((pos, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            animationDelay: pos.delay,
            width: pos.size,
            height: pos.size,
          }}
        />
      ))}

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 pt-20 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-glow bg-secondary mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary font-body">Coming Soon</span>
        </div>

        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-3 max-w-4xl leading-[1.1]">
          <span className="text-gradient-enchanted">Uniquely</span>
        </h1>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 max-w-4xl leading-[1.1]">
          <span className="text-gradient-enchanted">Enchanted</span>
        </h1>

        <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mb-12 font-body leading-relaxed">
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
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body disabled:opacity-70"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-4 rounded-lg bg-gradient-enchanted text-primary-foreground font-semibold hover:opacity-90 transition-all glow-pink flex items-center gap-2 shrink-0 font-body disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    Joining…
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Join
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            <p className="text-muted-foreground text-xs mt-3 font-body">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="flex items-center gap-3 px-6 py-4 rounded-lg border-glow bg-secondary">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <span className="text-foreground font-medium font-body">You're in! Check your inbox for a confirmation.</span>
          </div>
        )}
      </section>

      {/* Gifts section */}
      <section className="relative px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Your Free <span className="text-gradient-enchanted">Gifts</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto font-body">
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
              <h3 className="font-display text-2xl font-semibold mb-3 text-foreground">
                {gift.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {gift.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="relative text-center py-12">
        <p className="text-muted-foreground font-body mb-6 text-lg">Follow us for sneak peeks ✨</p>
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://instagram.com/YOUR_HANDLE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full border-glow bg-secondary hover:glow-pink transition-all duration-300 text-foreground font-body"
          >
            <Instagram className="w-5 h-5 text-primary" />
            <span>Instagram</span>
          </a>
          <a
            href="https://tiktok.com/@YOUR_HANDLE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full border-glow bg-secondary hover:glow-pink transition-all duration-300 text-foreground font-body"
          >
            <TikTokIcon />
            <span>TikTok</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-center py-10 border-t border-border">
        <p className="text-muted-foreground text-sm font-body">
          © {new Date().getFullYear()} Uniquely Enchanted · Launching Soon
        </p>
      </footer>
    </div>
  );
};

export default Index;
