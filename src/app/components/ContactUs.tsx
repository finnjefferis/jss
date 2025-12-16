"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Copy, MessageCircle, ArrowRight, Star, ChevronDown, Loader2, Send, Mail } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "Website Project",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simulate Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", inquiry: "Website Project", message: "" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@jefferissoftware.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReviewVisible(true);
          if (reviewRef.current) observer.unobserve(reviewRef.current);
        }
      },
      { threshold: 0.2 }
    );
    if (reviewRef.current) observer.observe(reviewRef.current);
    return () => {
        if (reviewRef.current) observer.unobserve(reviewRef.current);
    };
  }, []);

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-white overflow-hidden">
      
      {/* Background Decor */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[90%] bg-gradient-to-b from-indigo-50/60 to-transparent blur-3xl opacity-60" />
      
      <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10 flex flex-col items-center">
        
        {/* === TOP ROW: WIDE TEXT === */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Ready to start?
          </p>

          <h2 className="text-5xl font-bold leading-tight text-zinc-900 md:text-6xl lg:text-7xl mb-6">
            Stop chasing leads. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Let's clear the chaos.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            You don't need another generic agency. You need a partner who speaks your language. 
            Let's build a system that brings you work while you sleep.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
             <StepPill text="1. Quick Chat" />
             <StepPill text="2. Fixed Proposal" />
             <StepPill text="3. Launch & Grow" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 uppercase tracking-wide">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Accepting projects for {new Date().toLocaleString('default', { month: 'long' })}
          </div>
        </div>


        {/* === BOTTOM ROW: WIDE SPLIT CARD === */}
        <div className="w-full relative">
          <div className="absolute -inset-1 bg-gradient-to-b from-indigo-100 to-transparent rounded-[2.5rem] blur-xl opacity-70 -z-10" />
          
          <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white p-8 md:p-12 shadow-2xl shadow-indigo-500/10">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              
              {/* === LEFT COL: TRUST & SPEED (Review + WhatsApp + Email) === */}
              <div className="flex flex-col h-full">
                
                {/* 1. Review (Social Proof) */}
                <div ref={reviewRef} className="mb-10 bg-zinc-50/50 p-6 rounded-3xl border border-zinc-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                   
                   </div>

                   <div className="flex items-center gap-3 mb-3 relative z-10">
                      <div className="h-10 w-10 rounded-full bg-[#EF6C00] flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-orange-100">K</div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 leading-none">Karl Couling</p>
                        <div className="flex items-center gap-2 mt-1.5">
                           <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 fill-amber-400 text-amber-400 ${isReviewVisible ? 'animate-in zoom-in-50 fade-in duration-300' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }} />
                              ))}
                           </div>
                           <span className="text-[10px] text-zinc-400 font-medium">New</span>
                        </div>
                      </div>
                   </div>
                   <p className="text-sm text-zinc-600 leading-relaxed italic relative z-10">
                     &quot;JSS have done a great job at updating my website. I have asked them to manage the social media also. Good service&quot;
                   </p>
                </div>

                {/* 2. WhatsApp (Speed) */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3 px-1">
                     <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Fastest Response</p>
                     <span className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-emerald-700 uppercase">Online</span>
                     </span>
                  </div>
                  <a
                    href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I%27d%20like%20to%20discuss%20a%20project."
                    className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-6 py-5 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <MessageCircle className="h-6 w-6 fill-white/20" />
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="h-5 w-5 opacity-50 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
                  </a>
                </div>

                {/* 3. Email (Copy) */}
                <div className="mt-auto">
                   <div className="flex items-center gap-4 mb-3">
                      <div className="h-px bg-zinc-100 flex-1" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">Or Email Me</span>
                      <div className="h-px bg-zinc-100 flex-1" />
                   </div>
                   
                   <div className="group flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-1.5 transition-colors hover:border-indigo-200 hover:bg-white">
                     <div className="h-10 w-10 flex items-center justify-center bg-white rounded-lg border border-zinc-200 shadow-sm text-zinc-400 group-hover:text-indigo-600 transition-colors">
                        <Mail className="h-5 w-5" />
                     </div>
                     <span className="flex-1 text-sm font-semibold text-zinc-700 px-2">hello@jefferissoftware.co.uk</span>
                     <button 
                       onClick={handleCopyEmail}
                       className="h-10 px-4 flex items-center gap-2 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-500 shadow-sm hover:text-indigo-600 hover:border-indigo-200 active:scale-95 transition-all"
                     >
                       {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                       {copied ? "Copied" : "Copy"}
                     </button>
                   </div>
                </div>

              </div>

              {/* === RIGHT COL: THE FORM (Detailed Inquiry) === */}
              <div className="relative">
                {/* Vertical Divider Line (Desktop only) */}
                <div className="hidden lg:block absolute -left-10 top-10 bottom-10 w-px bg-zinc-100" />

                <div className="h-full flex flex-col justify-center">
                  <div className="mb-6">
                     <h3 className="text-2xl font-bold text-zinc-900">Project Inquiry</h3>
                     <p className="text-sm text-zinc-500 mt-1">Tell me a bit about what you need.</p>
                  </div>

                  {isSubmitted ? (
                     <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 p-12 text-center h-[400px]">
                        <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                            <Send className="h-8 w-8" />
                        </div>
                        <h4 className="text-zinc-900 font-bold text-xl">Message Sent!</h4>
                        <p className="text-zinc-600 mt-2 mb-6 max-w-[200px]">Thanks {formData.name}, I'll be in touch shortly.</p>
                        <button 
                          onClick={() => setIsSubmitted(false)} 
                          className="px-6 py-2 rounded-full bg-white border border-zinc-200 text-sm font-bold text-zinc-600 shadow-sm hover:border-zinc-300"
                        >
                          Start New Form
                        </button>
                     </div>
                  ) : (
                     <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label htmlFor="name" className="text-xs font-bold text-zinc-700 ml-1">Name</label>
                            <input 
                              id="name"
                              required
                              type="text" 
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="email" className="text-xs font-bold text-zinc-700 ml-1">Email</label>
                            <input 
                              id="email"
                              required
                              type="email" 
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                           <label htmlFor="inquiry" className="text-xs font-bold text-zinc-700 ml-1">I'm interested in...</label>
                           <div className="relative">
                             <select 
                               id="inquiry"
                               value={formData.inquiry}
                               onChange={(e) => setFormData({...formData, inquiry: e.target.value})}
                               className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
                             >
                               <option>Website Project</option>
                               <option>Social Media Growth</option>
                               <option>Software / Platform</option>
                               <option>Other Inquiry</option>
                             </select>
                             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                           </div>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="message" className="text-xs font-bold text-zinc-700 ml-1">Tell me about your project</label>
                          <textarea 
                            id="message"
                            required
                            rows={4}
                            placeholder="I need a new website for my..."
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                          />
                        </div>

                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-900/10 transition-all hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                          {isSubmitting ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <>
                              Send Inquiry <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                     </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function StepPill({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold text-zinc-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/50">
      <Check className="h-4 w-4 text-indigo-600" />
      <span>{text}</span>
    </div>
  );
}