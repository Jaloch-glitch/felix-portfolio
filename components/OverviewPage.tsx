'use client';

import { Github, Linkedin, Mail, MapPin, Briefcase, Code2, GraduationCap, Award, ExternalLink } from 'lucide-react';

export function OverviewPage() {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100">Felix Onyango</h1>
            <p className="text-lg md:text-xl text-emerald-400">
              Software Developer | Data Architect | ML Engineer
            </p>
            <p className="text-base text-gray-400 flex items-center gap-2">
              <MapPin size={16} />
              Nairobi, Kenya → Prague → Germany 🇩🇪
            </p>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            Transforming complex enterprise systems into intelligent, user-friendly solutions.
            Building ML models from first principles and architecting data governance at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/Jaloch-glitch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
            >
              <Github size={16} />
              <span>GitHub</span>
              <ExternalLink size={12} />
            </a>
            <a
              href="https://linkedin.com/in/felix-onyango-jaloch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-sm"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
              <ExternalLink size={12} />
            </a>
            <a
              href="mailto:jalochglitch@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors text-sm"
            >
              <Mail size={16} />
              <span>Email Me</span>
            </a>
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <Briefcase size={24} />
            Experience
          </h2>

          <div className="space-y-8 border-l-2 border-gray-800 pl-6">
            {[
              {
                company: 'SAP',
                role: 'Data Product Experience',
                location: 'Germany',
                period: '2024 - Present',
                highlights: [
                  'Built Collibra MCP Server with 26 specialized tools',
                  'AI-powered data governance solutions',
                  'Enterprise LLM integration',
                ]
              },
              {
                company: 'SAP',
                role: 'Data Governance Developer',
                location: 'Prague',
                period: '2023 - 2024',
                highlights: [
                  'Collibra workflow automation',
                  'Groovy scripting for data governance',
                  'SAP system integration',
                ]
              },
              {
                company: 'KPMG East Africa',
                role: 'Digital Transformation Consultant',
                location: 'Nairobi, Kenya',
                period: '2022 - 2023',
                highlights: [
                  'Client digital transformation',
                  'Solution mapping and automation',
                  'Technology strategy',
                ]
              },
            ].map((job, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0a0e14]" />
                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">{job.role}</h3>
                    <p className="text-sm text-emerald-400">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{job.period}</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {job.location}
                    </span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-400">
                    {job.highlights.map((highlight, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <Code2 size={24} />
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                name: 'Collibra MCP Server',
                description: '26 specialized tools for AI-powered data governance',
                tech: ['Node.js', 'TypeScript', 'Groovy'],
                status: 'Production ✓'
              },
              {
                name: 'Micrograd',
                description: 'Neural network engine from first principles',
                tech: ['Python', 'NumPy', 'PyTorch'],
                status: 'Complete'
              },
              {
                name: 'Makemore',
                description: 'Character-level language models (Bigram → MLP)',
                tech: ['Python', 'PyTorch', 'NLP'],
                status: 'Complete'
              },
              {
                name: 'Claude Proxy',
                description: 'Enterprise API proxy with SAP integration',
                tech: ['Node.js', 'Express', 'OAuth2'],
                status: 'Production'
              },
            ].map((project, i) => (
              <div key={i} className="p-4 bg-gray-800/30 border border-gray-800 rounded-lg hover:border-emerald-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">{project.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-emerald-400">{project.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <Award size={24} />
            Skills & Technologies
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                category: 'Languages',
                items: ['Python', 'JavaScript/TypeScript', 'Groovy', 'SQL']
              },
              {
                category: 'Frameworks',
                items: ['PyTorch', 'React/Next.js', 'Node.js', 'SAP CAP']
              },
              {
                category: 'Tools & Platforms',
                items: ['Collibra', 'Databricks', 'Cloud Foundry', 'Docker']
              },
            ].map((group, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li key={j} className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <GraduationCap size={24} />
            Education
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-gray-800/30 border border-gray-800 rounded-lg">
              <h3 className="text-base font-semibold text-gray-200">Afrika Kommt! Fellowship</h3>
              <p className="text-sm text-gray-400">2022-2023 | Germany</p>
              <p className="text-xs text-gray-500 mt-1">Enterprise technology & leadership development</p>
            </div>

            <div className="p-4 bg-gray-800/30 border border-gray-800 rounded-lg">
              <h3 className="text-base font-semibold text-gray-200">SAP Young Professional Program</h3>
              <p className="text-sm text-gray-400">2020 | Kenya</p>
              <p className="text-xs text-gray-500 mt-1">Gateway to enterprise systems</p>
            </div>

            <div className="p-4 bg-gray-800/30 border border-gray-800 rounded-lg">
              <h3 className="text-base font-semibold text-gray-200">Karatina University</h3>
              <p className="text-sm text-gray-400">2019 | Kenya</p>
              <p className="text-xs text-gray-500 mt-1">Bachelor of Commerce (Human Resource Management)</p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
              <Award size={24} />
              Certifications
            </h2>
            <a
              href="https://www.credly.com/users/felix-onyango.eb44cd2b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View on Credly
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'SAP Certified: Generative AI Developer',
                issuer: 'SAP',
                year: '2024',
              },
              {
                name: 'Microsoft Certified: Azure Data Fundamentals',
                issuer: 'Microsoft',
                year: '2023',
              },
              {
                name: 'Microsoft Certified: Power Platform Fundamentals',
                issuer: 'Microsoft',
                year: '2023',
              },
              {
                name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals',
                issuer: 'Microsoft',
                year: '2023',
              },
              {
                name: 'Enterprise Design Thinking Co-Creator',
                issuer: 'IBM',
                year: '2023',
              },
              {
                name: 'Enterprise Design Thinking Practitioner',
                issuer: 'IBM',
                year: '2023',
              },
              {
                name: 'McKinsey Forward Program',
                issuer: 'McKinsey & Company',
                year: '2023',
              },
              {
                name: 'APISEC|CON Automotive - Certificate of Attendance',
                issuer: 'APISecure',
                year: '2024',
              },
            ].map((cert, i) => (
              <div key={i} className="p-4 bg-gray-800/30 border border-gray-800 rounded-lg hover:border-emerald-500/30 transition-colors">
                <div className="flex items-start gap-2 mb-2">
                  <Award size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-gray-200 leading-tight">{cert.name}</h3>
                </div>
                <p className="text-xs text-gray-400">{cert.issuer}</p>
                <p className="text-xs text-gray-500 mt-1">{cert.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-12 border-t border-gray-800">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Let's Build Something Together</h2>
          <p className="text-gray-400 mb-6">Open to remote consulting, collaborations, and interesting projects</p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:jalochglitch@gmail.com"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors font-medium"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
