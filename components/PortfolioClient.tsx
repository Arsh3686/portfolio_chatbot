"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/about'
import { Terminal, Code2, Database, Layout, Server, Cpu, ExternalLink } from 'lucide-react';
import Chatbot from './Chatbot';

interface PortfolioData {
  experience: any[];
  projects: any[];
  skills: any;
  education: any[];
}

export default function PortfolioClient() {
  const data = portfolioData;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function simulateLoad() {
      return setTimeout(() => {
        setLoading(false);
      }, 1000)
    }
    simulateLoad()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load portfolio data. Make sure backend is running.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">

      {/* Hero Section */}
      <motion.section
        id="/"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between gap-12 scroll-mt-24"
      >
        <div className="flex flex-col items-start text-left space-y-6 md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Hi, I'm <span className="text-gradient">Aditya</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            As a <strong className="text-slate-200">Software Engineer</strong>, my role extends beyond just writing code. I specialize in delivering scalable backend systems for large-scale government e-Governance platforms, optimizing database performance, and ensuring high availability for systems handling over 1 lakh+ API hits per day.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="#experience" className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-colors">
              View Experience
            </a>
            <a href={data.resume.url} className="px-6 py-3 rounded-full glass text-slate-300 font-semibold transition-colors duration-300 hover:text-purple-500 hover:bg-white/10 cursor-pointer">
              Download Resume
            </a>
            {/* <a href={`${data.resume.url}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full glass text-slate-300 font-semibold hover:bg-white/10 transition-colors">
              Resume
            </a> */}
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          {/* Decorative image placeholder similar to the reference */}
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-green-400/80 to-blue-500/80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-[0_0_50px_rgba(74,222,128,0.3)] animate-[morph_8s_ease-in-out_infinite] flex items-center justify-center overflow-hidden border-4 border-white/10">
            <img src="https://media.licdn.com/dms/image/v2/D5603AQGjOLBmWpjjNg/profile-displayphoto-crop_800_800/B56Zv1hQiqHMAI-/0/1769350697059?e=1784160000&v=beta&t=4DZIGK4uIgMIl_ecWud2nObMZjiwxeyGTHy4Wic4UHE" alt="Aditya Raj Singh" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-10 scroll-mt-24"
      >
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Terminal className="text-purple-400" /> Experience
        </h2>
        <div className="space-y-8">
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="glass p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-blue-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                  <h4 className="text-xl text-purple-300 font-medium">{exp.company}</h4>
                </div>
                <span className="text-slate-400 mt-2 md:mt-0 font-mono">{exp.duration}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-10 scroll-mt-24"
      >
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Code2 className="text-blue-400" /> Production Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((proj: any) => (
            <div key={proj.id} className="glass p-6 rounded-2xl flex flex-col h-full hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <a href={proj.url} target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:underline'>
                  <h3 className="text-xl font-bold text-white transition-colors duration-300 hover:text-purple-400">{proj.name}</h3>
                </a>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${proj.status === 'Ongoing' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>
                  {proj.status}
                </span>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                {proj.bullets.slice(0, 3).map((bullet: string, i: number) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span> {bullet}
                  </li>
                ))}
                {proj.bullets.length > 3 && (
                  <li className="text-sm text-slate-500 italic">+{proj.bullets.length - 3} more details...</li>
                )}
              </ul>
              <div className="flex flex-wrap gap-2 mt-auto">
                {proj.tech.slice(0, 4).map((t: string) => (
                  <span key={t} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md">
                    {t}
                  </span>
                ))}
                {proj.tech.length > 4 && <span className="text-xs text-slate-500">+{proj.tech.length - 4}</span>}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-10 scroll-mt-24"
      >
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Cpu className="text-green-400" /> Skills & Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(data.skills).map(([category, skills]: [string, any]) => (
            <div key={category} className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-white capitalize mb-4 border-b border-slate-700 pb-2">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string) => (
                  <span key={skill} className="bg-slate-800/50 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-700 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <Chatbot />
    </div>
  );
}