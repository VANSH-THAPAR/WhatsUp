import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { MessageCircle, Shield, Globe, Zap, ArrowRight, Smartphone, Lock, Users } from 'lucide-react';

const Item3D = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
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
      className={className}
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
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
             <Item3D className="w-full max-w-md aspect-square relative">
                {/* 3D Floating Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-[40px] border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center">
                    <MessageCircle size={100} className="text-green-400 drop-shadow-[0_0_30px_rgba(74,222,128,0.5)]" />
                </div>
                
                {/* Floating Badge 1 */}
                <motion.div 
                    animate={{ y: [0, -20, 0] }} 
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 p-4 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl flex items-center gap-3"
                    style={{ transform: "translateZ(100px)" }}
                >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Lock size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 font-bold">Encrypted</p>
                        <p className="text-sm font-bold">End-to-End</p>
                    </div>
                </motion.div>

                {/* Floating Badge 2 */}
                <motion.div 
                    animate={{ y: [0, 20, 0] }} 
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-10 -left-10 p-4 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl flex items-center gap-3"
                    style={{ transform: "translateZ(120px)" }}
                >
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <Zap size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 font-bold">Speed</p>
                        <p className="text-sm font-bold">Lightning Fast</p>
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

      {/* Interactive CTA Section */}
      <section className="py-20 pb-32">
        <div className="container mx-auto px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative w-full rounded-[3rem] overflow-hidden bg-gradient-to-r from-green-900 to-emerald-900 border border-green-500/30 p-12 md:p-24 text-center"
            >
                {/* Animated background particles */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 Mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm z-0"></div>
                
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Ready to Dive In?</h2>
                    <p className="text-emerald-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                        Join thousands of users who have already switched to the most immersive chat platform on the web.
                    </p>
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="px-10 py-5 bg-white text-emerald-900 font-bold text-xl rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_50px_rgba(255,255,255,0.3)]"
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