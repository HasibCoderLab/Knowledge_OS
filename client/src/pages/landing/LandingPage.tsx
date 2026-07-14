import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle2, 
  LineChart, 
  Library, 
  PenTool, 
  Target, 
  ArrowRight,
  BrainCircuit,
  LayoutDashboard
} from 'lucide-react';
import Button from '../../components/ui/Button';
import heroImg from '../../assets/hero.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToApp = () => {
    navigate('/auth/login');
  };

  const features = [
    {
      title: 'Library',
      description: 'Organize your knowledge, references, and bookmarks in one powerful repository.',
      icon: <Library className="w-6 h-6 text-indigo-500" />
    },
    {
      title: 'Notes',
      description: 'Capture ideas at the speed of thought with our minimal, distraction-free editor.',
      icon: <PenTool className="w-6 h-6 text-emerald-500" />
    },
    {
      title: 'Goals',
      description: 'Set, track, and achieve your most ambitious targets with clear milestones.',
      icon: <Target className="w-6 h-6 text-rose-500" />
    },
    {
      title: 'Habits',
      description: 'Build lasting routines with daily tracking and insightful streak analytics.',
      icon: <CheckCircle2 className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Reading Tracker',
      description: 'Log your books, track progress, and remember what you read with summaries.',
      icon: <BookOpen className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Analytics',
      description: 'Visualize your progress across all domains with beautiful, actionable charts.',
      icon: <LineChart className="w-6 h-6 text-violet-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-indigo-500/30 overflow-hidden font-sans">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 bg-white/50 dark:bg-slate-950/50">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold tracking-tight">KnowledgeOS</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
          <a href="#preview" className="hover:text-slate-900 dark:hover:text-white transition-colors">Preview</a>
        </div>

        <Button onClick={handleGoToApp} variant="primary" size="sm" className="rounded-full px-5">
          Go to KnowledgeOS <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </nav>

      <main className="relative z-10 flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="w-full px-6 py-32 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 border border-indigo-200 dark:border-indigo-500/20"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
            KnowledgeOS is now in Beta
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Your Mind,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
              Beautifully Organized.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed"
          >
            The all-in-one workspace for your notes, tasks, habits, and knowledge. Designed for clarity, built for speed, and crafted to perfection.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <Button onClick={handleGoToApp} variant="primary" size="lg" className="rounded-full w-full sm:w-auto px-8 group">
              Start Organizing <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto px-8">
              Explore Features
            </Button>
          </motion.div>
        </section>

        {/* Dashboard Preview Section */}
        <section id="preview" className="w-full px-6 pb-32 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative rounded-2xl md:rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl p-2 md:p-4"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-violet-500/5 rounded-2xl md:rounded-3xl pointer-events-none" />
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex flex-col h-[400px] md:h-[600px]">
              
              {/* Browser/Window Header */}
              <div className="h-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="mx-auto h-6 w-48 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center text-[10px] text-slate-400">
                  <LayoutDashboard className="w-3 h-3 mr-1" /> knowledge-os.app
                </div>
              </div>

              {/* Actual Image */}
              <div className="flex-1 relative overflow-hidden bg-slate-50 dark:bg-[#0A0A0A]">
                <img src={heroImg} alt="KnowledgeOS Dashboard Preview" className="w-full h-full object-cover object-left-top" />
              </div>

            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full px-6 py-24 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need. <br className="hidden md:block"/> Nothing you don't.</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Seamlessly integrated modules designed to work together, bringing order to the chaos of modern life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl md:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-12 border-t border-slate-200 dark:border-slate-800 text-center relative z-10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <BrainCircuit className="w-6 h-6" />
            <span className="font-bold">KnowledgeOS</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} KnowledgeOS. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
