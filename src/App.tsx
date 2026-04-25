import { motion } from "motion/react";
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  Wrench, 
  Home, 
  Building2, 
  Cpu, 
  Layers, 
  Globe, 
  Power, 
  Drill, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { useState, type FormEvent } from "react";

// --- Data Types ---
interface Service {
  title: string;
  description: string;
  icon: typeof Zap;
}

interface Feature {
  title: string;
  description: string;
  icon: typeof Zap;
}

// --- Content ---
const services: Service[] = [
  {
    title: "Residential Electrical",
    description: "Modern home electrical solutions, from smart home integration to complete rewiring.",
    icon: Home,
  },
  {
    title: "Commercial Electrical",
    description: "High-performance systems for offices, retail, and commercial facilities.",
    icon: Building2,
  },
  {
    title: "Service Upgrades",
    description: "Lifting your power capacity to modern standards with safety-first panel upgrades.",
    icon: Cpu,
  },
  {
    title: "Panel Installations",
    description: "Precision installation of electrical panels for total property safety.",
    icon: Layers,
  },
  {
    title: "Underground Electrical",
    description: "Specialized conduit and underground power delivery for utility-scale projects.",
    icon: Globe,
  },
  {
    title: "Utility & Rural Work",
    description: "Reliable power solutions for rural properties, utility infrastructure, and substation relay & apparatus testing.",
    icon: Power,
  },
  {
    title: "Troubleshooting",
    description: "Advanced diagnostics to detect and resolve electrical failures rapidly.",
    icon: Zap,
  },
  {
    title: "New Construction",
    description: "Complete electrical planning and execution for your building projects.",
    icon: Drill,
  },
];

const features: Feature[] = [
  {
    title: "Master Craftsmanship",
    description: "Decades of combined experience ensuring precision in every connection.",
    icon: Wrench,
  },
  {
    title: "Unwavering Integrity",
    description: "Built on faith-based principles of honesty and transparent service.",
    icon: ShieldCheck,
  },
  {
    title: "Safety First",
    description: "Rigorous testing and adherence to all local and national electrical codes.",
    icon: Zap,
  },
  {
    title: "Clear Communication",
    description: "Detailed estimates and consistent updates throughout the project lifecycle.",
    icon: MessageSquare,
  },
];

// --- Sub-components ---

const SectionHeader = ({ subtitle, title, light = false }: { subtitle: string; title: string; light?: boolean }) => (
  <div className="mb-16">
    <div className={`w-12 h-1 ${light ? 'bg-gold-500' : 'bg-black'} mb-4`}></div>
    <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${light ? 'text-gold-400' : 'text-gold-600'}`}>{subtitle}</p>
    <h2 className={`text-4xl md:text-5xl font-display font-bold tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: 'success', message: data.message || "Inquiry Sent. Our team will contact you within 24 hours." });
        setFormData({ name: "", phone: "", email: "", projectType: "", message: "" });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || "Failed to send inquiry. Please try again or call us directly." });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({ type: 'error', message: "A connection error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-gold-200 selection:text-gold-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="Kingdom Electrical Logo" 
              className="h-10 w-10 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
              referrerPolicy="no-referrer"
            />
            <div className="hidden flex items-center gap-3">
              <div className="p-1.5 bg-black rounded-sm shadow-lg shadow-black/10">
                <Zap className="text-gold-400 h-5 w-5" fill="currentColor" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-black font-display font-black text-xl tracking-tighter uppercase leading-none">Kingdom</span>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Electrical Services</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {['About', 'Services', 'Quality'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="px-6 py-2.5 bg-black text-gold-400 text-xs font-bold uppercase tracking-widest rounded-sm hover:scale-105 transition-transform active:scale-95">
              Estimate Request
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 text-white/5 pointer-events-none opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          <img 
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
            alt="Workmanship" 
            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gold-500"></div>
              <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">Built on Integrity</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter leading-[0.9]">
              Hard-Wired <br />
              <span className="text-gold-500 italic font-medium">for Reliability</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light">
              Kingdom Electrical Services LLC provides professional electrical solutions for residential, commercial, and utility projects. Serving the Four Corners Area and the entire Navajo Nation with integrity and skill.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#contact" className="px-10 py-5 bg-gold-500 text-black font-black uppercase tracking-widest text-sm hover:bg-gold-400 transition-all group">
                Request Quote <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </a>
              <a href="tel:5052152636" className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all">
                Call Our Office
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-6 hidden md:flex items-center gap-4 text-white/30">
          <span className="text-[10px] uppercase tracking-widest font-bold rotate-90 origin-left ml-2">Scroll</span>
          <div className="w-[1px] h-20 bg-white/20 relative">
            <motion.div 
              animate={{ top: [0, 60, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[3px] -left-px h-6 bg-gold-500"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2">
            <SectionHeader subtitle="Our Identity" title="Foundations of Faith & Skill." />
            <div className="mb-10 border-l-4 border-gold-200 pl-6 space-y-2">
              <p className="text-xl text-gray-700 leading-relaxed font-light italic">
                “The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.”
              </p>
              <p className="text-gold-600 font-black tracking-[0.2em] uppercase text-[10px]">
                Proverbs 11:3
              </p>
            </div>
            <p className="text-gray-500 leading-relaxed mb-10">
              Kingdom Electrical Services LLC is committed to quality workmanship, safe electrical installations, and dependable service. Our faith-based principles guide our business, ensuring that we deliver on every promise we make to our community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 border-b border-gold-500 w-fit mb-2">State Licensed</h4>
                <p className="text-sm text-gray-400">NM Lic# 418919 — Full industry certification and local compliance.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 border-b border-gold-500 w-fit mb-2">MSHA Licensed</h4>
                <p className="text-sm text-gray-400">Mine Safety and Health Administration certified.</p>
              </div>
              <div className="sm:col-span-2">
                <h4 className="font-bold text-gray-900 border-b border-gold-500 w-fit mb-2">Fully Insured and Bonded</h4>
                <p className="text-sm text-gray-400">Total protection for your property and the integrity of your projects.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-video lg:aspect-square bg-gray-100 relative overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1974&auto=format&fit=crop" 
                alt="Expertise" 
                className="w-full h-full object-cover grayscale brightness-90 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader subtitle="Expertise" title="Core Electrical Services." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white border border-gray-200 p-10 hover:border-black transition-all duration-500"
              >
                <service.icon className="text-gray-300 group-hover:text-gold-500 h-8 w-8 mb-6 transition-colors duration-500" />
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:translate-x-1 transition-transform">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 h-12 overflow-hidden items-end">{service.description}</p>
                <div className="w-0 group-hover:w-full h-0.5 bg-black transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="quality" className="py-32 bg-black px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-900/10 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeader subtitle="Why Kingdom" title="Built for the Long Run." light />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left mt-20">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-white/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all duration-500">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 bg-white px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="w-full lg:w-1/3">
            <SectionHeader subtitle="Contact" title="Start a Conversation." />
            <p className="text-gray-500 mb-12 italic leading-relaxed">Whether it's a quick repair or a multi-phase industrial build, our team is ready to respond.</p>
            
            <div className="space-y-10">
              {[
                { icon: Phone, label: "Direct Support", value: "(505) 215-2636" },
                { icon: Mail, label: "Official Email", value: "JarrydCollyer@kingdomelectricalservices.com" },
                { icon: MapPin, label: "Service Area", value: "Four Corners Area & The Navajo Nation" }
              ].map((contact) => (
                <div key={contact.label} className="flex items-center gap-5 translate-x-0 hover:translate-x-2 transition-transform">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 text-gold-600">
                    <contact.icon size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{contact.label}</span>
                    <span className="font-bold text-gray-900 border-b border-transparent hover:border-gold-500 transition-colors cursor-default">{contact.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/3 bg-gray-50 p-12 rounded-sm border border-gray-100 shadow-xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-white border border-gray-200 px-4 py-4 outline-none transition-all focus:ring-1 focus:ring-gold-500 font-medium placeholder:text-gray-200"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Phone</label>
                <input 
                  type="tel" 
                  required
                  placeholder="(000) 000-0000"
                  className="w-full bg-white border border-gray-200 px-4 py-4 outline-none transition-all focus:ring-1 focus:ring-gold-500 font-medium placeholder:text-gray-200"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-white border border-gray-200 px-4 py-4 outline-none transition-all focus:ring-1 focus:ring-gold-500 font-medium placeholder:text-gray-200"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Project Description</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe your electrical requirements..."
                  className="w-full bg-white border border-gray-200 px-4 py-4 outline-none transition-all focus:ring-1 focus:ring-gold-500 resize-none font-medium placeholder:text-gray-200"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <div className="md:col-span-2 space-y-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-black text-gold-400 font-black uppercase tracking-[0.3em] text-sm hover:bg-gold-500 hover:text-black transition-all shadow-xl shadow-black/10 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </button>

                {submitStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 text-xs font-bold uppercase tracking-widest text-center ${
                      submitStatus.type === 'success' ? 'bg-green-50/10 text-green-600 border border-green-200' : 'bg-red-50/10 text-red-600 border border-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-24 px-6 text-center overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <img 
            src="/logo.png" 
            alt="Kingdom Electrical Logo" 
            className="h-16 w-16 object-contain mb-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
            referrerPolicy="no-referrer"
          />
          <div className="hidden items-center gap-3 mb-10">
            <div className="p-1.5 bg-gold-500 rounded-sm">
              <Zap className="text-black h-5 w-5" fill="currentColor" />
            </div>
          </div>
          <span className="text-white font-display font-black text-xl tracking-tighter uppercase mb-10 block">Kingdom Electrical</span>
          
          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-12">
            <a href="#about" className="hover:text-gold-500 transition-colors">About</a>
            <a href="#services" className="hover:text-gold-500 transition-colors">Capabilities</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Safety</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Terms</a>
          </div>
          
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            © 2024 Kingdom Electrical Services LLC. All Rights Reserved. Licensed, Insured & Bonded Contractor. 
            <br />
            <span className="text-gray-800 mt-2 block italic text-[8px]">Craftsmanship Guaranteed.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
