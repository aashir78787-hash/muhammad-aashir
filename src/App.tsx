import React, { useEffect, useRef, useState, useCallback } from "react";

/* ============================================================
   100% BULLETPROOF INLINE SVG ICONS
   ============================================================ */
interface SVGIconProps extends React.SVGProps<SVGSVGElement> { }

const ArrowRight: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
const ArrowLeft: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
);
const ArrowUpRight: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
);
const ExternalLink: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
);
const Target: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
);
const Lightbulb: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
);
const Users: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const Zap: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const Code2: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
);
const FileSearch: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" /><path d="m9 18-1.5-1.5" /><circle cx="5" cy="14" r="3" /></svg>
);
const Link2: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></svg>
);
const Settings: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);
const Palette: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
);
const Megaphone: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
);
const Share2: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
);
const ShoppingBag: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
);
const Stethoscope: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 4v3a8 8 0 0 0 8 8v0a8 8 0 0 0 8-8V4" /><path d="M12 15v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3" /><circle cx="6" cy="16" r="2" /></svg>
);
const Mountain: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>
);
const Store: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 10V7" /></svg>
);
const Plus: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
);
const Mail: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const MapPin: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const Send: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
);
const LinkedIn: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

/* ============================================================
   DATA
   ============================================================ */
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const SKILLS = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Building responsive, fast-loading websites and web applications using modern technologies and clean, maintainable code.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    icon: FileSearch,
    title: "On-Page SEO",
    desc: "Optimizing content, meta tags, and site structure to improve keyword relevance and search engine rankings.",
    tags: ["Keyword Research", "Meta Tags", "Content Optimization"],
  },
  {
    icon: Link2,
    title: "Off-Page SEO",
    desc: "Building domain authority through strategic link building, outreach, and brand mentions across the web.",
    tags: ["Link Building", "Outreach", "Guest Posting"],
  },
  {
    icon: Settings,
    title: "Technical SEO",
    desc: "Improving site speed, crawlability, indexing, and structured data to help search engines understand your site.",
    tags: ["Site Speed", "Schema Markup", "Crawl Audits"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Creating visually compelling graphics, branding assets, and marketing creatives that capture attention.",
    tags: ["Photoshop", "Illustrator", "Canva"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Management",
    desc: "Planning and leading digital campaigns across channels, aligning strategy with measurable business goals.",
    tags: ["Strategy", "Campaign Planning", "Analytics"],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Growing brand presence and engagement through content strategy, scheduling, and community management.",
    tags: ["Content Strategy", "Scheduling", "Engagement"],
  },
];

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const Icon = project.icon;

  return (

    href = { project.url }
      target = "_blank"
  rel = "noopener noreferrer"
  className = "group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
    >
    {/* Logo container — fixed aspect ratio, image never cropped */ }
    < div className = "relative w-full aspect-[16/9] bg-neutral-50 flex items-center justify-center overflow-hidden" >
      <img
        src={project.img}
        alt={`${project.name} logo`}
        className={
          project.imgFit === "contain"
            ? "w-full h-full object-contain p-6"
            : "w-full h-full object-cover"
        }
        loading="lazy"
      />
      </div >

    <div className="flex flex-col gap-2 p-5">
      <div className="flex items-center gap-2 text-neutral-500 text-sm">
        <Icon className="w-4 h-4" />
        <span>{project.domain}</span>
      </div>
      <h3 className="text-lg font-semibold text-neutral-900">
        {project.name}
      </h3>
      <p className="text-sm text-neutral-600 leading-relaxed">
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    </a >
  );
}

const WHATSAPP_IMG = "/images/whatsapp.svg";
const PROFILE_IMG = "https://z-cdn-media.chatglm.cn/files/20f88d85-236a-491b-9288-11ede87d363f.png?auth_key=1882906137-c210396973e54324af80563658ce48c0-0-f125cb28b7727a158eaf54bbff4f435b";

/* ============================================================
   GLOBAL STYLES (Inline CSS Injection)
   ============================================================ */
const GlobalStyles: React.FC = () => (
  <style>{`
    .pf-root {
      font-family: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
      overflow-x: hidden;
      position: relative;
      min-height: 100vh;
    }
    
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: #6c5ce7;
      z-index: 9999;
      width: 0%;
      transition: width 0.1s ease-out;
    }
    
    .cursor-glow {
      position: fixed;
      top: 0;
      left: 0;
      width: 480px;
      height: 480px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(108, 92, 231, 0.08) 0%, rgba(108, 92, 231, 0) 70%);
      pointer-events: none;
      z-index: 10;
      transform: translate(-1000px, -1000px);
      transition: transform 0.05s linear;
    }
    
    @media (max-width: 1024px) {
      .cursor-glow {
        display: none;
      }
    }
    
    .nav-shadow {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    
    .nav-shadow-scrolled {
      box-shadow: 0 4px 20px -2px rgba(108, 92, 231, 0.1), 0 2px 10px -1px rgba(108, 92, 231, 0.05);
      background-color: rgba(255, 255, 255, 0.85);
    }
    
    .nav-link {
      position: relative;
      padding: 0.5rem 0;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: #6c5ce7;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    
    .nav-link:hover::after,
    .nav-link.active::after {
      width: 100%;
    }
    
    .btn-shine {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .btn-shine::before {
      content: '';
      position: absolute;
      top: 0;
      left: -150%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.25),
        transparent
      );
      transform: skewX(-25deg);
    }
    
    .btn-shine:hover::before {
      animation: shine 0.75s ease;
    }
    
    @keyframes shine {
      100% {
        left: 200%;
      }
    }
    
    .hero-pattern {
      background-color: #f8f9fc;
      background-image: radial-gradient(rgba(108, 92, 231, 0.04) 1.5px, transparent 1.5px);
      background-size: 24px 24px;
    }
    
    .pulse-dot {
      box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.4);
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.7);
      }
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 8px rgba(108, 92, 231, 0);
      }
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(108, 92, 231, 0);
      }
    }
    
    @keyframes textGlow {
      0%, 100% {
        text-shadow: 0 0 10px rgba(108, 92, 231, 0.1), 0 0 20px rgba(108, 92, 231, 0.05);
      }
      50% {
        text-shadow: 0 0 15px rgba(108, 92, 231, 0.2), 0 0 30px rgba(108, 92, 231, 0.1);
      }
    }
    
    .text-glow-anim {
      animation: textGlow 3s infinite ease-in-out;
    }
    
    .word-in {
      opacity: 0;
      transform: translateY(20px);
      animation: wordReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      display: inline-block;
    }
    
    @keyframes wordReveal {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .profile-shadow {
      box-shadow: 0 20px 40px -15px rgba(108, 92, 231, 0.15), 0 15px 25px -10px rgba(108, 92, 231, 0.05);
    }
    
    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .spin-slow {
      animation: spinSlow 20s linear infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    .float-animation {
      animation: float 6s ease-in-out infinite;
    }
    
    .marquee-track {
      animation: marquee 25s linear infinite;
    }
    
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .reveal-on-scroll.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    
    .skill-card {
      position: relative;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .skill-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px -10px rgba(108, 92, 231, 0.12), 0 4px 12px -5px rgba(108, 92, 231, 0.05);
      border-color: rgba(108, 92, 231, 0.3);
    }
    
    .skill-card:hover .skill-icon {
      background-color: #6c5ce7;
    }
    
    .skill-card:hover .skill-icon svg {
      color: #ffffff;
    }
    
    .skill-card-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(800px circle at var(--x, 0px) var(--y, 0px), rgba(108, 92, 231, 0.05), transparent 40%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    
    .skill-card:hover .skill-card-glow {
      opacity: 1;
    }
    
    .rail-section {
      background-color: #ffffff;
    }
    
    .rail-grid-overlay {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(to right, rgba(108, 92, 231, 0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(108, 92, 231, 0.02) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
    }
    
    .ghost-heading {
      position: absolute;
      top: -60px;
      left: -20px;
      font-size: 140px;
      font-weight: 900;
      color: rgba(108, 92, 231, 0.03);
      user-select: none;
      pointer-events: none;
      font-family: 'Geist', sans-serif;
    }
    
    @media (max-width: 640px) {
      .ghost-heading {
        font-size: 80px;
        top: -40px;
      }
    }
    
    .rail-progress-track {
      height: 4px;
      background: #e2e8f0;
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }
    
    .rail-progress-fill {
      height: 100%;
      background: #6c5ce7;
      border-radius: 2px;
      transition: width 0.3s ease;
      width: 0%;
    }
    
    .rail-nav-btn {
      transition: all 0.3s ease;
    }
    
    .rail-nav-btn:hover {
      transform: scale(1.05);
    }
    
    .rail-nav-btn:active {
      transform: scale(0.95);
    }
    
    .rail-track-wrap {
      position: relative;
      width: 100%;
    }
    
    .rail-fade {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 80px;
      z-index: 5;
      pointer-events: none;
    }
    
    .rail-fade-left {
      left: -1px;
      background: linear-gradient(to right, #ffffff, transparent);
    }
    
    .rail-fade-right {
      right: -1px;
      background: linear-gradient(to left, #ffffff, transparent);
    }
    
    @media (max-width: 768px) {
      .rail-fade {
        width: 30px;
      }
    }
    
    #rail-track {
      display: flex;
      gap: 28px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 20px 0;
      cursor: grab;
      user-select: none;
    }
    
    #rail-track::-webkit-scrollbar {
      display: none;
    }
    
    #rail-track.is-dragging {
      cursor: grabbing;
      scroll-snap-type: none;
    }
    
    .rail-card {
      flex: 0 0 380px;
      scroll-snap-align: start;
      position: relative;
      perspective: 1000px;
    }
    
    @media (max-width: 640px) {
      .rail-card {
        flex: 0 0 300px;
      }
    }
    
    .rail-card-index {
      font-family: monospace;
      font-size: 11px;
      color: #94a3b8;
      margin-bottom: 8px;
      font-weight: 600;
      letter-spacing: 0.1em;
    }
    
    .rail-card-inner {
      border-radius: 16px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px -15px rgba(0,0,0,0.05);
      overflow: hidden;
      transition: transform 0.1s ease-out, box-shadow 0.3s ease;
      height: 100%;
    }
    
    .rail-card:hover .rail-card-inner {
      box-shadow: 0 20px 40px -15px rgba(108, 92, 231, 0.12);
    }
    
    .rail-card-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), rgba(108, 92, 231, 0.04), transparent 50%);
      pointer-events: none;
    }
    
    .rail-browser {
      border-bottom: 1px solid #e2e8f0;
      background: #f1f5f9;
    }
    
    .rail-browser-bar {
      height: 36px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .rail-browser-bar span {
      margin-right: 4px;
    }
    
    .rail-browser-media {
      height: 200px;
      overflow: hidden;
      position: relative;
      background: #f8fafc;
    }
    
    .rail-browser-media img {
      width: 100%;
      height: 100%;
      transition: transform 0.5s ease;
    }
    
    .rail-card:hover .rail-browser-media img {
      transform: scale(1.03);
    }
    
    .rail-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 99px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 6px;
      z-index: 10;
    }
    
    .rail-badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      animation: flash 1.5s infinite;
    }
    
    @keyframes flash {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    
    .rail-card-body {
      padding: 24px;
    }
    
    .rail-browser-dashed {
      border: 2px dashed #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
    }
    
    .rail-plus {
      transition: transform 0.3s ease;
    }
    
    .rail-card:hover .rail-plus {
      transform: scale(1.1) rotate(90deg);
    }
    
    .input-focus {
      transition: all 0.3s ease;
      outline: none;
    }
    
    .input-focus:focus {
      border-color: #6c5ce7;
      box-shadow: 0 0 0 4px rgba(108, 92, 231, 0.15);
    }
    
    .card-shadow {
      box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.05);
    }
    
    .card-shadow-hover:hover {
      box-shadow: 0 20px 40px -15px rgba(108, 92, 231, 0.1);
    }
    
    .wa-float {
      animation: bounceSlow 3s ease-in-out infinite;
    }
    
    @keyframes bounceSlow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    
    .toast {
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .toast.show {
      transform: translateY(0);
      opacity: 1;
    }
  `}</style>
);

/* ============================================================
   SMALL UI HELPERS
   ============================================================ */
interface WordRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

const WordReveal: React.FC<WordRevealProps> = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          className={`word-in ${className}`}
          style={{ animationDelay: `${delay + i * 0.08}s`, marginRight: "0.28em" }}
        >
          {w}
        </span>
      ))}
    </>
  );
};

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <LinkedIn className={className} strokeWidth={1.8} />
);

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  const railTrackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const draggingRef = useRef(false);
  const draggedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  const counterElsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const progressElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const totalElsRef = useRef<(HTMLSpanElement | null)[]>([]);

  /* ---- scroll progress + nav shadow + active section ---- */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = pct + "%";
      }
      setNavScrolled(scrollTop > 50);

      let current = "";
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 200;
        if (scrollTop >= top) {
          const id = section.getAttribute("id");
          if (id) current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- cursor glow ---- */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${e.clientX - 240}px, ${e.clientY - 240}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ---- reveal on scroll (IntersectionObserver) ---- */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ---- work rail carousel logic ---- */
  useEffect(() => {
    const track = railTrackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll(".rail-card")) as HTMLElement[];
    const total = cards.length;

    totalElsRef.current.forEach((el) => el && (el.textContent = String(total).padStart(2, "0")));

    const cardStep = () => {
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || "28");
      return cards[0].getBoundingClientRect().width + gap;
    };

    const setActive = (index: number) => {
      currentRef.current = Math.max(0, Math.min(total - 1, index));
      const n = String(currentRef.current + 1).padStart(2, "0");
      counterElsRef.current.forEach((el) => el && (el.textContent = n));
      const pct = ((currentRef.current + 1) / total) * 100;
      progressElsRef.current.forEach((el) => el && (el.style.width = pct + "%"));
    };

    const goTo = (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      track.scrollTo({ left: clamped * cardStep(), behavior: "smooth" });
      setActive(clamped);
    };

    let scrollRaf: number | null = null;
    const onScroll = () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        const idx = Math.round(track.scrollLeft / cardStep());
        setActive(idx);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    const onMouseDown = (e: MouseEvent) => {
      draggingRef.current = true;
      draggedRef.current = false;
      track.classList.add("is-dragging");
      startXRef.current = e.pageX;
      startScrollRef.current = track.scrollLeft;
    };
    const onMouseUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      track.classList.remove("is-dragging");
      if (draggedRef.current) {
        goTo(Math.round(track.scrollLeft / cardStep()));
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const dx = e.pageX - startXRef.current;
      if (Math.abs(dx) > 4) {
        draggedRef.current = true;
      }
      track.scrollLeft = startScrollRef.current - dx;
    };
    const onClickCapture = (e: MouseEvent) => {
      if (draggedRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    track.addEventListener("click", onClickCapture, true);

    // subtle magnetic tilt
    const tiltHandlers: { card: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }[] = [];
    if (window.matchMedia("(hover: hover)").matches) {
      cards.forEach((card) => {
        const element = card as HTMLElement;
        const inner = element.querySelector(".rail-card-inner") as HTMLElement;
        if (!inner) return;

        const move = (e: MouseEvent) => {
          const r = element.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          inner.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-6px)`;
        };
        const leave = () => {
          inner.style.transform = "";
        };
        element.addEventListener("mousemove", move);
        element.addEventListener("mouseleave", leave);
        tiltHandlers.push({ card: element, move, leave });
      });
    }

    const onResize = () => goTo(currentRef.current);
    window.addEventListener("resize", onResize);

    setActive(0);

    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      track.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("resize", onResize);
      tiltHandlers.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  const goPrev = useCallback(() => {
    const track = railTrackRef.current;
    if (!track) return;
    const card = track.querySelector(".rail-card");
    if (!card) return;
    const step = card.getBoundingClientRect().width + 28;
    track.scrollTo({ left: (currentRef.current - 1) * step, behavior: "smooth" });
  }, []);

  const goNext = useCallback(() => {
    const track = railTrackRef.current;
    if (!track) return;
    const card = track.querySelector(".rail-card");
    if (!card) return;
    const step = card.getBoundingClientRect().width + 28;
    track.scrollTo({ left: (currentRef.current + 1) * step, behavior: "smooth" });
  }, []);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Validation
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all required fields.");
      return;
    }

    // 2. Formspree Integration
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xaqrebdj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        showToast("Something went wrong. Please try again.");
      }
    } catch (error) {
      showToast("Error: Could not send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToHash = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ---- about image 3D tilt ---- */
  const aboutImgRef = useRef<HTMLDivElement>(null);
  const onAboutMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = aboutImgRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) scale(1.02)`;
  };
  const onAboutLeave = () => {
    if (aboutImgRef.current) {
      aboutImgRef.current.style.transform = "";
    }
  };

  return (
    <div className="pf-root">
      <GlobalStyles />

      {/* scroll progress + cursor glow */}
      <div ref={progressBarRef} className="scroll-progress" />
      <div ref={cursorGlowRef} className="cursor-glow" />

      {/* ========== NAVIGATION ========== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border-light ${navScrolled ? "nav-shadow-scrolled" : "nav-shadow"
          }`}
        style={{ transition: "box-shadow .3s ease" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid grid-cols-12 items-center h-16 sm:h-[4.5rem]">
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center shadow-sm spin-slow" style={{ animationDuration: "18s" }}>
                <span className="text-white font-geist font-bold text-sm">MA</span>
              </div>
              <span className="font-geist font-semibold text-text-primary tracking-tight hidden sm:block">
                Muhammad Aashir
              </span>
            </div>
            <div className="col-span-4 hidden md:flex items-center justify-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToHash(e, link.href)}
                  className={`nav-link text-sm font-medium transition-colors ${activeSection === link.href.slice(1)
                    ? "text-accent font-semibold active"
                    : "text-text-secondary hover:text-accent"
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="col-span-8 md:col-span-4 flex items-center justify-end gap-3">
              <a
                href="https://wa.me/923203530366"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors font-medium px-3 py-2 rounded-lg"
              >
                <img src={WHATSAPP_IMG} alt="WhatsApp" className="w-4 h-4" loading="lazy" referrerPolicy="no-referrer" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-aashir-a8328a355/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors font-medium px-3 py-2 rounded-lg"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToHash(e, "#contact")}
                className="btn-shine bg-accent text-white text-xs font-semibold tracking-wide uppercase py-2.5 px-5 rounded-lg hover:bg-accent-dark transition-colors shadow-sm"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-bg-secondary hero-pattern">
        <div
          className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none float-animation"
          style={{ background: "#16A34A", filter: "blur(120px)", animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none float-animation"
          style={{ background: "var(--color-accent)", filter: "blur(120px)", animationDuration: "10s", animationDelay: "1s" }}
        />

        <div className="max-w-screen-2xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="lg:pr-12 xl:pr-20 order-2 lg:order-1">
              <div className="reveal-on-scroll animate-delay-[0.1s]">
                <div className="inline-flex items-center gap-2 bg-accent-light border border-purple-200 rounded-full px-4 py-2 mb-8" style={{ borderColor: "rgba(108,92,231,0.25)" }}>
                  <span className="relative w-2 h-2 bg-accent rounded-full pulse-dot" />
                  <span className="text-xs font-semibold tracking-wide text-accent-dark">Available for Work</span>
                </div>
              </div>

              <h1 className="font-geist font-semibold clamp-hero tracking-tight leading-[1.1] mb-6" style={{ perspective: "800px" }}>
                <div><WordReveal text="Hi, I'm" delay={0.80} /></div>
                <div><WordReveal text="Muhammad" delay={0.35} className="text-accent text-glow-anim" /></div>
                <div><WordReveal text="Aashir" delay={0.55} /></div>
              </h1>

              <p
                className="reveal-on-scroll text-lg lg:text-xl font-normal text-text-secondary leading-relaxed max-w-lg mb-10"
                style={{ transitionDelay: "0.75s" }}
              >
                A passionate professional dedicated to creating impactful solutions and driving innovation through
                technology and creativity.
              </p>

              <div className="reveal-on-scroll flex flex-wrap gap-4" style={{ transitionDelay: "0.9s" }}>
                <a
                  href="#projects"
                  onClick={(e) => scrollToHash(e, "#projects")}
                  className="btn-shine group bg-accent text-white text-xs font-semibold tracking-wide uppercase py-4 px-8 rounded-lg hover:bg-accent-dark transition-colors inline-flex items-center gap-3 shadow-sm"
                  style={{ boxShadow: "0 8px 24px rgba(108,92,231,0.25)" }}
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-aashir-a8328a355/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine group border-2 border-border-light text-text-primary text-xs font-semibold tracking-wide uppercase py-4 px-8 rounded-lg hover:border-accent hover-text-accent transition-all inline-flex items-center gap-3"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              </div>

              <div
                className="reveal-on-scroll grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-border-light"
                style={{ transitionDelay: "1.05s" }}
              >
                {[
                  ["2+", "Years Exp."],
                  ["5+", "Projects"],
                  ["100%", "Dedication"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-geist font-semibold text-3xl tracking-tight text-text-primary">{num}</div>
                    <div className="text-xs text-text-tertiary mt-1 uppercase tracking-wide font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="reveal-on-scroll relative" style={{ transitionDelay: "0.3s" }}>
                <div className="absolute -top-5 -left-5 w-20 h-20 border-2 rounded-2xl float-animation" style={{ borderColor: "rgba(108,92,231,0.18)" }} />
                <div
                  className="absolute -bottom-4 -right-4 w-14 h-14 border-2 border-border-light rounded-xl float-animation bg-white"
                  style={{ animationDelay: "1s" }}
                />
                <div className="absolute top-1/2 -right-6 w-3 h-3 bg-accent rounded-full float-animation" style={{ animationDelay: "0.5s" }} />
                <div
                  className="absolute -top-3 right-12 w-8 h-8 bg-accent-light rounded-lg float-animation"
                  style={{ animationDelay: "1.5s" }}
                />
                <div
                  className="absolute -inset-3 rounded-[28px] pointer-events-none spin-slow"
                  style={{
                    background: "conic-gradient(from 0deg, #6c5ce7, transparent 30%, transparent 70%, #6c5ce7)",
                    opacity: 0.25,
                    filter: "blur(2px)",
                  }}
                />

                <div className="relative w-72 h-80 sm:w-80 sm:h-[360px] lg:w-[380px] lg:h-[420px] rounded-2xl overflow-hidden profile-shadow bg-white border border-border-light">
                  <img
                    src="https://z-cdn-media.chatglm.cn/files/20f88d85-236a-491b-9288-11ede87d363f.png?auth_key=1882906137-c210396973e54324af80563658ce48c0-0-f125cb28b7727a158eaf54bbff4f435b"
                    alt="Muhammad Aashir - Professional Profile Photo"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white via-white/60 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/90 backdrop-blur-md border border-border-light rounded-xl px-5 py-3.5 shadow-lg">
                      <div className="text-sm font-semibold text-text-primary">Muhammad Aashir</div>
                      <div className="text-xs text-accent font-medium mt-0.5">Professional · Creative · Innovative</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-text-tertiary font-medium">Scroll</span>
          <div className="w-5 h-8 border-2 border-border-light rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-text-tertiary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ========== MARQUEE ========== */}
      <div className="border-y border-border-light bg-white py-5 overflow-hidden">
        <div className="flex marquee-track" style={{ width: "max-content" }}>
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center gap-8 px-4">
              {["WEB DEVELOPMENT", "PROBLEM SOLVING", "CREATIVE DESIGN", "TEAM COLLABORATION", "INNOVATION", "STRATEGIC THINKING", "TECHNOLOGY"].map(
                (word) => (
                  <React.Fragment key={word}>
                    <span className="text-sm text-text-tertiary font-medium tracking-wide">{word}</span>
                    <span className="text-accent">✦</span>
                  </React.Fragment>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========== ABOUT ========== */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-on-scroll">
              <div
                ref={aboutImgRef}
                onMouseMove={onAboutMove}
                onMouseLeave={onAboutLeave}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden card-shadow bg-bg-secondary"
                style={{ transition: "transform .3s ease-out" }}
              >
                <img src="https://z-cdn-media.chatglm.cn/files/20f88d85-236a-491b-9288-11ede87d363f.png?auth_key=1882906137-c210396973e54324af80563658ce48c0-0-f125cb28b7727a158eaf54bbff4f435b" alt="Muhammad Aashir" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="bg-accent text-white text-xs font-bold tracking-wide uppercase px-5 py-2.5 rounded-lg shadow-md">
                    SEO Expert
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="reveal-on-scroll">
                <span className="text-[10px] font-bold tracking-widest uppercase text-accent mb-4 block">About Me</span>
                <h2 className="font-geist font-semibold text-3xl sm:text-4xl tracking-tight leading-[1.15] mb-8">
                  Driven by curiosity,
                  <br />
                  powered by <span className="text-accent">passion</span>
                </h2>
              </div>

              <div className="reveal-on-scroll space-y-5" style={{ transitionDelay: "0.1s" }}>
                <p className="text-base font-normal text-text-secondary leading-relaxed">
                  I'm Muhammad Aashir — a motivated professional with a keen eye for detail and a deep commitment to
                  excellence. I believe in continuous learning and pushing boundaries to deliver outstanding results.
                </p>
                <p className="text-base font-normal text-text-secondary leading-relaxed">
                  With a strong foundation in technology and a creative mindset, I strive to build solutions that
                  make a real difference. Whether it's developing web applications, solving complex problems, or
                  collaborating with teams — I bring energy and dedication to everything I do.
                </p>
              </div>

              <div className="reveal-on-scroll mt-10 grid grid-cols-2 gap-4" style={{ transitionDelay: "0.2s" }}>
                {[
                  [Target, "Goal-Oriented", "Focused on delivering measurable results"],
                  [Lightbulb, "Innovative", "Always exploring new approaches"],
                  [Users, "Team Player", "Thriving in collaborative environments"],
                  [Zap, "Fast Learner", "Quick to adapt and grow"],
                ].map(([IconComponent, title, desc], idx) => {
                  const Icon = IconComponent as React.ComponentType<SVGIconProps>;
                  return (
                    <div
                      key={idx}
                      className="skill-card border border-border-light rounded-xl p-5 bg-bg-secondary/50 relative overflow-hidden"
                    >
                      <div className="skill-card-glow" />
                      <div className="skill-icon w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center mb-3 transition-colors">
                        <Icon className="w-5 h-5 text-accent transition-colors" />
                      </div>
                      <div className="text-sm font-semibold text-text-primary mb-1">{title}</div>
                      <div className="text-xs text-text-tertiary leading-relaxed">{desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SKILLS ========== */}
      <section id="skills" className="py-24 lg:py-32 bg-bg-secondary border-y border-border-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="reveal-on-scroll text-[10px] font-bold tracking-widest uppercase text-accent mb-4 block">
              Skills & Expertise
            </span>
            <h2
              className="reveal-on-scroll font-geist font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15]"
              style={{ transitionDelay: "0.1s" }}
            >
              What I bring to
              <br />
              the <span className="text-accent">table</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map(({ icon: Icon, title, desc, tags }, i) => (
              <div
                key={title}
                className="skill-card reveal-on-scroll bg-white border border-border-light rounded-2xl p-8 card-shadow relative overflow-hidden"
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className="skill-card-glow" />
                <div className="skill-icon w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-5 h-5 text-accent transition-colors" />
                </div>
                <h3 className="font-geist text-lg font-semibold mb-3 text-text-primary">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-5">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-accent bg-accent-light font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROJECTS / WORK RAIL ========== */}
      <section id="projects" className="rail-section py-24 lg:py-32 border-y border-border-light overflow-hidden relative">
        <div className="rail-grid-overlay" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 relative">
            <div className="relative">
              <span className="ghost-heading" aria-hidden="true">WORK</span>
              <span className="relative font-mono text-[10px] font-bold tracking-widest uppercase text-accent mb-4 block">
                Selected client builds — live in production
              </span>
              <h2 className="relative font-geist font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-text-primary">
                Sites I've shipped,
                <br />
                running <span className="text-accent">right now</span>
              </h2>
              <p className="relative mt-5 max-w-md text-sm text-text-secondary leading-relaxed">
                {PROJECTS.length} live builds across e-commerce, healthcare and hospitality — each one designed, developed and
                optimized end to end. Drag the rail or use the arrows to browse.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-5 shrink-0">
              <div className="rail-progress-track w-40">
                <div ref={(el) => (progressElsRef.current[0] = el)} className="rail-progress-fill" style={{ width: "16.66%" }} />
              </div>
              <div className="font-mono text-sm text-text-secondary whitespace-nowrap">
                <span ref={(el) => (counterElsRef.current[0] = el)} className="text-text-primary font-semibold">
                  01
                </span>
                <span className="mx-1">/</span>
                <span ref={(el) => (totalElsRef.current[0] = el)}>{String(PROJECTS.length + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  aria-label="Previous project"
                  className="rail-nav-btn w-11 h-11 rounded-full border border-border-light text-text-primary flex items-center justify-center hover-border-accent hover-text-accent"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next project"
                  className="rail-nav-btn w-11 h-11 rounded-full flex items-center justify-center text-white bg-accent hover-bg-accent-dark"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="rail-track-wrap">
            <div className="rail-fade rail-fade-left" />
            <div className="rail-fade rail-fade-right" />

            <div id="rail-track" ref={railTrackRef}>
              {PROJECTS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <article className="rail-card" data-index={i} key={p.name}>
                    <div className="rail-card-index">Case {String(i + 1).padStart(2, "0")}</div>
                    <div className="rail-card-inner">
                      <div className="rail-card-glow" />
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block select-none">
                        <div className="rail-browser">
                          <div className="rail-browser-bar">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
                            <div className="ml-3 flex-1 font-mono text-[11px] truncate px-3 py-1 rounded-md bg-white border border-border-light text-text-secondary">
                              {p.domain}
                            </div>
                          </div>
                          <div
                            className="rail-browser-media animate-pulse-placeholder"
                            style={p.imgFit === "contain" ? { display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "#fff" } : {}}
                          >
                            <span className="rail-badge">
                              <span className="rail-badge-dot" />
                              Live
                            </span>
                            <img
                              src={p.img}
                              alt={p.name}
                              draggable="false"
                              className={p.imgFit === "contain" ? "max-h-full max-w-full object-contain" : "object-cover"}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                        <div className="rail-card-body flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-geist text-lg font-semibold mb-1.5 flex items-center gap-1.5 text-text-primary">
                              {p.name}
                              <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </h3>
                            <p className="text-sm leading-relaxed text-text-secondary">{p.desc}</p>
                          </div>
                          <Icon className="w-4 h-4 mt-1 shrink-0 text-accent" />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4 px-6">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] uppercase tracking-wider text-accent bg-accent-light font-semibold px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </a>
                    </div>
                  </article>
                );
              })}

              {/* More on the way card */}
              <article className="rail-card" data-index={PROJECTS.length}>
                <div className="rail-card-index">Case {String(PROJECTS.length + 1).padStart(2, "0")}</div>
                <div className="rail-card-inner flex flex-col">
                  <div className="rail-browser rail-browser-dashed">
                    <div
                      className="rail-browser-media flex flex-col items-center justify-center text-center p-8"
                      style={{ height: 236, background: "rgba(108, 92, 231, 0.05)" }}
                    >
                      <div className="rail-plus w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm">
                        <Plus className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-geist text-lg font-semibold mb-1.5 text-text-primary">More on the way</h3>
                      <p className="text-sm leading-relaxed text-text-secondary">New client projects added regularly.</p>
                    </div>
                  </div>
                  <div className="rail-card-body">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary px-6">
                      Check back soon
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* Mobile nav row */}
          <div className="flex md:hidden items-center justify-between mt-8">
            <div className="rail-progress-track flex-1 mr-5">
              <div ref={(el) => (progressElsRef.current[1] = el)} className="rail-progress-fill" style={{ width: "16.66%" }} />
            </div>
            <div className="font-mono text-sm text-text-secondary whitespace-nowrap mr-4">
              <span ref={(el) => (counterElsRef.current[1] = el)} className="text-text-primary font-semibold">
                01
              </span>
              <span className="mx-1">/</span>
              <span ref={(el) => (totalElsRef.current[1] = el)}>{String(PROJECTS.length + 1).padStart(2, "0")}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                aria-label="Previous project"
                className="rail-nav-btn w-10 h-10 rounded-full border border-border-light text-text-primary flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next project"
                className="rail-nav-btn w-10 h-10 rounded-full flex items-center justify-center text-white bg-accent"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== LINKEDIN CTA ========== */}
      <section className="py-24 lg:py-32 bg-bg-secondary border-y border-border-light relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08] spin-slow"
          style={{ background: "#6c5ce7", filter: "blur(120px)", animationDuration: "24s" }}
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="reveal-on-scroll">
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent mb-6 block">Let's Connect</span>
            <h2 className="font-geist font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] mb-8">
              Find me on <span className="text-accent">LinkedIn</span>
            </h2>
            <p className="text-base font-normal text-text-secondary leading-relaxed max-w-2xl mx-auto mb-12">
              Stay updated with my professional journey, connect for opportunities, or simply say hello. I'm always
              open to meaningful conversations and collaborations.
            </p>
          </div>

          <div className="reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
            <a
              href="https://www.linkedin.com/in/muhammad-aashir-a8328a355/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group inline-flex items-center gap-4 bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-semibold tracking-wide py-4 px-10 rounded-xl transition-colors shadow-lg"
              style={{ boxShadow: "0 12px 30px rgba(10,102,194,0.25)" }}
            >
              <LinkedInIcon className="w-5 h-5" />
              Visit My LinkedIn Profile
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="reveal-on-scroll mt-16 max-w-sm mx-auto" style={{ transitionDelay: "0.3s" }}>
            <div className="card-shadow-hover bg-white border border-border-light rounded-2xl p-7 text-left card-shadow">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-border-light">
                  <img src="https://z-cdn-media.chatglm.cn/files/20f88d85-236a-491b-9288-11ede87d363f.png?auth_key=1882906137-c210396973e54324af80563658ce48c0-0-f125cb28b7727a158eaf54bbff4f435b" alt="Muhammad Aashir" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary text-sm">Muhammad Aashir</div>
                  <div className="text-xs text-accent font-medium mt-0.5">LinkedIn Member</div>
                </div>
              </div>
              <div className="pt-4 border-t border-border-light">
                <div className="flex items-center gap-2 text-xs text-text-tertiary">
                  <LinkedInIcon className="w-3.5 h-3.5 text-text-tertiary" />
                  <span>linkedin.com/in/muhammad-aashir-a8328a355</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="reveal-on-scroll text-[10px] font-bold tracking-widest uppercase text-accent mb-4 block">
                Get In Touch
              </span>
              <h2
                className="reveal-on-scroll font-geist font-semibold text-3xl sm:text-4xl tracking-tight leading-[1.15] mb-8"
                style={{ transitionDelay: "0.1s" }}
              >
                Let's work
                <br />
                <span className="text-accent">together</span>
              </h2>
              <p className="reveal-on-scroll text-base font-normal text-text-secondary leading-relaxed mb-10" style={{ transitionDelay: "0.2s" }}>
                Have a project in mind or want to collaborate? I'd love to hear from you. Drop me a message and I'll
                get back to you as soon as possible.
              </p>

              <div className="reveal-on-scroll space-y-5" style={{ transitionDelay: "0.3s" }}>
                <a
                  href="https://www.linkedin.com/in/muhammad-aashir-a8328a355/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-3 -mx-3 rounded-xl hover:bg-bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center group-hover:bg-accent transition-all">
                    <LinkedInIcon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">LinkedIn</div>
                    <div className="text-xs text-text-tertiary">Muhammad Aashir</div>
                  </div>
                </a>

                <a href="mailto:aashir.muhammad78787@gmail.com" className="flex items-center gap-4 group p-3 -mx-3 rounded-xl hover:bg-bg-secondary transition-colors">
                  <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center group-hover:bg-accent transition-all">
                    <Mail className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">Email</div>
                    <div className="text-xs text-text-tertiary">aashir.muhammad78787@gmail.com</div>
                  </div>
                </a>

                <a href="https://wa.me/923203530366" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-3 -mx-3 rounded-xl hover:bg-bg-secondary transition-colors">
                  <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center group-hover:bg-accent transition-all">
                    <img src={WHATSAPP_IMG} alt="WhatsApp" className="w-5 h-5" loading="lazy" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">WhatsApp</div>
                    <div className="text-xs text-text-tertiary">+92 320 3530366</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 group p-3 -mx-3 rounded-xl hover:bg-bg-secondary transition-colors">
                  <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center group-hover:bg-accent transition-all">
                    <MapPin className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">Location</div>
                    <div className="text-xs text-text-tertiary">Islamabad, Pakistan</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
              <form onSubmit={handleSubmit} className="bg-bg-secondary border border-border-light rounded-2xl p-8 sm:p-10 card-shadow">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2.5 block">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-focus w-full bg-white border border-border-light rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-text-tertiary"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2.5 block">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-focus w-full bg-white border border-border-light rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-text-tertiary"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-2.5 block">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-focus w-full bg-white border border-border-light rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-text-tertiary resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shine group w-full bg-accent text-white text-xs font-semibold tracking-wide uppercase py-4 px-8 rounded-xl hover-bg-accent-dark transition-colors shadow-sm flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ boxShadow: "0 8px 24px rgba(108,92,231,0.2)" }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHATSAPP FLOAT ========== */}
      <div className="fixed bottom-4 left-4 z-50 wa-float">
        <a
          href="https://wa.me/923203530366"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-border-light rounded-2xl shadow-lg hover-border-accent transition-all px-4 py-3"
        >
          <div className="wa-icon-wrap w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <img src={WHATSAPP_IMG} alt="WhatsApp" className="w-5 h-5" loading="lazy" referrerPolicy="no-referrer" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold tracking-wide uppercase text-text-tertiary">WhatsApp</div>
            <div className="text-sm font-semibold text-text-primary">+92 320 3530366</div>
          </div>
        </a>
      </div>

      {/* ========== FOOTER ========== */}
      <footer className="bg-bg-secondary border-t border-border-light py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-geist font-bold text-sm">MA</span>
                </div>
                <span className="font-geist font-semibold text-text-primary tracking-tight">Muhammad Aashir</span>
              </div>
              <p className="text-sm text-text-tertiary leading-relaxed max-w-sm">
                Building the future, one project at a time. Let's connect and create something remarkable together.
              </p>
            </div>

            <div className="md:col-span-3">
              <div className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-4">Navigation</div>
              <div className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToHash(e, link.href)}
                    className="block text-sm text-text-secondary hover-text-accent transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary mb-4">Connect</div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/muhammad-aashir-a8328a355/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-border-light rounded-xl flex items-center justify-center hover-border-accent hover:bg-accent-light transition-all shadow-sm"
                >
                  <LinkedInIcon className="w-4 h-4 text-text-secondary" />
                </a>
                <a
                  href="mailto:aashir.muhammad78787@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-border-light rounded-xl flex items-center justify-center hover:border-accent hover:bg-accent-light transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4 text-text-secondary" />
                </a>
                <a
                  href="https://wa.me/923203530366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-border-light rounded-xl flex items-center justify-center hover-border-accent hover:bg-accent-light transition-all shadow-sm"
                >
                  <img src={WHATSAPP_IMG} alt="WhatsApp" className="w-4 h-4" loading="lazy" referrerPolicy="no-referrer" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-text-tertiary">© 2026 Muhammad Aashir. All rights reserved.</div>

          </div>
        </div>
      </footer>

      {/* ========== TOAST ========== */}
      <div className={`toast fixed bottom-6 right-6 z-50 bg-white border border-accent/20 px-6 py-4 flex items-center gap-3 rounded-xl shadow-xl ${toast.show ? "show" : ""}`}>
        <div className="w-2.5 h-2.5 bg-accent rounded-full pulse-dot" />
        <span className="text-sm text-text-primary font-medium">{toast.message}</span>
      </div>
    </div>
  );
}
