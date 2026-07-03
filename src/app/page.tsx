import PortfolioClient from "../../components/PortfolioClient";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#0f172a] min-h-screen text-slate-50 relative">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar (Floating Pill) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0f172a]/70 backdrop-blur-xl rounded-full px-8 py-3 flex items-center gap-10 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <Link href="#/"> <h1 className="font-bold text-xl tracking-tighter text-white hidden md:block">Aditya<span className="text-purple-400">.</span></h1> </Link>
        <div className="flex space-x-6 text-sm font-medium text-slate-300">
          <Link href="#experience" className="hover:text-white transition-colors">Experience</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Main Content */}
      <PortfolioClient />

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-white/5 mt-10">
        <p>© {new Date().getFullYear()} Aditya. Built with Next.js & Fastify.</p>
      </footer>
    </main>
  );
}
