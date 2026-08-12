import React from 'react';
import { Mail, Twitter, Github, ChevronRight } from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   VIDEO URLS
   ────────────────────────────────────────────────────────── */
const VIDEOS = {
  hero: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4',
  about: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4',
  cta: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4',
  nft1: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
  nft2: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
  nft3: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
};

const NFT_CARDS = [
  { video: VIDEOS.nft1, score: '8.7/10' },
  { video: VIDEOS.nft2, score: '9/10' },
  { video: VIDEOS.nft3, score: '8.2/10' },
];

const DECORATIVE_PARAGRAPH =
  'A digital object fixed beyond time and place. An exploration of distance, form, and silence in space';

/* ──────────────────────────────────────────────────────────
   SMALL REUSABLE COMPONENTS
   ────────────────────────────────────────────────────────── */

/** Social icon row / column */
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

/** Background video that fills its container */
const BgVideo = ({ src, className = '' }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    className={`absolute inset-0 w-full h-full object-cover ${className}`}
    src={src}
  />
);

/* ──────────────────────────────────────────────────────────
   SECTION 1 — HERO
   ────────────────────────────────────────────────────────── */
const HeroSection = () => (
  <section className="relative w-full h-screen overflow-hidden rounded-b-[32px]">
    {/* Video background */}
    <BgVideo src={VIDEOS.hero} />

    {/* Texture overlay local to section */}
    <div className="absolute inset-0 bg-black/30 z-[1]" />

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
      {/* ── Header / Navbar ── */}
      <header className="flex items-center justify-between pt-6 lg:pt-8">
        {/* Logo */}
        <span className="font-grotesk text-[16px] uppercase text-cream tracking-wider">
          Orbis.Nft
        </span>

        {/* Nav — hidden on mobile */}
        <nav className="hidden lg:block liquid-glass rounded-[28px] px-[52px] py-[24px]">
          <ul className="flex gap-8">
            {['Homepage', 'Gallery', 'Buy NFT', 'FAQ', 'Contact'].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="font-grotesk text-[13px] uppercase text-cream/70 hover:text-neon transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Spacer for alignment */}
        <div className="w-[100px] hidden lg:block" />
      </header>

      {/* ── Hero content ── */}
      <div className="flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left — Heading */}
          <div className="relative lg:ml-32 max-w-[780px]">
            <h1 className="font-grotesk text-cream uppercase text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px] leading-[1.05] sm:leading-[1] md:leading-[1] lg:leading-[1]">
              Beyond earth<br />
              and ( its )<br className="hidden sm:block" /> familiar<br className="sm:hidden" /> boundaries
            </h1>

            {/* Cursive accent */}
            <span className="absolute -right-4 sm:right-0 top-0 sm:top-4 font-condiment text-neon text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] -rotate-1 mix-blend-exclusion opacity-90">
              Nft collection
            </span>
          </div>

          {/* Right — Social icons (desktop only) */}
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

/* ──────────────────────────────────────────────────────────
   SECTION 2 — ABOUT / INTRO
   ────────────────────────────────────────────────────────── */
const AboutSection = () => (
  <section className="relative w-full min-h-screen overflow-hidden">
    {/* Video background */}
    <BgVideo src={VIDEOS.about} />
    <div className="absolute inset-0 bg-black/20 z-[1]" />

    {/* Content */}
    <div className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-24">
      {/* ── Top row ── */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-24 lg:mb-32">
        {/* Left — Heading */}
        <div className="relative">
          <h2 className="font-grotesk text-cream uppercase text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1]">
            Hello!<br />
            I'm orbis
          </h2>

          {/* Cursive accent */}
          <span className="absolute -bottom-6 right-0 sm:-bottom-8 sm:right-4 font-condiment text-neon text-[36px] sm:text-[48px] md:text-[56px] lg:text-[68px] rotate-2 mix-blend-exclusion">
            Orbis
          </span>
        </div>

        {/* Right — Description */}
        <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] text-cream uppercase max-w-[266px] leading-relaxed">
          {DECORATIVE_PARAGRAPH}
        </p>
      </div>

      {/* ── Bottom row — decorative text ── */}
      <div className="flex justify-between gap-8">
        {/* Left column */}
        <div className="flex flex-col gap-8 max-w-[266px]">
          <p className="font-mono text-[14px] sm:text-[16px] uppercase leading-relaxed text-cream/10 text-[#010828] lg:text-cream/10">
            {DECORATIVE_PARAGRAPH}
          </p>
          <p className="font-mono text-[14px] sm:text-[16px] uppercase leading-relaxed text-cream/10 text-[#010828] lg:text-cream/10">
            {DECORATIVE_PARAGRAPH}
          </p>
        </div>

        {/* Right column — hidden below lg */}
        <div className="hidden lg:flex flex-col gap-8 max-w-[266px]">
          <p className="font-mono text-[14px] sm:text-[16px] uppercase leading-relaxed text-cream/10">
            {DECORATIVE_PARAGRAPH}
          </p>
          <p className="font-mono text-[14px] sm:text-[16px] uppercase leading-relaxed text-cream/10">
            {DECORATIVE_PARAGRAPH}
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ──────────────────────────────────────────────────────────
   SECTION 3 — NFT COLLECTION GRID
   ────────────────────────────────────────────────────────── */
const CollectionSection = () => (
  <section className="relative w-full bg-navy overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32">
    <div className="max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
      {/* ── Header row ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 lg:mb-20">
        {/* Left — Heading */}
        <h2 className="font-grotesk text-cream uppercase text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1]">
          Collection of<br />
          <span className="ml-12 sm:ml-16 md:ml-24 lg:ml-32">
            <span className="font-condiment text-neon normal-case">Space</span>{' '}
            objects
          </span>
        </h2>

        {/* Right — "SEE ALL CREATORS" button */}
        <button className="group flex-shrink-0">
          <div className="flex items-end gap-2 text-cream">
            <span className="font-grotesk text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] uppercase leading-none">
              SEE
            </span>
            <div className="flex flex-col leading-none mb-1">
              <span className="font-grotesk text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] uppercase">ALL</span>
              <span className="font-grotesk text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] uppercase">CREATORS</span>
            </div>
          </div>
          <div className="w-full h-[6px] sm:h-[8px] md:h-[10px] bg-neon mt-2 group-hover:opacity-80 transition-opacity" />
        </button>
      </div>

      {/* ── NFT Card Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NFT_CARDS.map((card, i) => (
          <div
            key={i}
            className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-colors"
          >
            {/* Square video container */}
            <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src={card.video}
              />
            </div>

            {/* Bottom info bar */}
            <div className="liquid-glass rounded-[20px] px-5 py-4 mt-4 flex items-center justify-between">
              <div>
                <span className="block font-mono text-[11px] text-cream/70 uppercase tracking-wider">
                  Rarity Score:
                </span>
                <span className="block font-mono text-[16px] text-cream font-bold">
                  {card.score}
                </span>
              </div>
              <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center text-white shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ──────────────────────────────────────────────────────────
   SECTION 4 — CTA / FINAL
   ────────────────────────────────────────────────────────── */
const CtaSection = () => (
  <section className="relative w-full bg-navy overflow-hidden">
    {/* Video — full width, natural aspect ratio */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-auto block"
      src={VIDEOS.cta}
    />

    {/* Text overlay */}
    <div className="absolute inset-0 flex items-center justify-end z-10">
      <div className="w-full max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 lg:pr-[20%] lg:pl-[15%]">
        <div className="relative">
          {/* Cursive accent */}
          <span className="absolute -top-6 sm:-top-8 md:-top-10 left-0 font-condiment text-neon text-[17px] sm:text-[28px] md:text-[40px] lg:text-[68px] mix-blend-exclusion">
            Go beyond
          </span>

          {/* Main heading */}
          <h2 className="font-grotesk text-cream uppercase text-[16px] sm:text-[28px] md:text-[40px] lg:text-[60px] leading-[1.1]">
            <span className="block mb-4 sm:mb-6 md:mb-8 lg:mb-12">JOIN US.</span>
            REVEAL WHAT'S HIDDEN.<br />
            DEFINE WHAT'S NEXT.<br />
            FOLLOW THE SIGNAL.
          </h2>
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

/* ──────────────────────────────────────────────────────────
   HOME — ASSEMBLES ALL SECTIONS
   ────────────────────────────────────────────────────────── */
const Home = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-navy custom-scrollbar selection:bg-neon selection:text-navy">
      {/* Global texture overlay */}
      <div className="texture-overlay" />

      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <CollectionSection />
      <CtaSection />
    </div>
  );
};

export default Home;
