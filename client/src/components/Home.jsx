import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { MessageCircle, Shield, Globe, Zap, ArrowRight, Smartphone, Lock, Users } from 'lucide-react';

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

const FeatureCard = ({ icon: Icon, title, desc, delay, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-md relative overflow-hidden group"
    >
      <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${color}-500/10 rounded-full blur-2xl group-hover:bg-${color}-500/20 transition-all duration-500`}></div>
      <div className={`w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4 text-${color}-400 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
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
      
      {/* Navbar Placeholder for visual consistency */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-zinc-950/50">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600" style={{fontFamily: "Rubik Puddles"}}>WhatsUp</div>
        <button onClick={() => navigate('/login')} className="px-6 py-2 rounded-full border border-zinc-700 hover:border-green-500 text-zinc-300 hover:text-green-400 transition-all text-sm font-medium">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 perspective-1000">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 z-10">
          
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest mb-6 shadow-[0_0_20px_rgba(34,197,94,0.15)] uppercase">
                The Future is Here
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 mt-2">
                Chat Beyond <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500">Dimensions</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
                Experience messaging like never before with our immersive 3D interface. Real-time, secure, and beautifully designed for the modern web.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => navigate('/signup')} 
                  className="group relative px-8 py-4 bg-green-500 text-black font-bold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all transform hover:-translate-y-1"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative flex items-center gap-2">
                        Get Started <ArrowRight size={20} />
                    </span>
                </button>
                <button 
                    onClick={() => navigate('/community')}
                   className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Community</span>
                  <Globe size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 flex justify-center perspective-1000">
             <Item3D className="w-full max-w-md aspect-square relative cursor-pointer group">
                {/* Main 3D Container - Glass Cards Stack */}
                <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
                  
                  {/* Back Card */}
                  <motion.div 
                    initial={{ scale: 0.8, rotate: -10, z: -50 }}
                    animate={{ scale: 0.8, rotate: -10, z: -50 }}
                    className="absolute w-64 h-80 bg-zinc-800/40 rounded-3xl border border-white/5 backdrop-blur-sm -translate-x-12"
                    style={{ transform: "translateZ(-40px)" }}
                  />

                  {/* Middle Card */}
                  <motion.div 
                    initial={{ scale: 0.9, rotate: -5, z: -25 }}
                    animate={{ scale: 0.9, rotate: -5, z: -25 }}
                    className="absolute w-64 h-80 bg-zinc-800/60 rounded-3xl border border-white/10 backdrop-blur-md -translate-x-6"
                    style={{ transform: "translateZ(-20px)" }}
                  />

                  {/* Front Main Card */}
                  <div className="relative w-72 h-96 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-between overflow-hidden transform-style-3d group-hover:border-green-500/30 transition-colors duration-500">
                      
                      {/* Abstract Header */}
                      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(34,197,94,0.5)]">W</div>
                        <div className="space-y-2">
                           <div className="w-24 h-2 bg-zinc-700/50 rounded-full"></div>
                           <div className="w-16 h-2 bg-zinc-700/30 rounded-full"></div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 py-6 space-y-4">
                         <motion.div 
                           initial={{ x: -20, opacity: 0 }}
                           animate={{ x: 0, opacity: 1 }}
                           transition={{ delay: 0.5 }}
                           className="self-start bg-zinc-800/80 p-3 rounded-2xl rounded-tl-none w-3/4 border border-white/5"
                         >
                            <div className="h-2 w-full bg-zinc-700/50 rounded-full mb-2"></div>
                            <div className="h-2 w-2/3 bg-zinc-700/30 rounded-full"></div>
                         </motion.div>

                         <motion.div 
                           initial={{ x: 20, opacity: 0 }}
                           animate={{ x: 0, opacity: 1 }}
                           transition={{ delay: 0.8 }}
                           className="self-end ml-auto bg-green-600/20 p-3 rounded-2xl rounded-tr-none w-3/4 border border-green-500/20"
                         >
                            <div className="h-2 w-full bg-green-400/20 rounded-full mb-2"></div>
                            <div className="h-2 w-1/2 bg-green-400/10 rounded-full"></div>
                         </motion.div>
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

      {/* Features Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Redefining Communication</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    Built with the latest technology to ensure your messages are secure, fast, and accessible from anywhere in the world.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={Smartphone}
                    title="Mobile First"
                    desc="Fully responsive design that adapts to any device, making sure you stay connected directly from your pocket."
                    delay={0.1}
                    color="green"
                />
                <FeatureCard 
                    icon={Shield}
                    title="Secure & Private"
                    desc="Your conversations are yours alone. With enterprise-grade encryption, we ensure your data never leaks."
                    delay={0.2}
                    color="blue"
                />
                <FeatureCard 
                    icon={Users}
                    title="Community Driven"
                    desc="Join global channels, meet new people, and share your thoughts with a vibrant community of users."
                    delay={0.3}
                    color="purple"
                />
            </div>
        </div>
      </section>

      {/* Parallax Section - 3D Scroll Effect */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              style={{ x: useTransform(useScroll().scrollYProgress, [0.3, 0.8], [-100, 0]) }}
              className="flex-1"
            >
               <h2 className="text-4xl md:text-6xl font-bold mb-6">Built for <span className="text-green-400">Speed</span></h2>
               <p className="text-xl text-zinc-400 leading-relaxed">
                 Our architecture is optimized for millisecond latency. Whether you are on 5G or Wi-Fi, your messages are delivered instantly.
               </p>
            </motion.div>
            
            <div className="flex-1 perspective-1000">
               <motion.div
                  style={{ 
                    rotateY: useTransform(useScroll().scrollYProgress, [0.3, 0.8], [45, 0]),
                    rotateX: useTransform(useScroll().scrollYProgress, [0.3, 0.8], [20, 0]),
                    opacity: useTransform(useScroll().scrollYProgress, [0.3, 0.5], [0, 1])
                  }}
                  className="bg-zinc-900/50 border border-zinc-700 p-8 rounded-3xl backdrop-blur-xl shadow-2xl skew-y-3"
               >
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                        <Zap size={24} />
                      </div>
                      <div>
                        <div className="h-2 w-32 bg-zinc-700 rounded-full mb-2"></div>
                        <div className="h-2 w-20 bg-zinc-800 rounded-full"></div>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="h-2 w-full bg-zinc-800 rounded-full bg-linear-to-r from-transparent via-zinc-700 to-transparent opacity-50"></div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full"></div>
                      <div className="h-2 w-3/4 bg-zinc-800 rounded-full"></div>
                   </div>
               </motion.div>
            </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
            <motion.div 
                initial={{ opacity: 0, rotateX: 45, y: 100 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="relative w-full rounded-[3rem] overflow-hidden bg-gradient-to-r from-green-900 to-emerald-900 border border-green-500/30 p-12 md:p-24 text-center perspective-1000 transform-style-3d group"
            >
                {/* Animated background particles */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 Mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm z-0"></div>
                
                {/* Deep 3D Elements */}
                <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="absolute top-10 left-10 w-24 h-24 bg-white/5 rounded-2xl blur-xl"
                />
                 <motion.div 
                    animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/10 rounded-full blur-2xl"
                />

                <div className="relative z-10" style={{ transform: "translateZ(60px)" }}>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-xl">Ready to Dive In?</h2>
                    <p className="text-emerald-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto drop-shadow-md">
                        Join thousands of users who have already switched to the most immersive chat platform on the web.
                    </p>
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="px-10 py-5 bg-white text-emerald-900 font-bold text-xl rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                    >
                        Create Free Account
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

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