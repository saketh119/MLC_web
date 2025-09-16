import { Mail, Linkedin, Instagram, Github, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Email */}
        <div className="text-gray-400 text-sm flex items-center gap-2">
          <Mail size={16} className="text-gray-500" />
          <a
            href="mailto:ml.club@vitap.ac.in"
            className="hover:text-gray-200 transition-colors"
          >
            ml.club@vitap.ac.in
          </a>
        </div>

        {/* Social Media */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Youtube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
