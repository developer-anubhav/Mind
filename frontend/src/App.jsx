import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Calendar, 
  Shield, 
  Clock, 
  Heart, 
  Award, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  MessageSquare, 
  Sparkles,
  HelpCircle,
  Info
} from 'lucide-react';
import './App.css';

// Initial Mock Data
const SERVICES = [
  {
    id: 'psych-eval',
    title: 'Psychiatric Evaluations',
    duration: '60 Mins',
    description: 'Comprehensive assessment of emotional, cognitive, and physical symptoms to formulate an accurate diagnosis and personalized recovery blueprint.',
    icon: Brain,
    details: 'During this session, we map out your developmental history, current stressors, family history, and psychological symptoms. We review clinical goals and establish whether pharmacotherapy, psychotherapy, or lifestyle adaptations are best suited for your recovery.'
  },
  {
    id: 'cbt',
    title: 'Cognitive Behavioral Therapy',
    duration: '50 Mins',
    description: 'Evidence-based talk therapy focusing on identifying, reframing, and overcoming negative thought patterns and maladaptive behaviors.',
    icon: Heart,
    details: 'CBT is highly structured and goal-oriented. We focus on active strategies to tackle anxiety, obsessive thoughts, or depressive symptoms. You will learn practical tools to apply between sessions to rewire habitual responses.'
  },
  {
    id: 'adhd-coaching',
    title: 'ADHD Assessment & Coaching',
    duration: '50 Mins',
    description: 'Specialized clinical assessment followed by cognitive coaching to optimize focus, organizational skills, executive function, and emotional regulation.',
    icon: Award,
    details: 'Combining diagnostic screening with behavioral therapy, this coaching addresses time management, task initiation, prioritization, and emotional self-regulation. We build workflows tailored to your unique neurodivergent strengths.'
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness-Based Therapy',
    duration: '50 Mins',
    description: 'Integrating ancient mindfulness practices with modern psychotherapy to ground clinical stress, manage panic, and enhance self-awareness.',
    icon: Sparkles,
    details: 'We integrate somatic awareness, breathing exercises, and meditation into traditional psychotherapy. This is particularly effective for high-functioning anxiety, chronic burnout, and stress-related physical symptoms.'
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "Over the last 2 weeks, how often have you felt unable to control the important things in your life?",
    options: [
      { text: "Never", score: 0 },
      { text: "Occasionally / Mildly", score: 1 },
      { text: "Frequently / Moderately", score: 2 },
      { text: "Almost Always / Severely", score: 3 }
    ]
  },
  {
    question: "How would you rate the quality of your sleep and your ability to wake up feeling rested?",
    options: [
      { text: "Good sleep, feel rested", score: 0 },
      { text: "Slightly disturbed, occasionally tired", score: 1 },
      { text: "Toss and turn often, rarely feel rested", score: 2 },
      { text: "Insomnia or severe disruptions, exhausted", score: 3 }
    ]
  },
  {
    question: "Have you experienced physical symptoms of anxiety (racing heart, shortness of breath, muscle tension)?",
    options: [
      { text: "Rarely or never", score: 0 },
      { text: "A few times, but manageable", score: 1 },
      { text: "Regularly, causing discomfort", score: 2 },
      { text: "Daily or experiencing sudden panic", score: 3 }
    ]
  },
  {
    question: "How is your focus, motivation, and ability to complete routine daily tasks?",
    options: [
      { text: "Focused and productive", score: 0 },
      { text: "Slight procrastination, but complete tasks", score: 1 },
      { text: "Hard to concentrate, feel easily distracted", score: 2 },
      { text: "Completely overwhelmed, unable to initiate tasks", score: 3 }
    ]
  },
  {
    question: "Do you feel emotionally connected to others, or have you been isolating yourself?",
    options: [
      { text: "Well-connected and social", score: 0 },
      { text: "Slightly distant, but maintain contact", score: 1 },
      { text: "Isolating myself from friends and family", score: 2 },
      { text: "Lonely, disconnected, no support system", score: 3 }
    ]
  }
];

const BLOG_ARTICLES = [
  {
    id: 1,
    title: "Understanding High-Functioning Anxiety",
    category: "Anxiety",
    readTime: "6 Min Read",
    summary: "Success on the outside, a storm on the inside. Explore the subtle symptoms of high-functioning anxiety and how clinical mindfulness helps.",
    date: "Aug 12, 2026",
    content: "High-functioning anxiety is not a formal clinical diagnosis, but rather a description of individuals who experience significant internal anxiety while presenting a calm, successful, and highly productive exterior to the world. On the outside, they may look like overachievers, neat organizers, or hyper-focused leaders. Inside, however, they are often propelled by a constant fear of failure, dread of disappointing others, and a hyperactive mind that refuses to shut down.\n\nTreatment often involves Cognitive Behavioral Therapy (CBT) to challenge the belief that anxiety is the source of success, and mindfulness practices to ground the somatic triggers. Establishing rigid boundaries, taking scheduled pauses, and practicing self-compassion are vital steps toward sustainable mental health."
  },
  {
    id: 2,
    title: "Neurodiversity in Adulthood: Re-framing ADHD",
    category: "ADHD",
    readTime: "8 Min Read",
    summary: "ADHD is not just a childhood condition. Discover how adult ADHD presents in workspaces and relationships, and tips for cognitive rewiring.",
    date: "Jul 28, 2026",
    content: "For many years, ADHD was viewed primarily as a behavioral disorder affecting school-aged children. Today, we understand that ADHD persists into adulthood for a majority of individuals, though the symptoms often morph. In adults, hyperactivity may present as chronic mental restlessness rather than physical fidgeting, while executive dysfunction can disrupt career progression, relationship harmony, and self-esteem.\n\nRe-framing ADHD involves moving away from the 'deficit' mindset and understanding the neurobiological differences in dopamine regulation. Cognitive coaching focuses on building external scaffolding (task boards, timers) and designing environments that fuel hyper-focus constructively rather than battling distraction."
  },
  {
    id: 3,
    title: "5 CBT Techniques for Daily Stress Regulation",
    category: "Mindfulness",
    readTime: "5 Min Read",
    summary: "Practical tools from Cognitive Behavioral Therapy that you can start using today to disrupt panic spirals and calm nervous energy.",
    date: "Jun 15, 2026",
    content: "Cognitive Behavioral Therapy (CBT) relies on the premise that our thoughts, feelings, and physical sensations are interconnected. When we encounter a stressor, we can fall into automatic cognitive distortions. Here are 5 practical techniques to ground yourself:\n\n1. Thought Records: Write down the distressing thought, identify the emotional triggers, and evaluate the actual evidence for and against it.\n2. The 5-4-3-2-1 Somatic Grounding: Identify 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste to pull your brain out of panic loops.\n3. Progressive Muscle Relaxation: Tense and release muscle groups sequentially from toes to forehead.\n4. Cognitive Re-framing: Ask yourself: 'What is the absolute worst that could happen, and how would I handle it? What is the most realistic outcome?'\n5. Scheduled Worry Time: Dedicate 15 minutes a day specifically to write down concerns. Outside of this window, gently redirect your mind."
  },
  {
    id: 4,
    title: "The Neurobiology of Quality Sleep & Mental Wellness",
    category: "Sleep",
    readTime: "7 Min Read",
    summary: "Discover how deep sleep cycles flush metabolic waste from the brain and why sleep hygiene is the literal foundation of mental health.",
    date: "May 30, 2026",
    content: "Sleep is not merely a passive state of rest; it is an active neurobiological process critical for cognitive repair. During deep sleep (Slow-Wave Sleep), the brain's glymphatic system opens up, allowing cerebrospinal fluid to wash away accumulated metabolic waste products, including amyloid-beta plaques.\n\nPoor sleep disrupts the amygdala—the brain's emotional threat detector—making us significantly more vulnerable to anxiety, panic, and emotional volatility. Improving sleep hygiene means reinforcing circadian rhythms by limiting blue light exposure 90 minutes before bed, keeping the bedroom temperature cool, avoiding late-day caffeine, and maintaining a consistent wake-up time even on weekends."
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    type: "Anxiety Therapy Client",
    rating: 5,
    quote: "Dr. Yours completely changed my perspective on therapy. Her warm, light glassmorphic office environment and empathetic CBT framework helped me overcome paralyzing anxiety that I had carried for over a decade. I feel in control of my thoughts for the first time."
  },
  {
    name: "David K.",
    type: "ADHD Coaching Patient",
    rating: 5,
    quote: "Finding out I had ADHD in my 30s was overwhelming. Dr. Yours didn't just give me medication; she gave me customized cognitive workflows that optimized my work performance and rebuilt my self-worth. She is incredibly insightful."
  },
  {
    name: "Elena R.",
    type: "Stress & Mindfulness Client",
    rating: 5,
    quote: "Her clinical approach combining somatic mindfulness with traditional psychotherapy helped me recover from severe executive burnout. The virtual sessions felt extremely personalized, grounded, and healing."
  }
];

const FAQS = [
  {
    question: "Do you accept health insurance?",
    answer: "We operate as an out-of-network provider. This ensures we can provide personalized, uncompromised care without clinical constraints dictated by insurance companies. We provide detailed 'superbills' which you can submit to your insurance company for reimbursement (often covering 60-80% of out-of-network outpatient psychiatry)."
  },
  {
    question: "What should I expect during the initial evaluation?",
    answer: "The initial evaluation is a comprehensive 60-minute session where we discuss your clinical history, current challenges, sleep cycles, lifestyle, and goals. It is a collaborative space to establish trust and formulate a detailed therapeutic or medical blueprint."
  },
  {
    question: "Are psychiatric sessions virtual or in-person?",
    answer: "We offer both! We conduct secure, HIPAA-compliant telepsychiatry sessions nationwide, as well as in-person sessions at our peaceful wellness studio in Boston."
  },
  {
    question: "How do I refill a prescription?",
    answer: "Active patients can request prescription refills through our secure patient portal. Please allow 48 business hours for review and electronic transmission to your pharmacy."
  }
];

export default function App() {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Services Expandable State
  const [expandedService, setExpandedService] = useState(null);

  // Self-Assessment Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScores, setQuizScores] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Booking Form State
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    note: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Blog State
  const [blogFilter, setBlogFilter] = useState('All');
  const [readingArticle, setReadingArticle] = useState(null);

  // Testimonials Slider State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Handle Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle auto-progress testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Quiz helper functions
  const handleQuizAnswer = (score) => {
    const updatedScores = [...quizScores, score];
    setQuizScores(updatedScores);
    
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const getQuizResult = () => {
    const totalScore = quizScores.reduce((sum, val) => sum + val, 0);
    if (totalScore <= 4) {
      return {
        level: "Mild Stress / Emotional Equilibrium",
        class: "text-emerald-700 bg-emerald-50 border border-emerald-200",
        desc: "You are experiencing a healthy level of emotional resilience. Your stress indicators are low. To maintain this balance, focus on preventative self-care, daily sleep hygiene, and light mindfulness practices.",
        recommendation: "Preventative wellness consultation is recommended to optimize focus and energy levels."
      };
    } else if (totalScore <= 9) {
      return {
        level: "Moderate Stress / Action Recommended",
        class: "text-amber-700 bg-amber-50 border border-amber-200",
        desc: "Your responses suggest moderate levels of stress or emotional fatigue. You may be dealing with mild executive burnout or anxiety cycles that are beginning to impact your daily routine.",
        recommendation: "A Cognitive Behavioral Therapy (CBT) or Mindfulness-Based Consultation would offer excellent strategies to reframe these cycles."
      };
    } else {
      return {
        level: "Elevated Stress / Clinical Guidance Advised",
        class: "text-rose-700 bg-rose-50 border border-rose-200",
        desc: "Your stress score indicates that you are carrying a heavy mental burden. Symptoms of anxiety, sleep disruption, or focus exhaustion are significantly affecting your life quality.",
        recommendation: "We strongly recommend booking an Initial Psychiatric Evaluation. Professional clinical support can help map out a path to recovery."
      };
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setQuizScores([]);
    setQuizCompleted(false);
  };

  // Booking handlers
  const handleBookingSelectService = (serviceId) => {
    setBookingData({ ...bookingData, service: serviceId });
    setBookingStep(2);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.service || !bookingData.date || !bookingData.time || !bookingData.name || !bookingData.email) {
      alert("Please fill in all required fields.");
      return;
    }
    setBookingSuccess(true);
    setBookingStep(4);
  };

  const handleBookNowFromQuiz = () => {
    const score = quizScores.reduce((sum, val) => sum + val, 0);
    let prefilledService = 'psych-eval'; // default
    if (score <= 4) prefilledService = 'mindfulness';
    else if (score <= 9) prefilledService = 'cbt';
    
    setBookingData({
      ...bookingData,
      service: prefilledService
    });
    setBookingStep(2);
    resetQuiz();
    
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatServiceTitle = (id) => {
    const found = SERVICES.find(s => s.id === id);
    return found ? found.title : 'Selected Consultation';
  };

  const getFilteredArticles = () => {
    if (blogFilter === 'All') return BLOG_ARTICLES;
    return BLOG_ARTICLES.filter(a => a.category === blogFilter);
  };

  return (
    <div className="relative min-h-screen text-slate-700 bg-transparent overflow-hidden">
      {/* Centered Fixed Background Image Decal */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
        <img 
          src="/mindBrain.jpeg" 
          alt="Background Decal" 
          className="w-[90vw] max-w-[800px] h-[90vh] max-h-[800px] object-contain opacity-[0.20] grayscale brightness-[1.15] contrast-[1.5] mix-blend-multiply"
        />
      </div>
      
      {/* CRISIS BANNER - LIGHT SYSTEM */}
      <div className="relative z-50 w-full bg-rose-50/95 border-b border-rose-200/60 backdrop-blur-md px-4 py-2 text-center text-xs sm:text-sm font-semibold text-rose-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span><strong>Crisis Line:</strong> If you are experiencing suicidal thoughts or distress, please call or text <strong>988</strong> immediately or go to the nearest emergency room.</span>
        </div>
      </div>

      {/* FLOATING HEADER */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'glass-navbar py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-teal-500 flex items-center justify-center shadow-sm border border-white/40 transition-transform duration-300 group-hover:scale-105">
              <Brain className="w-5.5 h-5.5 text-white" />
            </div>
            <div className="text-left">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                Dr. Yours, MD
              </span>
              <span className="block text-[10px] sm:text-xs text-teal-700 font-semibold tracking-widest uppercase">Psychiatry & Wellness</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-blue-600 hover:shadow-[0_1px_0_0_rgba(79,70,229,0.5)] transition-all py-1">About</a>
            <a href="#services" className="text-sm font-semibold text-slate-600 hover:text-blue-600 hover:shadow-[0_1px_0_0_rgba(79,70,229,0.5)] transition-all py-1">Specializations</a>
            <a href="#quiz" className="text-sm font-semibold text-slate-600 hover:text-blue-600 hover:shadow-[0_1px_0_0_rgba(79,70,229,0.5)] transition-all py-1">Self-Assessment</a>
            <a href="#blog" className="text-sm font-semibold text-slate-600 hover:text-blue-600 hover:shadow-[0_1px_0_0_rgba(79,70,229,0.5)] transition-all py-1">Resources</a>
            <a href="#booking" className="glass-btn-primary px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Book Consultation
            </a>
          </nav>

          {/* Mobile Menu Btn */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full glass-panel py-6 px-4 shadow-lg border-t-0 flex flex-col gap-4 animate-fade-in md:hidden">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-slate-600 hover:text-slate-900 py-2 border-b border-slate-100 text-left"
            >
              About Dr. Yours
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-slate-600 hover:text-slate-900 py-2 border-b border-slate-100 text-left"
            >
              Specializations
            </a>
            <a 
              href="#quiz" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-slate-600 hover:text-slate-900 py-2 border-b border-slate-100 text-left"
            >
              Self-Assessment Quiz
            </a>
            <a 
              href="#blog" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-slate-600 hover:text-slate-900 py-2 border-b border-slate-100 text-left"
            >
              Resources & Blog
            </a>
            <a 
              href="#booking" 
              onClick={() => setMobileMenuOpen(false)}
              className="glass-btn-primary py-3 rounded-xl text-center font-bold text-lg flex items-center justify-center gap-2 mt-2"
            >
              <Calendar className="w-5 h-5" /> Book Consultation
            </a>
          </div>
        )}
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section id="hero" className="py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-blue-200 text-xs font-bold text-blue-700 mb-6 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Modern Outpatient Telepsychiatry</span>
            </div>
            
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-tight">
              Evidence-based <br />
              <span className="text-blue-600">
                Psychiatric Healing
              </span> <br />
              centered on you.
            </h1>
            
            <p className="mt-6 text-base sm:text-lg text-slate-650 leading-relaxed max-w-xl font-light">
              Meet Dr. Yours. Providing a compassionate blend of advanced psychopharmacology, cognitive behavioral therapy, and mindfulness to help you recover emotional balance and unlock your potential.
            </p>

            {/* Quick Stats Grid */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 border-t border-b border-slate-200/80 py-6 max-w-xl">
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-extrabold text-slate-900">15+</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">Years Practice</span>
              </div>
              <div className="border-l border-slate-200 pl-4 sm:pl-6">
                <span className="block font-display text-2xl sm:text-3xl font-extrabold text-teal-700">98%</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">Outcome Rating</span>
              </div>
              <div className="border-l border-slate-200 pl-4 sm:pl-6">
                <span className="block font-display text-xl sm:text-2xl font-extrabold text-slate-900">Board</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">Certified MD</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="glass-btn-primary px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 shadow-md text-base text-center">
                Book Consultation <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#quiz" className="glass-btn-secondary px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 text-base text-center">
                Take Wellness Quiz
              </a>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center">
            <div className="relative w-full aspect-4/3 sm:aspect-square lg:aspect-4/3 rounded-3xl overflow-hidden glass-panel p-4 flex flex-col justify-end shadow-lg border-white/80">
              
              {/* Image Frame */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent z-10"></div>
              
              <div className="absolute top-6 left-6 z-20 glass-panel border-white/60 bg-white/90 px-4 py-3 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">Availability</span>
                  <span className="text-xs text-slate-800 font-extrabold">New Patients Accepted</span>
                </div>
              </div>

              {/* Graphic element representing soft visual depth */}
              <div className="absolute right-4 top-1/4 w-32 h-32 bg-blue-500/5 rounded-full filter blur-2xl z-0"></div>

              <div className="relative z-20 text-left p-2 sm:p-4">
                <span className="inline-block px-3 py-1 rounded-lg bg-teal-50 border border-teal-200/60 text-[10px] sm:text-xs font-bold text-teal-700 uppercase tracking-widest mb-3">
                  Clinical Excellence
                </span>
                <blockquote className="text-base sm:text-lg italic text-slate-100 font-light leading-relaxed">
                  "Healing is not about fixing what is broken, but discovering the resilience that has always been inside you."
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                  <div>
                    <cite className="not-italic text-sm sm:text-base font-bold text-white block">Dr. Yours</cite>
                    <span className="text-[10px] sm:text-xs text-slate-350 font-medium">Harvard Medical Alumna / Board-Certified Psychiatrist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 border-t border-slate-200 scroll-mt-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Portrait Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                {/* Decorative backing shadow */}
                <div className="absolute -inset-1 rounded-3xl bg-slate-300/30 opacity-40 blur-lg transition duration-300"></div>
                
                {/* Image Container Card */}
                <div className="relative rounded-3xl glass-panel p-3 bg-white/60 border-white/80 shadow-xl">
                  <div className="rounded-2xl overflow-hidden aspect-square bg-[#e2e8f0] relative">
                    {/* Portrait Image Placeholder */}
                    <div className="w-full h-full flex items-center justify-center bg-slate-200/85 text-slate-500 font-display font-extrabold text-2xl tracking-wider uppercase select-none">
                      Dr Yours
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute bottom-4 right-4 glass-panel border border-slate-200/60 bg-white/95 px-3.5 py-2 rounded-xl flex items-center gap-2">
                      <Award className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-slate-800 tracking-wide">Board Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography Column */}
            <div className="lg:col-span-7 text-left flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-teal-200 text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-6 max-w-max">
                <User className="w-3.5 h-3.5" />
                <span>Meet Your Practitioner</span>
              </div>
              
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Compassionate Psychiatry Guided by Science
              </h2>
              
              <p className="mt-6 text-slate-650 leading-relaxed text-sm sm:text-base font-light">
                Dr. Yours is an acclaimed board-certified psychiatrist with over 15 years of clinical experience. Graduating from Harvard Medical School, she completed her psychiatric residency at Massachusetts General Hospital and has dedicated her career to outpatient care.
              </p>
              
              <p className="mt-4 text-slate-650 leading-relaxed text-sm sm:text-base font-light">
                She believes that mental wellness requires looking at the whole person. Instead of simply issuing rapid prescriptions, she integrates clinical neuroscience with psychotherapy, lifestyle optimization, and cognitive strategies to address the root causes of distress.
              </p>

              {/* Qualifications Grid */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-2xl bg-white/60 border-slate-200/40 flex gap-3">
                  <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Residency Training</h3>
                    <p className="text-xs text-slate-500 mt-1">Massachusetts General Hospital (Psychiatry Residency)</p>
                  </div>
                </div>
                
                <div className="glass-panel p-4 rounded-2xl bg-white/60 border-slate-200/40 flex gap-3">
                  <Award className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Medical Education</h3>
                    <p className="text-xs text-slate-500 mt-1">Harvard Medical School, MD Degree (Honors)</p>
                  </div>
                </div>

                <div className="glass-panel p-4 rounded-2xl bg-white/60 border-slate-200/40 flex gap-3">
                  <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Board Certifications</h3>
                    <p className="text-xs text-slate-500 mt-1">American Board of Psychiatry and Neurology (ABPN)</p>
                  </div>
                </div>

                <div className="glass-panel p-4 rounded-2xl bg-white/60 border-slate-200/40 flex gap-3">
                  <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Memberships</h3>
                    <p className="text-xs text-slate-500 mt-1">Distinguished Fellow, American Psychiatric Association</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 border-t border-slate-200 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-blue-150 text-[11px] font-bold text-blue-700 uppercase tracking-widest mb-4">
              <Brain className="w-3.5 h-3.5" />
              <span>Specializations & Care Paths</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Clinical Services Tailored to Your Mind
            </h2>
            <p className="mt-4 text-slate-500 text-sm sm:text-base">
              Each clinical consultation focuses on identifying root barriers and constructing actionable, evidence-based blueprints for sustained healing.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const IconComponent = service.icon;
              const isExpanded = expandedService === service.id;
              
              return (
                <div 
                  key={service.id} 
                  className={`glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl text-left relative flex flex-col justify-between border-white/80 ${isExpanded ? 'border-teal-500/40 ring-1 ring-teal-500/10 shadow-md bg-white/70' : ''}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/50 flex items-center justify-center text-teal-600">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-right text-slate-800">
                        <span className="block text-xs font-semibold text-slate-400">{service.duration}</span>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Expandable detailed content */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-200/60 text-slate-600 text-xs sm:text-sm leading-relaxed animate-fade-in font-light">
                        <div className="flex gap-2.5 items-start mb-2">
                          <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span className="font-semibold text-slate-700">Methodology & Framework:</span>
                        </div>
                        <p>{service.details}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <button 
                      onClick={() => setExpandedService(isExpanded ? null : service.id)}
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded ? 'Read Less' : 'Learn Methodology'} 
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <button 
                      onClick={() => handleBookingSelectService(service.id)}
                      className="glass-btn-secondary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Select Path
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SELF-ASSESSMENT QUIZ */}
        <section id="quiz" className="py-20 border-t border-slate-200 scroll-mt-20 relative">
          <div className="relative z-10 glass-panel bg-white/40 border-white/80 p-8 sm:p-12 rounded-4xl max-w-4xl mx-auto shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-blue-150 text-[11px] font-bold text-blue-700 uppercase tracking-widest mb-4">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Interactive Self-Assessment</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Mental Wellness Check-In
              </h2>
              <p className="mt-3 text-slate-500 text-sm">
                Take a 2-minute clinical checkpoint evaluation to assess your general emotional stress levels.
              </p>
            </div>

            {/* Quiz Flow */}
            {!quizStarted && !quizCompleted && (
              <div className="text-center py-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-650 mx-auto mb-6">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-2">5-Question Stress & Coping Index</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 font-light">
                  Get a personalized clinical observation blueprint and customized path recommendation. 
                </p>
                <button 
                  onClick={() => setQuizStarted(true)}
                  className="glass-btn-primary px-8 py-3.5 rounded-2xl font-bold text-sm cursor-pointer"
                >
                  Begin Assessment
                </button>
                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 max-w-sm mx-auto font-medium">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Disclaimer: This is a screening tool, not a diagnostic clinical evaluation.</span>
                </div>
              </div>
            )}

            {quizStarted && !quizCompleted && (
              <div className="text-left animate-fade-in">
                {/* Progress bar */}
                <div className="w-full bg-slate-200/60 rounded-full h-1.5 mb-8 overflow-hidden">
                  <div 
                    className="bg-linear-to-r from-blue-500 to-teal-400 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-semibold">
                  <span>Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span>Progress: {Math.round(((currentQuestion) / QUIZ_QUESTIONS.length) * 100)}%</span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-850 mb-6 leading-snug">
                  {QUIZ_QUESTIONS[currentQuestion].question}
                </h3>

                <div className="grid gap-3">
                  {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(option.score)}
                      className="glass-panel text-left p-4 sm:p-5 rounded-2xl text-slate-700 hover:text-slate-900 border-white/70 hover:border-blue-400 hover:bg-white/90 transition-all text-sm sm:text-base font-semibold flex items-center justify-between group cursor-pointer"
                    >
                      <span>{option.text}</span>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizCompleted && (
              <div className="text-center py-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <span className="text-xs uppercase tracking-widest font-bold text-slate-500 block mb-1">Your Assessment Tier</span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl mb-4 text-blue-800">
                  {getQuizResult().level.split(' / ')[0]}
                </h3>
                
                <div className="glass-panel bg-white/80 border-slate-200/60 p-6 rounded-2xl max-w-xl mx-auto mb-8 text-left">
                  <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold mb-3 ${getQuizResult().class}`}>
                    {getQuizResult().level}
                  </span>
                  
                  <p className="text-slate-650 text-sm leading-relaxed mb-4 font-light">
                    {getQuizResult().desc}
                  </p>
                  
                  <div className="border-t border-slate-200/60 pt-4 flex gap-3">
                    <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-slate-550 leading-relaxed">
                      <strong className="text-slate-800">Recommended Next Step:</strong> {getQuizResult().recommendation}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleBookNowFromQuiz}
                    className="glass-btn-primary px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" /> Schedule Recommended Session
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="glass-btn-secondary px-8 py-3.5 rounded-2xl font-bold text-sm cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BOOKING SECTION */}
        <section id="booking" className="py-20 border-t border-slate-200 scroll-mt-20">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Context Info Column */}
            <div className="lg:col-span-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-teal-200 text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-6">
                <Calendar className="w-3.5 h-3.5" />
                <span>Online Care Office</span>
              </div>
              
              <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                Begin Your Healing Blueprint
              </h2>
              
              <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed font-light">
                Take the step. Use our glassmorphic scheduling tool to select a therapeutic path, select a calendar slot, and share your wellness profile securely.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-650 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Rapid Scheduling</h4>
                    <p className="text-xs text-slate-500 mt-1">Book online in under 3 minutes with automated calendar syncing.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">HIPAA & Encrypted</h4>
                    <p className="text-xs text-slate-500 mt-1">Your details and medical profile are protected under medical privacy protocols.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-650 shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Flexibility Built-In</h4>
                    <p className="text-xs text-slate-500 mt-1">Cancel or reschedule up to 24 hours prior to booking through the dashboard.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Column */}
            <div className="lg:col-span-8">
              <div className="glass-panel p-8 sm:p-10 rounded-4xl bg-white/50 border-white/80 shadow-md relative">
                
                {/* Form Progress Header */}
                {bookingStep < 4 && (
                  <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-bold text-xs flex items-center justify-center">
                        {bookingStep}
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                          {bookingStep === 1 && "Choose Treatment Path"}
                          {bookingStep === 2 && "Select Date & Time"}
                          {bookingStep === 3 && "Secure Patient Intake"}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-slate-400">Step {bookingStep} of 3</p>
                      </div>
                    </div>
                    {bookingStep > 1 && (
                      <button 
                        onClick={() => setBookingStep(bookingStep - 1)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                    )}
                  </div>
                )}

                {/* Form Step 1: Select Service */}
                {bookingStep === 1 && (
                  <div className="text-left animate-fade-in">
                    <span className="text-xs font-bold text-slate-400 block mb-4 uppercase tracking-wider">Select Clinical Pathway</span>
                    <div className="grid gap-3.5">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleBookingSelectService(service.id)}
                          className={`glass-panel text-left p-4 sm:p-5 rounded-2xl border-white/80 hover:border-blue-300 hover:bg-white/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${bookingData.service === service.id ? 'border-blue-400 bg-blue-50/20' : ''}`}
                        >
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-teal-650 shrink-0 border border-slate-200/50">
                              {React.createElement(service.icon, { className: "w-5.5 h-5.5" })}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm sm:text-base">{service.title}</h4>
                              <p className="text-xs text-slate-500 mt-0.5">{service.duration} Session</p>
                            </div>
                          </div>
                          {/* Price removed */}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form Step 2: Date & Time Picker */}
                {bookingStep === 2 && (
                  <div className="text-left animate-fade-in">
                    <span className="text-xs font-bold text-slate-400 block mb-4 uppercase tracking-wider">Schedule Appointment Date</span>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Date Select Mock */}
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">Select Date</label>
                        <input 
                          type="date" 
                          required
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full glass-input px-4 py-3.5 rounded-2xl text-sm"
                        />
                        <div className="mt-3.5 flex gap-2 items-start text-[11px] text-slate-500 font-medium">
                          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <span>Telepsychiatry schedules accommodate multiple timezones.</span>
                        </div>
                      </div>

                      {/* Time Slot Picker */}
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">Available Time Slots</label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setBookingData({ ...bookingData, time: slot })}
                              className={`glass-panel py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border-white/80 ${bookingData.time === slot ? 'bg-teal-50 border-teal-200 text-teal-800 font-bold' : 'hover:bg-white/60'}`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-slate-200 flex justify-end">
                      <button
                        onClick={() => {
                          if (!bookingData.date || !bookingData.time) {
                            alert("Please select both a date and time slot.");
                            return;
                          }
                          setBookingStep(3);
                        }}
                        className="glass-btn-primary px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                      >
                        Next Step <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Form Step 3: Patient Intake Profile */}
                {bookingStep === 3 && (
                  <form onSubmit={handleBookingSubmit} className="text-left animate-fade-in">
                    <span className="text-xs font-bold text-slate-400 block mb-4 uppercase tracking-wider">Patient Information</span>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Jane Doe"
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          className="w-full glass-input px-4 py-3 rounded-2xl text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="jane@example.com"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          className="w-full glass-input px-4 py-3 rounded-2xl text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Phone Number *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="(555) 000-0000"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          className="w-full glass-input px-4 py-3 rounded-2xl text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Selected Pathway</label>
                        <div className="w-full glass-panel border-slate-200/50 bg-white/70 px-4 py-3 rounded-2xl text-sm text-slate-700 font-semibold">
                          {formatServiceTitle(bookingData.service)}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Consultation Notes (Optional)</label>
                      <textarea 
                        rows="3"
                        placeholder="Briefly state symptoms or expectations..."
                        value={bookingData.note}
                        onChange={(e) => setBookingData({ ...bookingData, note: e.target.value })}
                        className="w-full glass-input px-4 py-3 rounded-2xl text-sm resize-none"
                      />
                    </div>

                    <div className="flex gap-2 items-start bg-blue-50/50 border border-blue-100 p-4 rounded-xl mb-8">
                      <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 animate-pulse" />
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        By clicking "Confirm Appointment", you acknowledge that this is a placeholder booking request. Dr. Yours' clinical assistant will call or email you within 24 business hours to finalize scheduling and verify intake files.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="glass-btn-primary px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                      >
                        Confirm Appointment <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Form Step 4: Submission Success receipt */}
                {bookingStep === 4 && bookingSuccess && (
                  <div className="text-center py-6 animate-fade-in text-slate-700">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="font-display font-extrabold text-2xl text-slate-900 mb-2">Request Submitted</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 font-light">
                      Thank you, {bookingData.name}. We have reserved your preliminary appointment request. Details have been emailed to {bookingData.email}.
                    </p>

                    {/* Receipt Card */}
                    <div className="glass-panel p-6 rounded-2xl max-w-md mx-auto border-slate-200/50 text-left mb-8 bg-white/85">
                      <h4 className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">Appointment Details</h4>
                      
                      <div className="grid grid-cols-2 gap-y-3.5 text-xs sm:text-sm">
                        <span className="text-slate-400">Practitioner:</span>
                        <span className="font-semibold text-slate-800 text-right">Dr. Yours</span>

                        <span className="text-slate-400">Clinical Pathway:</span>
                        <span className="font-semibold text-slate-800 text-right">{formatServiceTitle(bookingData.service)}</span>

                        <span className="text-slate-400">Date & Time:</span>
                        <span className="font-semibold text-slate-800 text-right">{bookingData.date} at {bookingData.time}</span>

                        <span className="text-slate-400">Intake Status:</span>
                        <span className="font-bold text-amber-700 text-right uppercase tracking-wider text-[11px]">Pending Review</span>

                        <span className="text-slate-400">Receipt ID:</span>
                        <span className="font-mono text-slate-400 text-right">DY-{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setBookingStep(1);
                        setBookingSuccess(false);
                        setBookingData({
                          service: '',
                          date: '',
                          time: '',
                          name: '',
                          email: '',
                          phone: '',
                          note: ''
                        });
                      }}
                      className="glass-btn-secondary px-8 py-3.5 rounded-2xl font-bold text-sm cursor-pointer"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-20 border-t border-slate-200 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-blue-150 text-[11px] font-bold text-blue-700 uppercase tracking-widest mb-6">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Healing Journeys</span>
            </div>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-12">
              Feedback from Restored Minds
            </h2>

            {/* Testimonials Slider */}
            <div className="glass-panel p-8 sm:p-12 rounded-4xl bg-white/45 border-white/70 relative overflow-hidden min-h-75 flex flex-col justify-between shadow-sm">
              
              {/* Slides */}
              <div className="animate-fade-in" key={currentTestimonial}>
                {/* Stars */}
                <div className="flex justify-center gap-1.5 mb-6 text-amber-400">
                  {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-2xl text-slate-700 leading-relaxed font-light italic">
                  "{TESTIMONIALS[currentTestimonial].quote}"
                </blockquote>

                <div className="mt-8 flex flex-col items-center">
                  <span className="block font-bold text-slate-900 text-base sm:text-lg">{TESTIMONIALS[currentTestimonial].name}</span>
                  <span className="text-xs text-teal-700 font-bold tracking-wide mt-1 uppercase">{TESTIMONIALS[currentTestimonial].type}</span>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center gap-3 mt-10">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${currentTestimonial === idx ? 'bg-teal-600 w-6' : 'bg-slate-300 hover:bg-slate-400'}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  ></button>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* BLOG RESOURCES SECTION */}
        <section id="blog" className="py-20 border-t border-slate-200 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-teal-200 text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Patient Education Resources</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Mental Wellness Articles & Insights
              </h2>
            </div>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2.5">
              {['All', 'Anxiety', 'ADHD', 'Mindfulness', 'Sleep'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBlogFilter(cat)}
                  className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${blogFilter === cat ? 'bg-teal-50 border-teal-250 text-teal-800 font-extrabold' : 'glass-btn-secondary border-transparent'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Articles */}
          <div className="grid md:grid-cols-2 gap-8">
            {getFilteredArticles().map((article) => (
              <div 
                key={article.id} 
                className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl text-left flex flex-col justify-between border-white/80"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-semibold">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-blue-700">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 mb-3 hover:text-blue-650 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400">{article.date}</span>
                  
                  <button 
                    onClick={() => setReadingArticle(article)}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faqs" className="py-20 border-t border-slate-200 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-blue-150 text-[11px] font-bold text-blue-700 uppercase tracking-widest mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Patient FAQ Checkpoint</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Frequently Answered Inquiries
            </h2>
          </div>

          <div className="max-w-3xl mx-auto text-left space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              
              return (
                <div 
                  key={idx} 
                  className="glass-panel rounded-2xl border-white/60 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-sm sm:text-base cursor-pointer hover:bg-slate-100/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight className={`w-5 h-5 text-teal-650 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-slate-650 text-xs sm:text-sm leading-relaxed border-t border-slate-150 pt-4 animate-fade-in bg-white/10 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CLINICAL LOCATION & CONTACT INFO */}
        <section id="contact" className="py-20 border-t border-slate-200">
          <div className="grid lg:grid-cols-12 gap-12 text-left">
            
            {/* Contact details */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-teal-200 text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-6">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Clinical Inquiries</span>
                </div>
                
                <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                  Reach Our Wellness Office
                </h2>
                
                <p className="mt-4 text-slate-500 text-sm leading-relaxed font-light">
                  Have inquiries about treatment blueprints, telepsychiatry options, or out-of-network paperwork? Contact our clinical administrator directly.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-450 uppercase tracking-widest font-bold">Office Line</span>
                    <span className="text-sm sm:text-base font-bold text-slate-800">(617) 555-0149</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-650 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-450 uppercase tracking-widest font-bold">Clinical Email</span>
                    <span className="text-sm sm:text-base font-bold text-slate-800">admin@dryours.com</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-650 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-450 uppercase tracking-widest font-bold">Boston Studio</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                      120 Commonwealth Ave, Suite 300, Boston, MA 02116
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-450 leading-normal max-w-sm font-medium">
                * Note: Telepsychiatry consultations are securely available for patients located in Massachusetts, New York, and California due to state licensing compliance.
              </div>
            </div>

            {/* Glassmorphic Map & Hours */}
            <div className="lg:col-span-7 grid sm:grid-cols-12 gap-6 w-full">
              
              {/* Map Placeholder */}
              <div className="sm:col-span-7 glass-panel p-3 rounded-3xl bg-white/40 border-white/80 shadow-md relative overflow-hidden min-h-62.5 flex items-center justify-center">
                {/* Background Grid Styling Mock */}
                <div className="absolute inset-0 bg-slate-100 flex flex-col justify-between p-6 overflow-hidden">
                  {/* Decorative mesh map lines */}
                  <div className="absolute inset-0 opacity-25" style={{ 
                    backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                  }}></div>
                  <div className="absolute top-[30%] left-0 w-full h-px bg-blue-200/55 rotate-15"></div>
                  <div className="absolute top-[60%] left-0 w-full h-px bg-blue-200/55 rotate-[-10deg]"></div>
                  <div className="absolute left-[40%] top-0 h-full w-px bg-blue-200/55 rotate-25"></div>

                  {/* Marker Pin */}
                  <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute w-8 h-8 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                      <div className="w-6 h-6 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center shadow-md relative z-10">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    <span className="mt-2.5 block text-[10px] font-bold text-slate-800 bg-white/95 px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm whitespace-nowrap">
                      Dr. Yours Office
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto bg-white/90 backdrop-blur-md border border-slate-200/60 p-3 rounded-xl flex items-center justify-between w-full shadow-sm">
                    <div className="text-left">
                      <span className="block text-[9px] uppercase tracking-wider font-bold text-slate-450">Interactive Directory</span>
                      <span className="text-xs font-bold text-slate-850">Commonwealth Ave Boston</span>
                    </div>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-0.5 cursor-pointer"
                    >
                      Open Maps <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours Grid */}
              <div className="sm:col-span-5 glass-panel p-6 rounded-3xl border-white/80 shadow-md flex flex-col justify-between text-left bg-white/40">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-800 mb-4 pb-2 border-b border-slate-100">Office Hours</h3>
                  <div className="space-y-3.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Mon - Thu</span>
                      <span className="font-semibold text-slate-900">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday</span>
                      <span className="font-semibold text-slate-900">9:00 AM - 3:00 PM</span>
                    </div>
                    <div className="flex justify-between text-teal-700 font-bold">
                      <span>Sat - Sun</span>
                      <span>By Appointment</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-150">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Telehealth Compliance</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-light">
                    Virtual video sessions utilize encrypted endpoints meeting HIPAA security standard regulations.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 bg-slate-100/90 border-t border-slate-200 py-12 text-slate-600 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 mb-10 text-left">
            
            <div className="md:col-span-5 space-y-4">
              <a href="#" className="flex items-center gap-2 max-w-max">
                <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-blue-600 to-teal-500 flex items-center justify-center shadow-sm">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-extrabold text-base tracking-tight text-slate-900">
                  Dr. Yours
                </span>
              </a>
              <p className="text-slate-500 text-xs max-w-sm leading-relaxed font-light">
                Empathetic psychiatry combining evidence-based psychotherapy, mindfulness practices, and patient-first clinical guidance.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Clinical Pages</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="hover:text-blue-600 transition-colors">About Dr. Yours</a></li>
                <li><a href="#services" className="hover:text-blue-600 transition-colors">Services</a></li>
                <li><a href="#quiz" className="hover:text-blue-600 transition-colors">Wellness Self-Assessment</a></li>
                <li><a href="#blog" className="hover:text-blue-600 transition-colors">Patient Resources</a></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">General Clinical Disclaimer</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                The information provided on this website, including wellness questionnaires, articles, and recommendations, is for educational and scheduling purposes only. It does not constitute formal medical diagnosis, treatment recommendations, or professional clinical advice. Transmission of information is not intended to establish, and receipt does not constitute, a physician-patient relationship.
              </p>
            </div>

          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-slate-400 font-medium">
            <span>&copy; {new Date().getFullYear()} Dr. Yours, PC. All Rights Reserved.</span>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-slate-600 transition-colors">Terms of Service</a>
              <a href="#hipaa" className="hover:text-slate-600 transition-colors">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BLOG READ ARTICLE DETAIL MODAL */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <div 
            onClick={() => setReadingArticle(null)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md cursor-pointer animate-fade-in"
          ></div>
          
          {/* Modal Container */}
          <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-4xl bg-white/95 border-white/90 shadow-2xl max-h-[85vh] overflow-y-auto z-10 animate-fade-in text-left text-slate-800">
            <button 
              onClick={() => setReadingArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-850 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close article modal"
            >
              <X className="w-5.5 h-5.5" />
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 font-bold mt-2">
              <span className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-105 text-teal-700">
                {readingArticle.category}
              </span>
              <span>{readingArticle.readTime}</span>
              <span>•</span>
              <span>{readingArticle.date}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mb-6 leading-tight">
              {readingArticle.title}
            </h3>

            {/* Paragraphs container */}
            <div className="text-slate-705 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-205 pt-6 font-light">
              {readingArticle.content}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setReadingArticle(null)}
                className="glass-btn-secondary px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Article
              </button>
              
              <button
                onClick={() => {
                  setReadingArticle(null);
                  const bookingSection = document.getElementById('booking');
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="glass-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Book Session
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
