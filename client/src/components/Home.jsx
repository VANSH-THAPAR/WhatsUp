import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Twitter, Github, ChevronRight, MessageCircle, Users, Bot, Settings, Send } from 'lucide-react';

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

/* ──────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay }
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }
  }),
};

/* ──────────────────────────────────────────────────────────
   FLOATING CHAT BUBBLES — makes it feel like a chat app
   ────────────────────────────────────────────────────────── */
const CHAT_CONVERSATIONS = [
  { text: "Hey! Are you around? 👋", sender: "left", top: "18%", left: "5%", delay: 0.5, float: 4 },
  { text: "Yeah, what's up?", sender: "right", top: "26%", left: "78%", delay: 1.2, float: 5 },
  { text: "Let's build something 🚀", sender: "left", top: "65%", left: "8%", delay: 0.8, float: 4.5 },
  { text: "I'm in! Send the link", sender: "right", top: "72%", left: "72%", delay: 1.5, float: 6 },
  { text: "Done ✅", sender: "left", top: "82%", left: "15%", delay: 2, float: 5.5 },
];

const FloatingChatBubbles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3] hidden lg:block">
    {CHAT_CONVERSATIONS.map((msg, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ top: msg.top, left: msg.left }}
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={{
          opacity: [0, 1, 1, 0.8],
          scale: 1,
          y: [30, 0, -10, 0],
        }}
        transition={{
          duration: msg.float,
          delay: msg.delay,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <div className={`liquid-glass px-4 py-2.5 rounded-2xl ${
          msg.sender === 'left'
            ? 'rounded-bl-sm bg-white/5'
            : 'rounded-br-sm bg-[#b724ff]/15 border border-[#b724ff]/20'
        } backdrop-blur-md shadow-lg shadow-black/30 max-w-[200px]`}>
          <p className="text-cream text-[13px] font-sans leading-snug whitespace-nowrap">{msg.text}</p>
        </div>
        {/* Connecting line to simulate conversation flow */}
        <div className={`w-px h-6 ${msg.sender === 'left' ? 'bg-white/10 ml-4' : 'bg-[#b724ff]/20 ml-auto mr-4'}`} />
        <div className={`w-2 h-2 rounded-full ${
          msg.sender === 'left' ? 'bg-neon shadow-[0_0_8px_#6FFF00]' : 'bg-[#b724ff] shadow-[0_0_8px_#b724ff]'
        } ${msg.sender === 'left' ? 'ml-3' : 'ml-auto mr-3'}`} />
      </motion.div>
    ))}
  </div>
);

/* ── Animated orbs that look like users chatting ── */
const ChatOrbs = ({ className = '' }) => {
  const orbs = [
    { size: 48, color: '#6FFF00', x: '20%', y: '35%', delay: 0, label: 'V' },
    { size: 40, color: '#b724ff', x: '75%', y: '25%', delay: 0.5, label: 'A' },
    { size: 36, color: '#6FFF00', x: '60%', y: '70%', delay: 1, label: 'S' },
    { size: 44, color: '#b724ff', x: '35%', y: '75%', delay: 1.5, label: 'R' },
    { size: 32, color: '#EFF4FF', x: '85%', y: '55%', delay: 2, label: 'M' },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none z-[2] ${className}`}>
      {/* Connection lines between orbs */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <line x1="20%" y1="35%" x2="75%" y2="25%" stroke="#b724ff" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="75%" y1="25%" x2="60%" y2="70%" stroke="#6FFF00" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="60%" y1="70%" x2="35%" y2="75%" stroke="#b724ff" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" values="0;-12" dur="1.8s" repeatCount="indefinite" />
        </line>
        <line x1="35%" y1="75%" x2="20%" y2="35%" stroke="#6FFF00" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" values="0;-12" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="85%" y1="55%" x2="60%" y2="70%" stroke="#EFF4FF" strokeWidth="1" strokeDasharray="4 8">
          <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.2s" repeatCount="indefinite" />
        </line>
      </svg>

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center"
          style={{ left: orb.x, top: orb.y, width: orb.size, height: orb.size }}
          animate={{
            y: [0, -8, 0, 8, 0],
            x: [0, 4, 0, -4, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: orb.color, animationDuration: `${3 + i}s` }}
          />
          {/* Orb */}
          <div
            className="relative rounded-full flex items-center justify-center font-grotesk text-[12px] text-navy font-bold"
            style={{
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              boxShadow: `0 0 20px ${orb.color}60, 0 0 40px ${orb.color}30`,
            }}
          >
            {orb.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ──────────────────────────────────────────────────────────
   ANIMATED CHAT PREVIEW — makes section 2 feel like a chat app
   ────────────────────────────────────────────────────────── */
const AnimatedChatPreview = () => {
  const messages = [
    { text: "Hey! Are you around?", from: "them", time: "2:30 PM" },
    { text: "Yeah 👋 What's up?", from: "me", time: "2:31 PM" },
    { text: "Working on something crazy.", from: "them", time: "2:31 PM" },
    { text: "Send it over!", from: "me", time: "2:32 PM" },
    { text: "Give me 2 minutes.", from: "them", time: "2:32 PM" },
    { text: "Done 🚀", from: "me", time: "2:34 PM" },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < messages.length) {
      const timer = setTimeout(() => setVisibleCount(v => v + 1), 1200);
      return () => clearTimeout(timer);
    }
    // Reset after a pause
    const resetTimer = setTimeout(() => setVisibleCount(0), 4000);
    return () => clearTimeout(resetTimer);
  }, [visibleCount, messages.length]);

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={0.4}
      className="liquid-glass rounded-[28px] p-5 max-w-sm w-full mx-auto lg:mx-0 shadow-2xl shadow-black/40"
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center text-navy font-grotesk text-[11px]">W</div>
        <div>
          <span className="font-grotesk text-[14px] text-cream block">WHATSUP</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse shadow-[0_0_6px_#6FFF00]" />
            <span className="font-mono text-[10px] text-cream/50">4 ONLINE</span>
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2.5 min-h-[220px]">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-3.5 py-2 rounded-2xl ${
              msg.from === 'me'
                ? 'bg-[#b724ff]/25 rounded-br-sm border border-[#b724ff]/20'
                : 'bg-white/5 rounded-bl-sm border border-white/10'
            }`}>
              <p className="text-cream text-[13px] leading-snug">{msg.text}</p>
              <span className="text-cream/30 text-[9px] font-mono mt-0.5 block text-right">{msg.time}</span>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {visibleCount < messages.length && visibleCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex ${messages[visibleCount]?.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="bg-white/5 rounded-2xl rounded-bl-sm px-4 py-2.5 border border-white/10">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cream/40 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cream/40 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cream/40 animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
        <div className="flex-1 bg-white/5 rounded-full px-4 py-2 border border-white/10">
          <span className="text-cream/30 text-[12px] font-mono">Write something...</span>
        </div>
        <button className="w-9 h-9 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center text-white shadow-lg shadow-purple-500/40 hover:scale-110 transition-transform">
          <Send size={14} />
        </button>
      </div>
    </motion.div>
  );
};

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
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden rounded-b-[32px]">
      <BgVideo src={VIDEOS.hero} />
      {/* Stronger overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-[1]" />

      {/* Floating chat bubbles */}
      <FloatingChatBubbles />

      <div className="relative z-10 flex flex-col h-full max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* ── Navbar ── */}
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-between pt-6 lg:pt-8"
        >
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
                    <a href={link.href} className="font-grotesk text-[13px] uppercase text-cream/70 hover:text-neon transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <button onClick={link.action} className="font-grotesk text-[13px] uppercase text-cream/70 hover:text-neon transition-colors">
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-[100px] hidden lg:block" />
        </motion.header>

        {/* ── Hero content ── */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex-1 flex items-center">
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12">
            <div className="relative lg:ml-32 max-w-[780px]">
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.3}
                className="font-grotesk text-cream uppercase text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px] leading-[1.05] sm:leading-[1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              >
                Connect.<br />Talk.<br />Belong.
              </motion.h1>

              <motion.span
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 0.9, scale: 1, rotate: -1 }}
                transition={{ duration: 1, delay: 1, type: "spring" }}
                className="absolute -right-4 sm:right-0 top-0 sm:top-4 font-condiment text-neon text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] mix-blend-exclusion drop-shadow-[0_0_20px_rgba(111,255,0,0.4)]"
              >
                without limits
              </motion.span>
            </div>

            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={1.2}>
              <SocialIcons vertical className="hidden lg:flex mt-4" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="lg:hidden flex justify-center pb-12"
        >
          <SocialIcons />
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   SECTION 2 — ABOUT
   ────────────────────────────────────────────────────────── */
const AboutSection = () => (
  <section id="about" className="relative w-full min-h-screen overflow-hidden">
    <BgVideo src={VIDEOS.about} />
    {/* Much stronger overlay so text is clearly visible */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-[#010828]/60 to-black/70 z-[1]" />

    {/* Chat orbs — users chatting with each other */}
    <ChatOrbs className="hidden lg:block" />

    <div className="relative z-10 max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-24">
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-16 lg:mb-24">
        {/* Left — Heading */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="relative"
        >
          <h2 className="font-grotesk text-cream uppercase text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            A new space<br />for real<br />conversations.
          </h2>
          <motion.span
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.6}
            className="absolute -bottom-6 right-0 sm:-bottom-8 sm:right-4 font-condiment text-neon text-[36px] sm:text-[48px] md:text-[56px] lg:text-[68px] rotate-2 mix-blend-exclusion drop-shadow-[0_0_20px_rgba(111,255,0,0.4)]"
          >
            talk freely
          </motion.span>
        </motion.div>

        {/* Right — Chat preview */}
        <AnimatedChatPreview />
      </div>

      {/* Description */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
        className="font-mono text-[14px] sm:text-[15px] md:text-[16px] text-cream uppercase max-w-[350px] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
      >
        WhatsUp gives conversations a new place to exist. Talk with friends. Build communities. Share ideas. Stay connected — all in one place.
      </motion.p>
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
          <motion.h2
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            className="font-grotesk text-cream uppercase text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1]"
          >
            Everything you<br />
            <span className="ml-12 sm:ml-16 md:ml-24 lg:ml-32">
              need to{' '}
              <span className="font-condiment text-neon normal-case">connect</span>
            </span>
          </motion.h2>

          <motion.button
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.2}
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
          </motion.button>
        </div>

        {/* ── Feature Card Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_CARDS.map((card, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i * 0.15}
              className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
              onClick={() => navigate(card.route)}
            >
              <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden">
                <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
                  <source src={card.video} type="video/mp4" />
                </video>
              </div>

              <div className="liquid-glass rounded-[20px] px-5 py-4 mt-4 flex items-center justify-between">
                <div>
                  <span className="block font-mono text-[11px] text-cream/70 uppercase tracking-wider">{card.label}:</span>
                  <span className="block font-mono text-[16px] text-cream font-bold">{card.stat}</span>
                </div>
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center text-white shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform">
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
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
              <motion.button
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1 + i * 0.1}
                onClick={() => navigate(item.route)}
                className="liquid-glass rounded-[20px] px-5 py-6 flex flex-col items-center gap-3 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1"
              >
                <Icon size={28} className="text-neon group-hover:scale-110 transition-transform" />
                <span className="font-grotesk text-[13px] text-cream uppercase tracking-wider">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────
   SECTION 4 — CTA
   ────────────────────────────────────────────────────────── */
const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="relative w-full bg-navy overflow-hidden">
      <video autoPlay loop muted playsInline preload="auto" className="w-full h-auto block">
        <source src={VIDEOS.cta} type="video/mp4" />
      </video>

      {/* Stronger overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 z-[1]" />

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-end z-10">
        <div className="w-full max-w-[1831px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 lg:pr-[20%] lg:pl-[15%]">
          <div className="relative">
            <motion.span
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="absolute -top-6 sm:-top-8 md:-top-10 left-0 font-condiment text-neon text-[17px] sm:text-[28px] md:text-[40px] lg:text-[68px] mix-blend-exclusion drop-shadow-[0_0_20px_rgba(111,255,0,0.4)]"
            >
              See you inside
            </motion.span>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
              className="font-grotesk text-cream uppercase text-[16px] sm:text-[28px] md:text-[40px] lg:text-[60px] leading-[1.1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            >
              <span className="block mb-4 sm:mb-6 md:mb-8 lg:mb-12">WHAT'S UP?</span>
              JOIN THE CONVERSATION.<br />
              MEET YOUR PEOPLE.<br />
              BUILD SOMETHING TOGETHER.
            </motion.h2>

            <motion.button
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              onClick={() => navigate('/signup')}
              className="mt-6 sm:mt-8 md:mt-10 lg:mt-14 liquid-glass rounded-full px-8 sm:px-10 py-3 sm:py-4 font-grotesk text-[14px] sm:text-[18px] md:text-[22px] text-cream uppercase tracking-wider hover:bg-white/10 transition-all duration-300 group hover:scale-105"
            >
              Start Chatting
              <span className="block w-full h-[2px] bg-neon mt-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.button>
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
