'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, ArrowDown, Cpu, Database, Brain, Network, Code, Zap, Globe, Award, Briefcase, GraduationCap, ExternalLink } from 'lucide-react';

export function ScrollableContent() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const id = el.getAttribute('data-reveal');
        if (id && rect.top < window.innerHeight * 0.85) {
          setRevealed(prev => ({ ...prev, [id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chapters = [
    {
      num: '01',
      title: 'ORIGIN',
      year: '2019',
      location: 'Nairobi, Kenya',
      story: 'Graduated from Karatina University. But the real education happened after hours — teaching myself to code, discovering The Odin Project, spending nights understanding not just how things work, but why.',
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      num: '02',
      title: 'FOUNDATION',
      year: '2020-22',
      location: 'Kenya',
      story: 'SAP Young Professional Program opened the door. Kenafric Industries, KPMG EA — turning data into decisions, walking with clients through digitization.',
      icon: Database,
      color: 'text-blue-400'
    },
    {
      num: '03',
      title: 'THE LEAP',
      year: '2022-24',
      location: 'Germany → Prague',
      story: 'Afrika Kommt! changed everything. Then SAP Prague. Seven months back in Kenya for visa. Used every day: books, skills, reinvention.',
      icon: Globe,
      color: 'text-cyan-400'
    },
    {
      num: '04',
      title: 'CRAFT',
      year: '2024+',
      location: 'SAP Germany',
      story: 'Data Product Experience Team. Built Collibra MCP Server with 26 tools — bridging AI and enterprise data governance. Systems that thousands use.',
      icon: Network,
      color: 'text-emerald-400'
    },
    {
      num: '05',
      title: 'FRONTIER',
      year: 'NOW',
      location: 'The Journey',
      story: 'Micrograd — built autograd from scratch. Makemore — character-level language models. Not just using neural networks. Understanding them. Building them.',
      icon: Brain,
      color: 'text-purple-400'
    }
  ];

  const projects = [
    {
      title: 'Collibra MCP Server',
      year: '2024',
      category: 'ENTERPRISE',
      description: '26 specialized tools enabling AI-powered data governance',
      tech: ['Node.js', 'MCP', 'Groovy', 'REST'],
      stats: '26 tools • Production',
      featured: true
    },
    {
      title: 'Micrograd',
      year: '2024',
      category: 'ML RESEARCH',
      description: 'Neural network engine from scratch',
      tech: ['Python', 'NumPy', 'Calculus'],
      stats: 'First Principles',
      featured: true
    },
    {
      title: 'Makemore',
      year: '2024',
      category: 'NLP',
      description: 'Character-level language models',
      tech: ['PyTorch', 'NLP', 'Embeddings'],
      stats: '3 parts',
      featured: true
    },
    {
      title: 'Claude Proxy',
      year: '2024',
      category: 'INTEGRATION',
      description: 'Claude API proxy with SAP integration',
      tech: ['Node.js', 'OAuth2'],
      stats: 'Production'
    }
  ];

  return (
    <div className="bg-[#0a0e14] text-gray-200">

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 py-20">
        <div className="max-w-[1200px] mx-auto w-full">

          {/* Main headline */}
          <div
            data-reveal="hero"
            className={`transition-all duration-1000 ${revealed.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <p className="text-emerald-400 text-sm tracking-widest mb-4 font-mono">
              NAIROBI → PRAGUE → GERMANY
            </p>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight mb-6">
              <span className="text-gray-200">BUILDING</span>
              <br />
              <span className="text-emerald-400">SYSTEMS</span>
              <br />
              <span className="text-gray-600">THAT THINK</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mt-8 font-mono">
              Data architect turning enterprise chaos into intelligent systems.
              ML engineer who builds neural networks from scratch —
              <span className="text-emerald-400"> because understanding matters more than using.</span>
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex items-center gap-3 text-gray-600">
            <span className="text-xs tracking-widest font-mono">SCROLL TO EXPLORE</span>
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* The Hook */}
      <section className="py-32 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div
            data-reveal="hook"
            className={`transition-all duration-1000 ${revealed.hook ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          >
            <p className="text-sm text-emerald-400 tracking-widest mb-6 font-mono">DISPATCH FROM THE FRONTIER</p>
            <p className="text-4xl md:text-5xl leading-tight font-bold">
              What happens when a self-taught developer from <span className="text-emerald-400">Kenya</span>
              <span className="text-gray-500"> ends up building AI-powered data governance systems for one of the world's largest enterprise companies?</span>
            </p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto">

          <div className="mb-16">
            <p className="text-xs text-gray-600 tracking-widest mb-2 font-mono">SECTION 01</p>
            <h2 className="text-4xl font-bold tracking-tight">THE JOURNEY</h2>
          </div>

          <div className="space-y-24">
            {chapters.map((chapter, i) => (
              <div
                key={i}
                data-reveal={`chapter-${i}`}
                className={`grid md:grid-cols-12 gap-8 transition-all duration-1000 ${
                  revealed[`chapter-${i}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="md:col-span-4">
                  <div className="sticky top-24">
                    <div className="flex items-center gap-3 mb-4">
                      <chapter.icon size={24} className={chapter.color} />
                      <span className="text-xs tracking-widest text-gray-600 font-mono">{chapter.num}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{chapter.title}</h3>
                    <p className="text-sm text-emerald-400 font-mono mb-1">{chapter.year}</p>
                    <p className="text-sm text-gray-600 font-mono">{chapter.location}</p>
                  </div>
                </div>

                <div className="md:col-span-7 md:col-start-6">
                  <p className="text-lg text-gray-400 leading-relaxed font-mono">
                    {chapter.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-6 bg-[#0d1117]">
        <div className="max-w-[1000px] mx-auto">
          <div
            data-reveal="philosophy"
            className={`transition-all duration-1000 ${revealed.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          >
            <p className="text-sm text-emerald-400 tracking-widest mb-8 font-mono">CORE PHILOSOPHY</p>

            <blockquote className="text-3xl md:text-4xl leading-tight font-bold mb-8">
              <span className="text-emerald-400">"</span>
              I believe in understanding before using.
              <span className="text-gray-500"> Derive the gradient. Build the autograd. Then you truly know what you're working with.</span>
              <span className="text-emerald-400">"</span>
            </blockquote>

            <p className="text-sm text-gray-600 font-mono">FIRST PRINCIPLES · PRECEPT UPON PRECEPT</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto">

          <div className="mb-16">
            <p className="text-xs text-gray-600 tracking-widest mb-2 font-mono">SECTION 02</p>
            <h2 className="text-4xl font-bold tracking-tight">SELECTED WORK</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                data-reveal={`project-${i}`}
                className={`group border border-gray-800 bg-[#0d1117] p-6 hover:border-emerald-500/50 transition-all duration-500 ${
                  revealed[`project-${i}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs tracking-widest text-emerald-400 font-mono">{project.category}</span>
                  <span className="text-xs text-gray-600 font-mono">{project.year}</span>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 font-mono">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, j) => (
                    <span key={j} className="px-2 py-1 text-xs border border-gray-800 text-gray-600 font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-emerald-400 font-mono">{project.stats}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 px-6 border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto">
          <div
            data-reveal="contact"
            className={`transition-all duration-1000 ${revealed.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <p className="text-sm text-emerald-400 tracking-widest mb-4 font-mono">GET IN TOUCH</p>
            <h2 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
              LET'S BUILD
              <br />
              <span className="text-emerald-400">SOMETHING</span>
            </h2>

            <p className="text-gray-400 text-lg max-w-lg mb-12 font-mono">
              Open to opportunities, collaborations, or conversations about ML, data systems, or the intersection of both.
            </p>

            <div className="flex flex-col gap-4 max-w-md">
              <a
                href="https://github.com/Jaloch-glitch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-gray-800 hover:border-emerald-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Github size={20} className="text-gray-600 group-hover:text-emerald-400" />
                  <span className="font-mono">GitHub</span>
                </div>
                <ExternalLink size={14} className="text-gray-600 group-hover:text-emerald-400" />
              </a>

              <a
                href="https://linkedin.com/in/felix-onyango-jaloch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-gray-800 hover:border-blue-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin size={20} className="text-gray-600 group-hover:text-blue-400" />
                  <span className="font-mono">LinkedIn</span>
                </div>
                <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-400" />
              </a>

              <a
                href="mailto:jalochglitch@gmail.com"
                className="flex items-center justify-between p-4 border border-gray-800 hover:border-amber-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-600 group-hover:text-amber-400" />
                  <span className="font-mono">jalochglitch@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
          <span>© 2025 FELIX_ONYANGO.SYS</span>
          <span>NAIROBI → PRAGUE → GERMANY</span>
          <span>v{new Date().getFullYear() - 2019}.0.0</span>
        </div>
      </footer>
    </div>
  );
}
