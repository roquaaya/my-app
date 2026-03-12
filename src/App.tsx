/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Menu, 
  X, 
  BookOpen, 
  Cpu, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone,
  MapPin,
  GraduationCap,
  Users,
  Award,
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
  Sun,
  Moon,
  Languages,
  CreditCard,
  Lock,
  ClipboardList,
  Send
} from 'lucide-react';
import { translations } from './translations';

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

const StatCard = ({ label, value, icon: Icon, suffix = "+" }: { label: string, value: number, icon: any, suffix?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(value, 2000, isVisible);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group overflow-hidden relative">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-3xl font-black text-white chic-slant leading-none mb-1">{count}{suffix}</p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{label}</p>
        </div>
      </div>
    </div>
  );
};

const CircularProgress = ({ percentage, label, theme }: { percentage: number, label: string, theme: string }) => {
  return (
    <div className="flex flex-col items-center gap-6 group">
      <div className="relative w-40 h-40">
        {/* Glow effect */}
        <div className="absolute inset-4 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <circle
            className={theme === 'dark' ? 'stroke-white/5' : 'stroke-slate-200'}
            strokeWidth="2.5"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
          />
          <circle
            className="animate-progress"
            stroke="url(#progressGradient)"
            strokeWidth="2.5"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-black chic-slant ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{percentage}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className={`text-lg font-black chic-slant-light ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{label}</p>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeStudentTab, setActiveStudentTab] = useState<string | null>(null);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const t = translations[lang];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.departments, href: '#departments' },
    { name: t.nav.features, href: '#features' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const departments = [
    {
      title: t.departments.cs.title,
      description: t.departments.cs.desc,
      icon: <Cpu className="w-12 h-12" />,
      color: 'from-blue-600 to-cyan-500',
      glow: 'group-hover:shadow-blue-500/40',
      subjects: lang === 'ar' ? ['هيكلة بيانات', 'ذكاء اصطناعي', 'قواعد بيانات', 'برمجة ويب'] : ['Data Structures', 'AI', 'Databases', 'Web Dev']
    },
    {
      title: t.departments.is.title,
      description: t.departments.is.desc,
      icon: <Globe className="w-12 h-12" />,
      color: 'from-indigo-600 to-purple-500',
      glow: 'group-hover:shadow-indigo-500/40',
      subjects: lang === 'ar' ? ['تحليل نظم', 'إدارة مشاريع', 'نظم دعم القرار', 'أمن معلومات'] : ['Systems Analysis', 'Project Mgmt', 'Decision Support', 'Info Security']
    },
    {
      title: t.departments.biz.title,
      description: t.departments.biz.desc,
      icon: <BarChart3 className="w-12 h-12" />,
      color: 'from-emerald-600 to-teal-500',
      glow: 'group-hover:shadow-emerald-500/40',
      subjects: lang === 'ar' ? ['محاسبة مالية', 'إدارة أعمال', 'تسويق إلكتروني', 'اقتصاد'] : ['Financial Accounting', 'Business Admin', 'E-Marketing', 'Economics']
    }
  ];

  const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#020617] text-slate-200' : 'bg-slate-50 text-slate-900'
    } font-sans selection:bg-blue-500/30 overflow-x-hidden`} dir={t.dir}>
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 z-[60] origin-right"
        style={{ scaleX }}
      />

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-cyan-600/5 blur-[120px]"></div>
      </div>

      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? theme === 'dark' ? 'bg-[#020617]/70 backdrop-blur-xl py-3 shadow-2xl border-b border-white/5' : 'bg-white/80 backdrop-blur-xl py-3 shadow-lg border-b border-slate-200'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className={`relative w-11 h-11 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-white'} rounded-xl flex items-center justify-center border ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                <GraduationCap className="text-blue-400 w-6 h-6" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} leading-none`}>
                {lang === 'ar' ? 'معهد مصر العالي' : 'Egypt Higher Institute'}
              </span>
              <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">
                {lang === 'ar' ? 'للتجارة والحاسبات' : 'for Commerce & Computers'}
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 border-e border-slate-700/30 pe-6 me-2">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-blue-600'} transition-all relative group`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 ${lang === 'ar' ? 'right-0' : 'left-0'} w-0 h-0.5 bg-gradient-to-l from-blue-600 to-cyan-400 transition-all group-hover:w-full`}></span>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleLang}
                className={`p-2 rounded-xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
                title={lang === 'ar' ? 'English' : 'العربية'}
              >
                <Languages size={18} />
              </button>
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-7 py-2.5 overflow-hidden rounded-full bg-blue-600 text-white font-black text-sm shadow-lg shadow-blue-600/20"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">{t.nav.register}</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-[#020617]/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden md:hidden"
            >
              <div className="p-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-bold text-slate-300 hover:text-blue-400 flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20">
                  سجل الآن
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 -z-20">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Background" 
            className={`w-full h-full object-cover opacity-[0.07] ${theme === 'light' ? 'grayscale' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-[#020617] via-transparent to-[#020617]' : 'bg-gradient-to-b from-slate-50 via-transparent to-slate-50'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black mb-8 animate-bounce-slow">
              <Sparkles className="w-4 h-4" />
              {t.hero.badge}
            </div>
            <h1 className={`text-5xl md:text-8xl font-black mb-8 leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.hero.title1} <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-500 via-cyan-400 to-blue-400 chic-slant text-6xl md:text-9xl">{t.hero.titleAccent}</span> <br />
              {t.hero.title2}
            </h1>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-lg md:text-xl max-w-xl mb-12 leading-relaxed`}>
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-5">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/40 flex items-center gap-3 group"
              >
                {t.hero.cta1}
                <Zap className="w-5 h-5 fill-current group-hover:animate-pulse" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}
                className={`px-10 py-5 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-200 border-slate-300 text-slate-800'} border rounded-2xl font-black text-lg transition-all`}
              >
                {t.hero.cta2}
              </motion.button>
            </div>

            <div className="mt-16 flex items-center gap-8 border-t border-white/5 pt-12">
              <div className="flex -space-x-4 space-x-reverse">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020617] bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="student" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-[#020617] bg-blue-600 flex items-center justify-center text-xs font-bold">
                  +2k
                </div>
              </div>
              <p className="text-sm text-slate-500">
                أكثر من <span className="text-white font-bold">2000 طالب</span> انضموا إلينا هذا العام
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-10 bg-blue-600/20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Campus" 
                className="w-full h-[700px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
              
              {/* Floating Info Cards */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 -left-10 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/50">
                    <ShieldCheck />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">اعتماد الجودة</p>
                    <p className="text-lg font-black text-white">معتمد دولياً</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -right-10 p-6 rounded-3xl bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/50">
                    <Users />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">مجتمع طلابي</p>
                    <p className="text-lg font-black text-white">بيئة تفاعلية</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label={t.stats.graduates} value={15000} icon={GraduationCap} />
          <StatCard label={t.stats.faculty} value={250} icon={Users} />
          <StatCard label={t.stats.labs} value={45} icon={Cpu} />
          <StatCard label={t.stats.experience} value={25} icon={Award} />
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-32 relative overflow-hidden">
        {/* Section Background Image */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1498243639351-a6c97aa2147c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Departments Background" 
            className={`w-full h-full object-cover opacity-[0.05] ${theme === 'light' ? 'grayscale' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#020617]/80' : 'bg-slate-50/80'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className={`text-4xl md:text-6xl font-black mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.departments.title} <span className="text-blue-500">{t.departments.accent}</span></h2>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-lg leading-relaxed`}>{t.departments.description}</p>
            </div>
            <div className="flex gap-4">
              <div className={`w-14 h-14 rounded-full border ${theme === 'dark' ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'} flex items-center justify-center hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer`}>
                <ArrowRight className={lang === 'ar' ? "rotate-180" : ""} />
              </div>
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 cursor-pointer">
                <ArrowRight className={lang === 'en' ? "rotate-180" : ""} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -15 }}
                className="group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-500 shadow-xl"
              >
                <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${dept.color} opacity-0 blur-[80px] group-hover:opacity-40 transition-opacity duration-700`}></div>
                
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-white mb-10 shadow-2xl ${dept.glow} transition-shadow duration-500`}>
                  {dept.icon}
                </div>
                
                <h3 className={`text-3xl font-black mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} group-hover:text-blue-400 transition-colors`}>{dept.title}</h3>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mb-8 text-lg`}>
                  {dept.description}
                </p>

                {/* Subjects on Hover */}
                <div className="mb-8 overflow-hidden">
                  <p className={`text-xs font-black uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{t.student.subjects}</p>
                  <div className="flex flex-wrap gap-2">
                    {dept.subjects.map((subject, i) => (
                      <span key={i} className={`px-3 py-1 rounded-lg text-xs font-bold ${theme === 'dark' ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'} border ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'} group-hover:border-blue-500/30 transition-all`}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{t.departments.duration}</span>
                  <motion.div 
                    whileHover={{ x: lang === 'ar' ? -5 : 5 }}
                    className={`w-12 h-12 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer`}
                  >
                    <ArrowRight className={lang === 'en' ? "rotate-180" : ""} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className={`py-32 ${theme === 'dark' ? 'bg-[#0f172a]/30' : 'bg-slate-200/50'} relative overflow-hidden`}>
        {/* Section Background Image */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Features Background" 
            className={`w-full h-full object-cover opacity-[0.04] ${theme === 'light' ? 'grayscale' : ''}`}
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-10 bg-blue-600/10 blur-[120px] rounded-full"></div>
              <div className="grid grid-cols-2 gap-6 relative">
                <div className="space-y-6">
                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm mt-12">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                      <Cpu size={28} />
                    </div>
                    <h4 className="text-xl font-black mb-3 text-white">معامل ذكية</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">تجهيزات تقنية متكاملة تحاكي بيئات العمل الحقيقية.</p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/30">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-6">
                      <Users size={28} />
                    </div>
                    <h4 className="text-xl font-black mb-3">دعم طلابي</h4>
                    <p className="text-sm text-blue-100 leading-relaxed">إرشاد أكاديمي ومهني مستمر طوال فترة الدراسة.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                      <Award size={28} />
                    </div>
                    <h4 className="text-xl font-black mb-3 text-white">شهادات دولية</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">شراكات مع كبرى الشركات التقنية العالمية.</p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm mt-12">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                      <Globe size={28} />
                    </div>
                    <h4 className="text-xl font-black mb-3 text-white">فرص تدريب</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">برامج تدريبية صيفية في كبرى المؤسسات والشركات.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className={`text-4xl md:text-6xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} leading-tight`}>
                {t.features.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-500 to-cyan-400 chic-slant">{t.features.accent}</span>
              </h2>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-lg mb-12 leading-relaxed`}>
                {t.features.description}
              </p>
              <ul className="space-y-6">
                {t.features.list.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: lang === 'ar' ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} font-bold`}
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Student Portal Section */}
      <section className={`py-32 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0f172a]/20' : 'bg-slate-100/50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black mb-8">
                <Sparkles className="w-4 h-4" />
                {t.student.clickHint}
              </div>
              <h2 className={`text-4xl md:text-7xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} leading-tight`}>
                {t.student.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-500 to-cyan-400 chic-slant">{t.student.accent}</span>
              </h2>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-lg mb-12 leading-relaxed max-w-xl`}>
                {t.student.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'academic', icon: <Award className="text-emerald-500" />, text: t.student.academic },
                  { id: 'personal', icon: <Users className="text-blue-500" />, text: t.student.personal },
                  { id: 'committee', icon: <MapPin className="text-cyan-500" />, text: t.student.committee },
                  { id: 'survey', icon: <ClipboardList className="text-purple-500" />, text: t.student.survey }
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveStudentTab(item.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${activeStudentTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : theme === 'dark' ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${activeStudentTab === item.id ? 'bg-white/20' : theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} flex items-center justify-center`}>
                      {item.icon}
                    </div>
                    <span className="font-bold text-sm">{item.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative perspective-1000">
              <AnimatePresence mode="wait">
                {!activeStudentTab ? (
                  <motion.div 
                    key="portal-home"
                    initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className={`p-12 rounded-[3.5rem] ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-white'} border ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} shadow-2xl text-center relative overflow-hidden min-h-[500px] flex flex-col justify-center`}
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-8 text-blue-500"
                    >
                      <Users size={48} />
                    </motion.div>
                    <h4 className={`text-3xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.student.sampleName}</h4>
                    <p className="text-blue-500 font-bold mb-8">{t.student.sampleGroup}</p>
                    <div className="flex items-center justify-center gap-2 text-slate-500 font-bold">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <p>{t.student.clickHint}</p>
                    </div>
                  </motion.div>
                ) : activeStudentTab === 'survey' ? (
                  <motion.div 
                    key="survey-tab"
                    initial={{ opacity: 0, x: 100, rotateY: 45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -100, rotateY: -45 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 12 }}
                    className={`p-8 md:p-12 rounded-[3.5rem] ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-white'} border ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} shadow-2xl relative overflow-hidden min-h-[500px]`}
                  >
                    <button onClick={() => setActiveStudentTab(null)} className="absolute top-8 right-8 text-slate-500 hover:text-blue-500 transition-colors z-20">
                      <X size={24} />
                    </button>
                    <h4 className={`text-3xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.student.survey}</h4>
                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-8 font-bold`}>{t.student.surveyDesc}</p>
                    
                    {surveySubmitted ? (
                      <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="text-center py-12"
                      >
                        <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 size={48} />
                        </div>
                        <h5 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-4`}>
                          {t.student.surveySuccess}
                        </h5>
                        <button 
                          onClick={() => setSurveySubmitted(false)}
                          className="text-blue-500 font-bold hover:underline"
                        >
                          {t.student.submitAnother}
                        </button>
                      </motion.div>
                    ) : (
                      <div className="space-y-8">
                        {[t.student.surveyQ1, t.student.surveyQ2, t.student.surveyQ3].map((q, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <p className={`text-sm font-bold mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{q}</p>
                            <div className="flex gap-3">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <button key={num} className={`w-11 h-11 rounded-xl border ${theme === 'dark' ? 'border-white/10 hover:bg-blue-600/20' : 'border-slate-200 hover:bg-blue-50'} flex items-center justify-center font-black transition-all hover:border-blue-500 hover:text-blue-500 hover:scale-110 active:scale-90`}>
                                  {num}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSurveySubmitted(true)}
                          className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-3 mt-4"
                        >
                          <Send size={20} />
                          {t.student.submitSurvey}
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="data-tab"
                    initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                    className={`p-8 md:p-12 rounded-[3.5rem] ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-white'} border ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} shadow-2xl relative overflow-hidden min-h-[500px]`}
                  >
                    <button onClick={() => setActiveStudentTab(null)} className="absolute top-8 right-8 text-slate-500 hover:text-blue-500 transition-colors z-20">
                      <X size={24} />
                    </button>
                    
                    <div className="flex items-center gap-6 mb-12">
                      <motion.div 
                        initial={{ rotate: -45 }}
                        animate={{ rotate: 0 }}
                        className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner"
                      >
                        {activeStudentTab === 'academic' ? <Award size={32} /> : activeStudentTab === 'personal' ? <Users size={32} /> : <MapPin size={32} />}
                      </motion.div>
                      <h4 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {activeStudentTab === 'academic' ? t.student.academic : activeStudentTab === 'personal' ? t.student.personal : t.student.committee}
                      </h4>
                    </div>

                    <div className="space-y-6">
                      {activeStudentTab === 'academic' && (
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="p-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 relative overflow-hidden group"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                          <p className="text-emerald-500 font-black text-5xl mb-4 chic-slant">3.8 / 4.0</p>
                          <p className={`font-bold text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{t.student.sampleAcademic}</p>
                          <div className="mt-8 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '95%' }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-emerald-500"
                            />
                          </div>
                        </motion.div>
                      )}
                      {activeStudentTab === 'personal' && (
                        <div className="grid gap-6">
                          {[
                            { label: t.student.nationalId, value: t.student.sampleId, icon: <ShieldCheck size={20} /> },
                            { label: t.student.personal, value: t.student.samplePersonal, icon: <Mail size={20} /> }
                          ].map((field, i) => (
                            <motion.div 
                              key={i}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className={`p-8 rounded-[2rem] ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'} border ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'} group hover:border-blue-500/30 transition-all`}
                            >
                              <div className="flex items-center gap-4 mb-2">
                                <div className="text-blue-500">{field.icon}</div>
                                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{field.label}</p>
                              </div>
                              <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{field.value}</p>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      {activeStudentTab === 'committee' && (
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="p-10 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/10 flex flex-col md:flex-row items-center gap-8"
                        >
                          <div className="w-24 h-24 rounded-3xl bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/40 relative">
                            <MapPin size={48} />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-black text-sm shadow-lg">
                              14
                            </div>
                          </div>
                          <div className="text-center md:text-start">
                            <p className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-2`}>{t.student.sampleCommittee}</p>
                            <p className={`font-bold text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                              {t.student.committeeHint}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Success Rates Section */}
      <section className={`py-32 relative overflow-hidden ${theme === 'dark' ? 'bg-[#020617]' : 'bg-white'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className={`text-4xl md:text-7xl font-black mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.success.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 chic-slant">{t.success.accent}</span>
            </h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            <CircularProgress percentage={95} label={t.success.employment} theme={theme} />
            <CircularProgress percentage={98} label={t.success.satisfaction} theme={theme} />
            <CircularProgress percentage={90} label={t.success.practical} theme={theme} />
            <CircularProgress percentage={85} label={t.success.research} theme={theme} />
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className={`py-32 ${theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-50'} relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className={`text-4xl md:text-6xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} leading-tight`}>
                {t.payment.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-500 to-cyan-400 chic-slant">{t.payment.accent}</span>
              </h2>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-lg mb-8 leading-relaxed`}>
                {t.payment.desc}
              </p>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold">
                <Lock size={20} />
                {t.payment.secure}
              </div>
            </div>

            <div className={`p-8 md:p-12 rounded-[3.5rem] ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-white'} border ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} shadow-2xl relative group overflow-hidden`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-600/10 transition-colors"></div>
              <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="col-span-2">
                    <label className={`block text-xs font-black uppercase tracking-widest mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{t.payment.cardName}</label>
                    <input type="text" className={`w-full px-8 py-5 rounded-3xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-bold`} placeholder="MOHAMED AHMED" />
                  </div>
                  <div className="col-span-2">
                    <label className={`block text-xs font-black uppercase tracking-widest mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{t.payment.cardNumber}</label>
                    <div className="relative">
                      <input type="text" className={`w-full px-8 py-5 rounded-3xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono tracking-[0.2em] font-bold`} placeholder="•••• •••• •••• ••••" />
                      <CreditCard className={`absolute ${lang === 'ar' ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 text-slate-500`} size={24} />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-xs font-black uppercase tracking-widest mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{t.payment.expiry}</label>
                    <input type="text" className={`w-full px-8 py-5 rounded-3xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-bold`} placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className={`block text-xs font-black uppercase tracking-widest mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{t.payment.cvv}</label>
                    <input type="text" className={`w-full px-8 py-5 rounded-3xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-bold`} placeholder="•••" />
                  </div>
                </div>
                <button className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-3xl font-black text-xl shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                  <ShieldCheck className="w-6 h-6" />
                  {t.payment.payNow}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative rounded-[4rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-12 md:p-24 overflow-hidden shadow-3xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 blur-[120px] rounded-full"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-tight">{t.cta.title}</h2>
              <p className="text-blue-100 text-xl md:text-2xl mb-12 leading-relaxed">
                {t.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="w-full sm:w-auto px-12 py-6 bg-white text-blue-700 rounded-3xl font-black text-xl hover:bg-slate-100 transition-all shadow-2xl active:scale-95">
                  {t.cta.register}
                </button>
                <button className="w-full sm:w-auto px-12 py-6 bg-transparent border-2 border-white/30 text-white rounded-3xl font-black text-xl hover:bg-white/10 transition-all">
                  {t.cta.consult}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={`${theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-100'} border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'} pt-32 pb-12 relative overflow-hidden`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <GraduationCap className="text-white w-6 h-6" />
                </div>
                <span className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'ar' ? 'معهد مصر العالي' : 'Egypt Higher Institute'}
                </span>
              </div>
              <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'} leading-relaxed mb-10 text-lg`}>
                {t.footer.desc}
              </p>
              <div className="flex gap-5">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className={`w-12 h-12 rounded-2xl ${theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-500 shadow-sm'} flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1`}>
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`font-black text-xl mb-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.footer.explore}</h4>
              <ul className="space-y-5">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className={`${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'} hover:text-blue-400 transition-colors text-lg font-bold`}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-black text-xl mb-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.footer.depts}</h4>
              <ul className="space-y-5">
                {departments.map(dept => (
                  <li key={dept.title}>
                    <a href="#" className={`${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'} hover:text-blue-400 transition-colors text-lg font-bold`}>{dept.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-black text-xl mb-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.footer.contact}</h4>
              <ul className="space-y-6">
                <li className={`flex items-start gap-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'} group`}>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    <MapPin size={20} />
                  </div>
                  <span className="text-lg">{t.footer.address}</span>
                </li>
                <li className={`flex items-center gap-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'} group`}>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    <Phone size={20} />
                  </div>
                  <span className="text-lg" dir="ltr">+20 123 456 789</span>
                </li>
                <li className={`flex items-center gap-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'} group`}>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg">info@mci.edu.eg</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={`border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'} pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-sm`}>
            <p>© {new Date().getFullYear()} {lang === 'ar' ? 'معهد مصر العالي للتجارة والحاسبات' : 'Egypt Higher Institute for Commerce & Computers'}. {t.footer.rights}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-blue-600 transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-blue-600 transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
