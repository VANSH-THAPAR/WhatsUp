import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Twitter, Github, ChevronRight, MessageCircle, Users, Bot, Settings } from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   VIDEO URLS
   ────────────────────────────────────────────────────────── */
const VIDEOS = {
  hero: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4',
  about: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4',
  cta: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4',
  feature1: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
  feature2: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
  feature3: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
};

const FEATURE_CARDS = [
  { video: VIDEOS.feature1, label: 'INSTANT MESSAGING', stat: 'REAL-TIME', route: '/chats' },
  { video: VIDEOS.feature2, label: 'COMMUNITY SPACES', stat: 'LIVE NOW', route: '/community' },
  { video: VIDEOS.feature3, label: 'AI ASSISTANT', stat: 'ALWAYS ON', route: '/chatbot' },
];

const DESCRIPTION_TEXT =
  'A new space for real conversations. Connect with friends, build communities, share ideas, and stay connected — all in one place.';

/* ──────────────────────────────────────────────────────────
   SMALL REUSABLE COMPONENTS
   ────────────────────────────────────────────────────────── */

const SocialIcons = ({ vertical = false, className = '' }) => {
  const icons = [Mail, Twitter, Github];
  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-3 ${className}`}>
      {icons.map((Icon, i) => (
        <button
          key={i}
          className="liquid-glass w-14 h-14 rounded-[1rem] flex items-center justify-center text-cream/70 hover:bg-white/10 transition-colors"
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
};

const BgVideo = ({ src, className = '' }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    className={`absolute inset-0 w-full h-full object-cover ${className}`}
  >
    <source src={src} type="video/mp4" />
  </video>
);

/* ──────────────────────────────────────────────────────────
   SECTION 1 — HERO
   ────────────────────────────────────────────────────────── */
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden rounded-b-[32px]">
      <BgVideo src={VIDEOS.hero} />
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      <div className="relative z-10 flex flex-col h-full max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* ── Header / Navbar ── */}
        <header className="flex items-center justify-between pt-6 lg:pt-8">
          <span
            onClick={() => navigate('/')}
            className="font-grotesk text-[16px] uppercase text-cream tracking-wider cursor-pointer hover:text-neon transition-colors"
          >
            WhatsUp
          </span>

          <nav className="hidden lg:block liquid-glass rounded-[28px] px-[52px] py-[24px]">
            <ul className="flex gap-8">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Chat', action: () => navigate('/chats') },
                { label: 'Features', href: '#features' },
                { label: 'Community', action: () => navigate('/community') },
                { label: 'Sign Up', action: () => navigate('/signup') },
              ].map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      className="font-grotesk text-[13px] uppercase text-cream/70 hover:text-neon transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={link.action}
                      className="font-grotesk text-[13px] uppercase text-cream/70 hover:text-neon transition-colors"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-[100px] hidden lg:block" />
        </header>

        {/* ── Hero content ── */}
        <div className="flex-1 flex items-center">
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12">
            <div className="relative lg:ml-32 max-w-[780px]">
              <h1 className="font-grotesk text-cream uppercase text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px] leading-[1.05] sm:leading-[1] md:leading-[1] lg:leading-[1]">
                Connect.<br />
                Talk.<br />
                Belong.
              </h1>

              <span className="absolute -right-4 sm:right-0 top-0 sm:top-4 font-condiment text-neon text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] -rotate-1 mix-blend-exclusion opacity-90">
                without limits
              </span>
            </div>

            <SocialIcons vertical className="hidden lg:flex mt-4" />
          </div>
        </div>

        {/* Mobile social icons */}
        <div className="lg:hidden flex justify-center pb-12">
          <SocialIcons />
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   SECTION 2 — ABOUT / INTRO
   ────────────────────────────────────────────────────────── */
const AboutSection = () => (
  <section id="about" className="relative w-full min-h-screen overflow-hidden">
    <BgVideo src={VIDEOS.about} />
    <div className="absolute inset-0 bg-black/20 z-[1]" />

    <div className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-24">
      {/* ── Top row ── */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-24 lg:mb-32">
        <div className="relative">
          <h2 className="font-grotesk text-cream uppercase text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1]">
            A new space<br />
            for real<br />
            conversations.
          </h2>

          <span className="absolute -bottom-6 right-0 sm:-bottom-8 sm:right-4 font-condiment text-neon text-[36px] sm:text-[48px] md:text-[56px] lg:text-[68px] rotate-2 mix-blend-exclusion">
            talk freely
          </span>
        </div>

        <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] text-cream uppercase max-w-[266px] leading-relaxed">
          {DESCRIPTION_TEXT}
        </p>
      </div>

      {/* ── Bottom row — decorative text ── */}
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-8 max-w-[266px]">
          <p className="font-mono text-[14px] sm:text-[16px] uppercase leading-relaxed text-[#010828] lg:text-cream/10">
            {DESCRIPTION_TEXT}
          </p>
          <p className="font-mono text-[14px] sm:text-[16px] uppercase leading-relaxed text-[#010828] lg:text-cream/10">
            {DESCRIPTION_TEXT}
          </p>
        </div>

        <div className="hidden lg:flex flex-col gap-8 max-w-[266px]">
          <p className="font-mono text-[14px] sm:text-[16px] uppercase leading-relaxed text-cream/10">
            {DESCRIPTION_TEXT}
          </p>
          <p className="font-mono text-[14px] sm:text-[16px] uppercase leading-relaxed text-cream/10">
            {DESCRIPTION_TEXT}
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ──────────────────────────────────────────────────────────
   SECTION 3 — FEATURES
   ────────────────────────────────────────────────────────── */
const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="features" className="relative w-full bg-navy overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* ── Header row ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 lg:mb-20">
          <h2 className="font-grotesk text-cream uppercase text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1]">
            Everything you<br />
            <span className="ml-12 sm:ml-16 md:ml-24 lg:ml-32">
              need to{' '}
              <span className="font-condiment text-neon normal-case">connect</span>
            </span>
          </h2>

          <button
            onClick={() => navigate('/signup')}
            className="group flex-shrink-0"
          >
            <div className="flex items-end gap-2 text-cream">
              <span className="font-grotesk text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] uppercase leading-none">
                GET
              </span>
              <div className="flex flex-col leading-none mb-1">
                <span className="font-grotesk text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] uppercase">STARTED</span>
                <span className="font-grotesk text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] uppercase">NOW</span>
              </div>
            </div>
            <div className="w-full h-[6px] sm:h-[8px] md:h-[10px] bg-neon mt-2 group-hover:opacity-80 transition-opacity" />
          </button>
        </div>

        {/* ── Feature Card Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_CARDS.map((card, i) => (
            <div
              key={i}
              className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => navigate(card.route)}
            >
              {/* Square video container */}
              <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={card.video} type="video/mp4" />
                </video>
              </div>

              {/* Bottom info bar */}
              <div className="liquid-glass rounded-[20px] px-5 py-4 mt-4 flex items-center justify-between">
                <div>
                  <span className="block font-mono text-[11px] text-cream/70 uppercase tracking-wider">
                    {card.label}:
                  </span>
                  <span className="block font-mono text-[16px] text-cream font-bold">
                    {card.stat}
                  </span>
                </div>
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center text-white shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Quick-access row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { icon: MessageCircle, label: 'Start Chatting', route: '/chats' },
            { icon: Users, label: 'Community', route: '/community' },
            { icon: Bot, label: 'AI Assistant', route: '/chatbot' },
            { icon: Settings, label: 'Settings', route: '/settings' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => navigate(item.route)}
                className="liquid-glass rounded-[20px] px-5 py-6 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors group"
              >
                <Icon size={28} className="text-neon group-hover:scale-110 transition-transform" />
                <span className="font-grotesk text-[13px] text-cream uppercase tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   SECTION 4 — CTA / FINAL
   ────────────────────────────────────────────────────────── */
const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="relative w-full bg-navy overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-auto block"
      >
        <source src={VIDEOS.cta} type="video/mp4" />
      </video>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-end z-10">
        <div className="w-full max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 lg:pr-[20%] lg:pl-[15%]">
          <div className="relative">
            <span className="absolute -top-6 sm:-top-8 md:-top-10 left-0 font-condiment text-neon text-[17px] sm:text-[28px] md:text-[40px] lg:text-[68px] mix-blend-exclusion">
              See you inside
            </span>

            <h2 className="font-grotesk text-cream uppercase text-[16px] sm:text-[28px] md:text-[40px] lg:text-[60px] leading-[1.1]">
              <span className="block mb-4 sm:mb-6 md:mb-8 lg:mb-12">WHAT'S UP?</span>
              JOIN THE CONVERSATION.<br />
              MEET YOUR PEOPLE.<br />
              BUILD SOMETHING TOGETHER.
            </h2>

            <button
              onClick={() => navigate('/signup')}
              className="mt-6 sm:mt-8 md:mt-10 lg:mt-14 liquid-glass rounded-full px-8 sm:px-10 py-3 sm:py-4 font-grotesk text-[14px] sm:text-[18px] md:text-[22px] text-cream uppercase tracking-wider hover:bg-white/10 transition-colors group"
            >
              Start Chatting
              <span className="block w-full h-[2px] bg-neon mt-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>
        </div>
      </div>

      {/* Social icons — bottom-left */}
      <div className="absolute left-[8%] bottom-[12%] sm:bottom-[15%] md:bottom-[18%] lg:bottom-[20%] z-20">
        <div className="liquid-glass rounded-[0.5rem] sm:rounded-[0.75rem] md:rounded-[1rem] lg:rounded-[1.25rem] flex flex-col">
          {[Mail, Twitter, Github].map((Icon, i) => (
            <button
              key={i}
              className={`w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[14vw] sm:h-[4.375rem] md:h-[3.78125rem] lg:h-[5.77rem] flex items-center justify-center text-cream/70 hover:bg-white/10 transition-colors ${
                i < 2 ? 'border-b border-white/10' : ''
              }`}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   HOME — ASSEMBLES ALL SECTIONS
   ────────────────────────────────────────────────────────── */
const Home = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-navy custom-scrollbar selection:bg-neon selection:text-navy">
      <div className="texture-overlay" />

      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
};

export default Home;
