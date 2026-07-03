import React from "react";
import ProjectCard from "../components/renders/ProjectCard";
import { Mail, Quote as QuoteIcon } from "lucide-react";

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}


function Heading({ level, text }: { level: 1 | 2 | 3; text: string }) {
  const Tag = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';
  const sizeClass = level === 1 ? 'text-lg font-bold' : level === 2 ? 'text-base font-semibold' : 'text-sm font-semibold';
  return <Tag className={`${sizeClass} text-white mt-3 mb-1.5`} >{text}</Tag>;
}

function Paragraph({ text }: { text: string }) {
  return <p className="text-slate-300 text-sm leading-relaxed mt-1.5">{text}</p>;
}

function BulletList({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={`${ordered ? 'list-decimal' : 'list-disc'} list-inside text-slate-300 text-sm pl-2 mt-1.5 space-y-1`}>
      {items.map((item, i) => (
        <li key={i} className="text-slate-300">{item}</li>
      ))}
    </Tag>
  );
}

function SkillsGrid({ categories }: { categories: { title: string; skills: string[] }[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 mt-3">
      {categories.map((cat, i) => (
        <div key={i} className="bg-slate-800/30 border border-slate-700/50 p-3 rounded-xl">
          <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">{cat.title}</h4>
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((skill, j) => (
              <span key={j} className="text-xs bg-slate-800 border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceCard({ company, role, duration, achievements }: { company: string; role: string; duration: string; achievements: string[] }) {
  return (
    <div className="bg-slate-800/30 border border-slate-700/40 p-4 rounded-xl mt-3 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-sm text-white">{role}</h4>
          <h5 className="text-xs text-purple-400 font-medium">{company}</h5>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">{duration}</span>
      </div>
      <ul className="list-disc list-inside text-xs pl-1 text-slate-300 space-y-1.5">
        {achievements.map((ach, i) => (
          <li key={i}>{ach}</li>
        ))}
      </ul>
    </div>
  );
}

function Timeline({ items }: { items: { title: string; subtitle: string; duration: string }[] }) {
  return (
    <div className="border-l border-slate-700 pl-4 space-y-4 mt-3 ml-2">
      {items.map((item, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 border border-slate-900"></div>
          <h4 className="text-xs font-bold text-white">{item.title}</h4>
          <p className="text-[11px] text-purple-400">{item.subtitle}</p>
          <span className="text-[10px] text-slate-400 font-mono">{item.duration}</span>
        </div>
      ))}
    </div>
  );
}

function ContactCard({ email, github, linkedin }: { email?: string; github?: string; linkedin?: string }) {
  return (
    <div className="flex flex-col gap-2 bg-slate-800/30 border border-slate-700/60 p-4 rounded-xl mt-3">
      {email && (
        <a href={`mailto:${email}`} className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors">
          <Mail className="w-3.5 h-3.5 text-purple-400" /> {email}
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors">
          <Github className="w-3.5 h-3.5 text-purple-400" /> {github}
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors">
          <Linkedin className="w-3.5 h-3.5 text-purple-400" /> {linkedin}
        </a>
      )}
    </div>
  );
}

function Quote({ text }: { text: string }) {
  return (
    <div className="flex gap-2 border-l-2 border-purple-500 pl-3 italic text-slate-400 text-xs mt-3">
      <QuoteIcon className="w-3 h-3 text-purple-500 shrink-0" />
      <p>{text}</p>
    </div>
  );
}

function Divider() {
  return <hr className="border-slate-800 my-4" />;
}

function Code({ language, code }: { language: string; code: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs overflow-x-auto text-slate-300 mt-3">
      <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider mb-2">
        <span>{language}</span>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

export default function AIResponse({
  blocks,
}: {
  blocks: any[];
}) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <Heading key={index} {...block} />;
          case "paragraph":
            return <Paragraph key={index} {...block} />;
          case "list":
            return <BulletList key={index} {...block} />;
          case "project-card":
            return <ProjectCard key={index} {...block} />;
          case "skills-grid":
            return <SkillsGrid key={index} {...block} />;
          case "experience-card":
            return <ExperienceCard key={index} {...block} />;
          case "timeline":
            return <Timeline key={index} {...block} />;
          case "contact":
            return <ContactCard key={index} {...block} />;
          case "quote":
            return <Quote key={index} {...block} />;
          case "divider":
            return <Divider key={index} />;
          case "code":
            return <Code key={index} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
