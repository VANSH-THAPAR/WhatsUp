import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, animate, useInView } from 'framer-motion';
import { MessageCircle, Shield, Globe, Zap, ArrowRight, Smartphone, Lock, Users, Activity, BarChart, Map, Cpu, Network, Wifi, Layers } from 'lucide-react';

const Spotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(34, 197, 94, 0.08),
            transparent 80%
          )
        `,
      }}
    />
  );
};

const ScrambleText = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
      setIsScrambling(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [words]);

  useEffect(() => {
    if (isScrambling) {
      const targetText = words[index];
      let scrambleIterations = 0;
      const maxIterations = 15;
      const chars = "!<>-_\\/[]{}—=+*^?#________";

      const scrambleInterval = setInterval(() => {
        setText((prev) => 
          targetText
            .split("")
            .map((letter, i) => {
              if (i < scrambleIterations) {
                return targetText[i];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (scrambleIterations >= targetText.length) {
          clearInterval(scrambleInterval);
          setIsScrambling(false);
        }
        
        scrambleIterations += 1 / 3; 
      }, 30);
      
      return () => clearInterval(scrambleInterval);
    }
  }, [index, isScrambling, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 font-mono">
      {text}
    </span>
  );
};

const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3); // Magnetic pull strength
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: mouseX, y: mouseY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const InfiniteMarquee = () => {
  const items = [
    "TechCorp", "InnovateLabs", "FutureSpace", "GreenEnergy", "CyberSystems", 
    "DataFlow", "BuildSmart", "SecureNet", "CloudScale", "DevUnity"
  ];
  
  // Duplicate the array to create a seamless loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="w-full py-10 bg-zinc-900/30 border-y border-white/5 overflow-hidden relative z-20">
      <div className="flex w-full">
         <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
         <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
         
         <motion.div 
           className="flex gap-16 items-center whitespace-nowrap"
           animate={{ x: [0, -1000] }}
           transition={{ 
             repeat: Infinity, 
             duration: 30, 
             ease: "linear" 
           }}
         >
            {marqueeItems.map((item, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-zinc-600 hover:text-zinc-400 transition-colors cursor-default uppercase tracking-wider">
                {item}
              </span>
            ))}
         </motion.div>
      </div>
      <p className="text-center text-zinc-600 text-xs mt-4 uppercase tracking-widest">Trusted by teams from</p>
    </div>
  );
};

const StatItem = ({ end, label, icon: Icon, suffix = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));
    
    useEffect(() => {
        if (inView) {
            const controls = animate(count, end, { duration: 2.5, ease: "circOut" });
            return controls.stop;
        }
    }, [inView, end, count]);

    return (
        <div ref={ref} className="p-8 md:p-12 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors duration-500 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white/5 text-zinc-400 group-hover:text-green-400 group-hover:bg-green-500/10 transition-colors">
                <Icon size={20} />
              </div>
              <span className="text-zinc-500 text-sm font-mono tracking-widest uppercase">{label}</span>
            </div>
            
            <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 flex items-baseline tracking-tighter">
                <motion.span>{rounded}</motion.span>
                <span className="text-3xl ml-1 text-zinc-600">{suffix}</span>
            </div>
        </div>
    );
};

const StatsCounter = () => {
  return (
    <section className="py-20 relative z-10 container mx-auto px-4">
      <div className="relative">
        {/* Glow effect behind the dashboard */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-50"></div>
        
        <div className="relative bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
           <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <StatItem end={12000} label="Active Users" icon={Users} suffix="+" />
              <StatItem end={500} label="Messages Daily" icon={MessageCircle} suffix="k" />
              <StatItem end={45} label="Countries" icon={Globe} />
           </div>
           
           {/* Decorative bottom line */}
           <div className="h-1 w-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

const BentoGrid = ({ children, className }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ${className}`}>
            {children}
        </div>
    );
};

const BentoItem = ({ title, description, header, icon: Icon, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-zinc-900/50 border border-white/10 backdrop-blur-sm justify-between flex flex-col space-y-4 relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/bento:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 197, 94, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 overflow-hidden relative">
          {header}
           {/* Scanline effect */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>
      
      <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
        <div className="flex items-center gap-2 mb-2 text-zinc-500 group-hover/bento:text-green-400 transition-colors">
            {Icon && <Icon size={18} />}
            <div className="font-mono text-xs font-bold uppercase tracking-wider">System Feature</div>
        </div>
        <div className="font-bold text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-normal text-neutral-400 text-xs leading-relaxed">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

const TypingSimulator = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);

  const conversation = [
    { id: 1, text: "Hey! Have you seen the new 3D update?", sender: "them" },
    { id: 2, text: "Yeah! It looks absolutely insane! 🤯", sender: "me" },
    { id: 3, text: "The depth effects are so smooth.", sender: "them" },
    { id: 4, text: "Can't wait to try it out.", sender: "me" },
  ];

  useEffect(() => {
    let timeout;
    
    if (step >= conversation.length) {
      timeout = setTimeout(() => {
        setMessages([]);
        setStep(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const nextMessage = conversation[step];
    
    setIsTyping(true);
    const typingDelay = Math.random() * 1000 + 800;

    timeout = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, nextMessage]);
      setStep(prev => prev + 1);
    }, typingDelay);

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="flex-1 py-6 space-y-4 px-4 overflow-hidden flex flex-col justify-end min-h-[200px]">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`p-3 rounded-2xl max-w-[85%] text-sm ${
            msg.sender === "me" 
              ? "self-end bg-green-600/20 border border-green-500/20 text-green-100 rounded-tr-none" 
              : "self-start bg-zinc-800/80 border border-white/5 text-zinc-300 rounded-tl-none"
          }`}
        >
          {msg.text}
        </motion.div>
      ))}
      
      {isTyping && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="self-start bg-zinc-800/80 p-3 rounded-2xl rounded-tl-none w-16 flex items-center gap-1 border border-white/5"
        >
          <motion.div 
            animate={{ y: [0, -3, 0] }} 
            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} 
            className="w-1.5 h-1.5 bg-zinc-500 rounded-full" 
          />
          <motion.div 
            animate={{ y: [0, -3, 0] }} 
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} 
            className="w-1.5 h-1.5 bg-zinc-500 rounded-full" 
          />
          <motion.div 
            animate={{ y: [0, -3, 0] }} 
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} 
            className="w-1.5 h-1.5 bg-zinc-500 rounded-full" 
          />
        </motion.div>
      )}
    </div>
  );
};

const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
  
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
            animate={{ 
              y: [ `${p.y}vh`, `${p.y - 10}vh`, `${p.y}vh` ],
              opacity: [0.1, 0.3, 0.1] 
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute rounded-full bg-green-500/20 blur-[1px]"
            style={{ 
              width: p.size, 
              height: p.size,
            }}
          />
        ))}
      </div>
    );
};

const Item3D = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  
  // Glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate relative position based on center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`${className} transition-all duration-200 ease-out`}
    >
      <div 
        className="relative h-full w-full" 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
      >
         {/* Moving Glare Layer */}
         <motion.div 
            className="absolute inset-0 z-20 pointer-events-none opacity-40 rounded-[40px]"
            style={{
                background: useMotionTemplate`radial-gradient(
                    circle at ${glareX} ${glareY},
                    rgba(255,255,255,0.2),
                    transparent 80%
                )`
            }}
         />
        {children}
      </div>
    </motion.div>
  );
};

const ParallaxSection = () => {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <section className="py-24 md:py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh] border-y border-white/5 bg-zinc-900/10">
            {/* Background Abstract 3D Visualization */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <motion.div 
                    style={{ rotate }}
                    className="w-[800px] h-[800px] border border-zinc-700/30 rounded-full flex items-center justify-center relative"
                >
                    <div className="absolute inset-0 border border-dashed border-zinc-700/30 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="w-[600px] h-[600px] border border-zinc-700/30 rounded-full flex items-center justify-center">
                        <div className="absolute inset-0 border border-dashed border-zinc-700/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                        <div className="w-[400px] h-[400px] border border-green-500/20 rounded-full bg-green-500/5 backdrop-blur-3xl animate-pulse"></div>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 relative z-10 w-full">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Zap size={14} /> Global Network
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                        Built for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Relative Speed</span>
                    </h2>
                    
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                        Our distributed architecture ensures your messages travel at the speed of light. 
                        Optimized for millisecond latency across 45 countries.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl">
                        {[
                            { label: "Latency", value: "< 20ms", icon: Activity },
                            { label: "Uptime", value: "99.99%", icon: BarChart },
                            { label: "Encryption", value: "AES-256", icon: Lock },
                            { label: "Regions", value: "Global", icon: Map },
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm"
                            >
                                <stat.icon className="text-zinc-500 mb-2" size={20} />
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-zinc-500 text-xs uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTASection = () => {
    const navigate = useNavigate();
    
    return (
        <section className="py-32 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Portal Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[150vw] h-[150vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-zinc-950/80 to-zinc-950 absolute z-0" />
                <div className="w-full h-full absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                        Ready to Enter the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Portal?</span>
                    </h2>
                    
                    <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-xl mx-auto">
                        Join the next generation of communication. Secure, fast, and beautifully designed.
                    </p>

                    <button 
                        onClick={() => navigate('/signup')}
                        className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-10 font-medium text-white shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)] transition-all duration-300 border border-zinc-800 hover:border-green-500/50"
                    >
                        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                            <div className="relative h-full w-8 bg-white/20" />
                        </div>
                        <span className="flex items-center gap-2 text-lg">
                            Get Started Now <ArrowRight size={20} />
                        </span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px)', 
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
      }}></div>
    </div>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden selection:bg-green-500/30">
      <Spotlight />
      <GridBackground />
      <FloatingParticles />
      
      {/* Navbar Placeholder for visual consistency */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-zinc-950/50">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600" style={{fontFamily: "Rubik Puddles"}}>WhatsUp</div>
        <button onClick={() => navigate('/login')} className="px-6 py-2 rounded-full border border-zinc-700 hover:border-green-500 text-zinc-300 hover:text-green-400 transition-all text-sm font-medium">
          Sign In
        </button>
      </nav>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-20 perspective-1000 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10">
          
          <div className="flex-1 text-center md:text-left w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest mb-6 shadow-[0_0_20px_rgba(34,197,94,0.15)] uppercase">
                The Future is Here
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 mt-2">
                Chat Beyond <br />
                <ScrambleText words={["Dimensions", "Boundaries", "Limits", "Distance"]} />
              </h1>
              <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
                Experience messaging like never before with our immersive 3D interface. Real-time, secure, and beautifully designed for the modern web.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <MagneticButton 
                  onClick={() => navigate('/signup')} 
                  className="group relative px-8 py-4 bg-green-500 text-black font-bold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all transform"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative flex items-center gap-2 justify-center">
                        Get Started <ArrowRight size={20} />
                    </span>
                </MagneticButton>
                
                <MagneticButton 
                    onClick={() => navigate('/community')}
                   className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Community</span>
                  <Globe size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 flex justify-center perspective-1000 w-full mt-8 md:mt-0">
             <Item3D className="w-full max-w-[300px] md:max-w-md aspect-square relative cursor-pointer group mx-auto">
                {/* Main 3D Container - Glass Cards Stack */}
                <div className="absolute inset-0 flex items-center justify-center transform-style-3d scale-75 md:scale-100">
                  
                  {/* Back Card */}
                  <motion.div 
                    initial={{ scale: 0.8, rotate: -10, z: -50 }}
                    animate={{ scale: 0.8, rotate: -10, z: -50 }}
                    className="absolute w-56 h-72 md:w-64 md:h-80 bg-zinc-800/40 rounded-3xl border border-white/5 backdrop-blur-sm -translate-x-8 md:-translate-x-12"
                    style={{ transform: "translateZ(-40px)" }}
                  />

                  {/* Middle Card */}
                  <motion.div 
                    initial={{ scale: 0.9, rotate: -5, z: -25 }}
                    animate={{ scale: 0.9, rotate: -5, z: -25 }}
                    className="absolute w-56 h-72 md:w-64 md:h-80 bg-zinc-800/60 rounded-3xl border border-white/10 backdrop-blur-md -translate-x-4 md:-translate-x-6"
                    style={{ transform: "translateZ(-20px)" }}
                  />

                  {/* Front Main Card */}
                  <div className="relative w-64 h-80 md:w-72 md:h-96 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-between overflow-hidden transform-style-3d group-hover:border-green-500/30 transition-colors duration-500">
                      
                      {/* Abstract Header */}
                      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(34,197,94,0.5)]">W</div>
                        <div className="space-y-2">
                           <div className="w-24 h-2 bg-zinc-700/50 rounded-full"></div>
                           <div className="w-16 h-2 bg-zinc-700/30 rounded-full"></div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 p-2 h-full overflow-hidden w-full">
                         <TypingSimulator />
                      </div>
                      
                      {/* Interactive Float Element */}
                      <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-green-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-green-500/30 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Floating Badge 1 - Moves Faster */}
                <motion.div 
                    animate={{ y: [0, -15, 0] }} 
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 p-4 bg-zinc-900/90 border border-zinc-700/50 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm"
                    style={{ transform: "translateZ(80px)" }}
                >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
                        <Lock size={20} />
                    </div>
                </motion.div>

                {/* Floating Badge 2 - Moves Deepest */}
                <motion.div 
                    animate={{ y: [0, 15, 0] }} 
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-10 -left-6 p-4 bg-zinc-900/90 border border-zinc-700/50 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm"
                    style={{ transform: "translateZ(120px)" }}
                >
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 shadow-inner">
                        <Zap size={20} />
                    </div>
                </motion.div>
             </Item3D>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
            style={{ opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
        >
            <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-12 rounded-full bg-gradient-to-b from-green-500/0 via-green-500 to-green-500/0"
            />
        </motion.div>
      </section>

      {/* Infinite Marquee Section */}
      <InfiniteMarquee />

      {/* Stats Counter Section */}
      <StatsCounter />

      {/* Features Section - Bento Grid */}
      <section className="py-20 md:py-32 relative z-10 px-4 max-w-7xl mx-auto">
        <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12 md:mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the Future</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
                    Every feature is crafted with precision to deliver the best messaging experience possible.
                </p>
        </motion.div>
        
        <BentoGrid>
          <BentoItem
            title="End-to-End Encryption"
            description="Your personal messages and calls are secured with end-to-end encryption. No one outside of your chats, not even WhatsUp, can read or listen to them."
            header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center bg-zinc-900">
                    <Shield size={64} className="text-green-500/50" />
                </div>
            }
            icon={Shield}
            className="md:col-span-2"
          />
          <BentoItem
            title="Real-time Translation"
            description="Break language barriers instantly. Type in your language, they read in theirs."
            header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center bg-zinc-900">
                     <Globe size={64} className="text-blue-500/50" />
                </div>
            }
            icon={Globe}
            className="md:col-span-1"
          />
          <BentoItem
            title="Lightning Fast"
            description="Optimized for speed. Messages deliver in milliseconds anywhere on Earth."
            header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center bg-zinc-900">
                    <Zap size={64} className="text-yellow-500/50" />
                </div>
            }
            icon={Zap}
            className="md:col-span-1"
          />
          <BentoItem
            title="Community Channels"
            description="Connect with thousands of people who share your interests in our global open channels."
            header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center bg-zinc-900">
                    <Users size={64} className="text-purple-500/50" />
                </div>
            }
            icon={Users}
            className="md:col-span-2"
          />
        </BentoGrid>
      </section>

      {/* Parallax Section - 3D Scroll Effect */}
      <ParallaxSection />

      {/* Interactive CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 bg-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <span className="font-bold text-lg text-zinc-300">WhatsUp</span>
                <span>© 2026</span>
            </div>
            <div className="flex gap-6">
                <a href="#" className="hover:text-green-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-green-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-green-400 transition-colors">Contact</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
