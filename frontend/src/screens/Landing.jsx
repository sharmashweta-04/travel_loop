import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Wallet, ListChecks, Calendar, Search, Users, FileText, BarChart2, Share2, CheckCircle2, Heart, Download } from 'lucide-react';

const Landing = () => {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-6');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-pageBg font-sans overflow-x-hidden">
      
      {/* SECTION 2: HERO */}
      <section className="relative w-full h-[calc(100vh-72px)] min-h-[600px] flex items-center bg-hero-gradient pt-8 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent pointer-events-none"></div>
        
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-[55%_45%] items-center relative z-10 gap-12">
          
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center bg-[#E8F5F0] text-primary-600 font-sans font-semibold text-[12px] px-4 py-1.5 rounded-full mb-6 tracking-wide">
              ✦ All-in-one travel planning
            </div>
            
            <h1 className="font-sans font-extrabold text-[48px] md:text-[64px] text-textPrimary leading-[1.05] tracking-[-0.02em] mb-6">
              Plan smarter.<br />Travel better.
            </h1>
            
            <p className="font-sans font-normal text-[18px] text-[#2A2A2A] max-w-[480px] mb-8 leading-relaxed">
              Create detailed itineraries, track your budget, build packing lists, and share your adventures with the world. All in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              <Link to="/register" className="bg-[#1A1A1A] hover:bg-black text-white px-8 py-3.5 rounded-full font-sans font-semibold text-[15px] transition-transform hover:scale-[1.02] flex items-center justify-center">
                Start planning <span className="ml-2">→</span>
              </Link>
              <a href="#features" className="text-[#4A4A4A] font-sans font-medium text-[14px] hover:underline underline-offset-4">
                See features ↓
              </a>
            </div>
            
            <p className="font-inter font-normal text-[13px] text-[#666666]">
              Free forever · No credit card required
            </p>
          </div>

          <div className="hidden lg:flex justify-center relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            {/* Phone Mockup */}
            <div className="w-[280px] h-[560px] bg-[#1A1A1A] rounded-[44px] border-[3px] border-[#333] shadow-mockup relative overflow-hidden transform -rotate-2">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20"></div>
              
              <div className="absolute inset-0 bg-pageBg pt-12 flex flex-col">
                <div className="px-5 mb-4 flex justify-between items-center">
                  <h3 className="font-sans font-bold text-lg text-textPrimary">Discover</h3>
                  <div className="flex gap-3 text-textPrimary">
                    <Search className="h-4 w-4" />
                    <Heart className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex gap-3 px-5 pb-4 overflow-x-hidden hide-scrollbar">
                  {[1,2].map(i => (
                    <div key={i} className="min-w-[140px] h-32 bg-white rounded-xl shadow-sm relative overflow-hidden flex-shrink-0 group">
                      <img src={`https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80`} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="destination" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white font-bold text-sm drop-shadow-md">Tokyo</p>
                        <span className="bg-white/90 backdrop-blur-sm text-textPrimary text-[10px] px-2 py-0.5 rounded-full font-inter font-medium mt-1 inline-block">One Stop</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-5 mt-2 flex-grow">
                  <h4 className="font-sans font-semibold text-[14px] text-textPrimary mb-3">Destinations In India</h4>
                  <div className="space-y-3">
                    {[1,2].map(i => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gray-200 rounded-[8px] overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&q=80" className="w-full h-full object-cover" alt="India" />
                        </div>
                        <div className="flex-1">
                          <p className="font-sans font-bold text-sm text-textPrimary leading-tight">Jaipur</p>
                          <p className="font-inter font-medium text-[10px] text-textMuted">India</p>
                        </div>
                        <Download className="h-4 w-4 text-primary-600" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="h-14 bg-white border-t border-gray-100 flex justify-between items-center px-6">
                  <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                  <div className="h-5 w-5 rounded-full bg-primary-600"></div>
                  <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                  <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                  <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: TRUST BAR */}
      <section className="bg-white border-y border-[#E8E2D9] py-6 px-6 md:px-20 overflow-x-auto hide-scrollbar">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between min-w-[700px]">
          <div className="flex items-center gap-2 font-inter font-medium text-[14px] text-[#4A4A4A]">
            <span className="text-primary-600 text-lg">🗺</span> Multi-city itineraries
          </div>
          <div className="w-px h-4 bg-[#E8E2D9]"></div>
          <div className="flex items-center gap-2 font-inter font-medium text-[14px] text-[#4A4A4A]">
            <span className="text-primary-600 text-lg">💰</span> Budget tracking
          </div>
          <div className="w-px h-4 bg-[#E8E2D9]"></div>
          <div className="flex items-center gap-2 font-inter font-medium text-[14px] text-[#4A4A4A]">
            <span className="text-primary-600 text-lg">🎒</span> Packing checklists
          </div>
          <div className="w-px h-4 bg-[#E8E2D9]"></div>
          <div className="flex items-center gap-2 font-inter font-medium text-[14px] text-[#4A4A4A]">
            <span className="text-primary-600 text-lg">👥</span> Community sharing
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURES GRID */}
      <section id="features" className="bg-white py-24 px-6 md:px-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="font-inter font-semibold text-[11px] text-primary-600 tracking-[0.1em] uppercase mb-4 animate-on-scroll opacity-0 translate-y-6 transition-all duration-500">
            Everything you need
          </p>
          <h2 className="font-sans font-bold text-[32px] md:text-[40px] text-textPrimary leading-[1.1] mb-6 animate-on-scroll opacity-0 translate-y-6 transition-all duration-500 delay-100">
            Plan smarter. Travel better.
          </h2>
          <p className="font-sans font-normal text-[18px] text-[#4A4A4A] max-w-[560px] mx-auto mb-14 animate-on-scroll opacity-0 translate-y-6 transition-all duration-500 delay-200">
            Traveloop brings all your travel scattered documents, links, and spreadsheets into one beautiful workspace.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              { icon: MapPin, title: "Multi-City Itinerary Builder", body: "Add unlimited stops, assign dates and activities to each city, and reorder your journey with ease." },
              { icon: Wallet, title: "Smart Budget Tracking", body: "Set a trip budget, log expenses by category, and get visual breakdowns so you never overspend." },
              { icon: ListChecks, title: "Packing Checklist", body: "Build custom packing lists per trip, check off items as you pack, and reuse them for future travels." },
              { icon: Calendar, title: "Day-wise Trip Planning", body: "Organize every day of your trip with activities, timings, and cost estimates in a clean timeline view." },
              { icon: Search, title: "City & Activity Search", body: "Discover destinations and things to do filtered by country, budget, type, and popularity." },
              { icon: Users, title: "Community & Sharing", body: "Share your itineraries publicly, get inspired by other travelers, and copy trips you love." },
              { icon: FileText, title: "Trip Notes & Journal", body: "Jot down reminders, hotel details, and day-specific notes tied to each stop of your journey." },
              { icon: BarChart2, title: "Expense Reports", body: "Download detailed invoice-style reports of your trip spend, broken down by category and day." },
              { icon: Share2, title: "Public Trip Links", body: "Generate a shareable link to your itinerary — read-only, no login required for your guests." }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-[#E8E2D9] rounded-[16px] p-7 hover:border-primary-600 hover:-translate-y-1 transition-all duration-200 animate-on-scroll opacity-0 translate-y-6"
                style={{ transitionDelay: `${Math.min(idx * 80, 500)}ms` }}
              >
                <div className="w-12 h-12 bg-[#E8F5F0] rounded-[14px] flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-sans font-semibold text-[17px] text-textPrimary mb-2">{feature.title}</h3>
                <p className="font-sans font-normal text-[14px] text-[#4A4A4A] leading-[1.65] mb-4">{feature.body}</p>
                <Link to="/register" className="font-inter font-medium text-[13px] text-primary-600 hover:underline">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: SPOTLIGHT 1 */}
      <section className="bg-pageBg py-24 px-6 md:px-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700">
            <div className="inline-block bg-primary-600 text-white font-inter font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Itinerary Builder
            </div>
            <h2 className="font-sans font-bold text-[36px] text-textPrimary leading-[1.1] mb-6">
              Build your perfect route, stop by stop.
            </h2>
            <p className="font-sans font-normal text-[16px] text-[#4A4A4A] mb-8 leading-relaxed">
              Design complex multi-city trips visually. Our builder lets you outline your entire journey so you always know where you're heading next.
            </p>
            <ul className="space-y-4">
              {['Add cities and dates for each stop', 'Assign activities per day with cost estimates', 'Reorder stops instantly'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-sans font-medium text-[15px] text-[#4A4A4A]">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-200 flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-50 rounded-full blur-[80px] -z-10"></div>
            
            <div className="bg-white rounded-[16px] shadow-mockup p-6 w-full max-w-[420px] transform rotate-2">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                <div className="flex-1 space-y-3">
                  <div className="h-10 border border-gray-200 rounded-[10px] px-3 flex items-center bg-gray-50 text-sm text-gray-500"><MapPin className="h-4 w-4 mr-2"/> Tokyo</div>
                  <div className="flex gap-2">
                    <div className="h-10 border border-gray-200 rounded-[10px] flex-1 flex items-center px-3 bg-gray-50 text-sm text-gray-500"><Calendar className="h-4 w-4 mr-2"/> 12 May</div>
                    <div className="h-10 border border-gray-200 rounded-[10px] flex-1 flex items-center px-3 bg-gray-50 text-sm text-gray-500"><Calendar className="h-4 w-4 mr-2"/> 16 May</div>
                  </div>
                  <div className="h-20 border border-gray-200 rounded-[10px] p-3 bg-gray-50 text-sm text-gray-400">Activity details...</div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-primary-50 text-primary-600 text-xs rounded-full border border-primary-200">Sightseeing</div>
                    <div className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full border border-gray-200">Food</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: SPOTLIGHT 2 (Reverse) */}
      <section className="bg-white py-24 px-6 md:px-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 flex justify-center">
            <div className="bg-white rounded-[16px] shadow-mockup p-6 w-full max-w-[380px] transform -rotate-2 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Wallet className="h-5 w-5 text-primary-600"/> Trip Budget</h3>
              <div className="w-40 h-40 mx-auto rounded-full border-[16px] border-primary-600 border-r-amber-400 border-b-emerald-400 flex items-center justify-center mb-6">
                <div className="text-center">
                  <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
                  <p className="text-xl font-bold text-gray-900">$2,450</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary-600 rounded-full"></div>Stay</div><span className="font-bold">$1,200</span></div>
                <div className="flex justify-between items-center text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-400 rounded-full"></div>Food</div><span className="font-bold">$850</span></div>
                <div className="flex justify-between items-center text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-400 rounded-full"></div>Activities</div><span className="font-bold">$400</span></div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-200">
            <div className="inline-block bg-primary-600 text-white font-inter font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Budget & Expenses
            </div>
            <h2 className="font-sans font-bold text-[36px] text-textPrimary leading-[1.1] mb-6">
              Know exactly where your money goes.
            </h2>
            <p className="font-sans font-normal text-[16px] text-[#4A4A4A] mb-8 leading-relaxed">
              Travel shouldn't mean financial stress. Keep track of every dollar spent across categories and generate beautiful reports.
            </p>
            <ul className="space-y-4">
              {['Set total budget per trip', 'Visual breakdown by Transport, Stay, Food', 'Download invoice-ready expense reports'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-sans font-medium text-[15px] text-[#4A4A4A]">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 7: SPOTLIGHT 3 */}
      <section className="bg-pageBg py-24 px-6 md:px-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700">
            <div className="inline-block bg-primary-600 text-white font-inter font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Community
            </div>
            <h2 className="font-sans font-bold text-[36px] text-textPrimary leading-[1.1] mb-6">
              Get inspired. Share your journey.
            </h2>
            <p className="font-sans font-normal text-[16px] text-[#4A4A4A] mb-8 leading-relaxed">
              Explore a global directory of public itineraries. Find your next dream vacation and instantly copy the route to your own account.
            </p>
            <ul className="space-y-4">
              {['Browse public itineraries from real travelers', 'Copy any trip as your own starting point', 'Share your plans with a public link'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-sans font-medium text-[15px] text-[#4A4A4A]">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-200">
            <div className="space-y-4 max-w-[400px] mx-auto relative z-10">
              {[1,2,3].map((i) => (
                <div key={i} className={`bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 flex gap-4 items-center ${i===2 ? 'transform translate-x-4 shadow-md' : ''}`}>
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-bold">Alex Walker</p>
                    <p className="font-bold text-gray-900 leading-tight">10 Days in Kyoto</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-medium">Culture</span>
                      <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-medium">4 Stops</span>
                    </div>
                  </div>
                  <div className="text-red-400"><Heart className="h-5 w-5 fill-current"/></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: PACKING + NOTES */}
      <section className="bg-white py-20 px-6 md:px-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="bg-[#F5F0E8] rounded-[20px] p-10 animate-on-scroll opacity-0 translate-y-6 transition-all duration-700">
            <ListChecks className="h-12 w-12 text-primary-600 mb-6" />
            <h3 className="font-sans font-bold text-[24px] text-textPrimary mb-3">Packing Checklist</h3>
            <p className="font-sans font-normal text-[15px] text-[#4A4A4A] mb-8">Never forget your passport again. Create segmented lists and check them off.</p>
            
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-3"><div className="w-5 h-5 bg-primary-600 rounded flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white"/></div><span className="text-sm text-gray-400 line-through">Passports</span></div>
              <div className="flex items-center gap-3"><div className="w-5 h-5 bg-primary-600 rounded flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white"/></div><span className="text-sm text-gray-400 line-through">Travel Adapter</span></div>
              <div className="flex items-center gap-3"><div className="w-5 h-5 border-2 border-gray-300 rounded"></div><span className="text-sm text-gray-700">Camera</span></div>
            </div>
          </div>

          <div className="bg-[#E8F5F0] rounded-[20px] p-10 animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-100">
            <FileText className="h-12 w-12 text-primary-600 mb-6" />
            <h3 className="font-sans font-bold text-[24px] text-textPrimary mb-3">Trip Notes</h3>
            <p className="font-sans font-normal text-[15px] text-[#4A4A4A] mb-8">Store booking links, confirmation codes, and random ideas in a dedicated journal.</p>
            
            <div className="bg-[#FEFCE8] rounded-xl p-5 shadow-sm border border-[#FEF08A] h-[132px] relative">
              <div className="absolute top-4 left-4 right-4 border-b border-[#FEF08A] h-6"></div>
              <div className="absolute top-10 left-4 right-4 border-b border-[#FEF08A] h-6"></div>
              <div className="absolute top-16 left-4 right-4 border-b border-[#FEF08A] h-6"></div>
              <p className="relative z-10 font-sans text-sm text-gray-800 italic pt-1">Remember to book the bullet train tickets on Tuesday!</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9: SOCIAL PROOF */}
      <section className="bg-[#1A1A1A] py-20 px-6 text-white text-center">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-center items-center gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          <div className="px-12 py-6 md:py-0 w-full md:w-1/3">
            <p className="font-sans font-extrabold text-[48px] leading-none mb-2">15+</p>
            <p className="font-inter font-normal text-[14px] text-[#AAAAAA]">Dynamic Screens</p>
          </div>
          <div className="px-12 py-6 md:py-0 w-full md:w-1/3">
            <p className="font-sans font-extrabold text-[48px] leading-none mb-2">Multi</p>
            <p className="font-inter font-normal text-[14px] text-[#AAAAAA]">City Planning</p>
          </div>
          <div className="px-12 py-6 md:py-0 w-full md:w-1/3">
            <p className="font-sans font-extrabold text-[48px] leading-none mb-2">Free</p>
            <p className="font-inter font-normal text-[14px] text-[#AAAAAA]">To Use Forever</p>
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="bg-hero-gradient py-24 px-6 md:px-20 text-center relative overflow-hidden">
        <div className="max-w-[800px] mx-auto relative z-10 animate-on-scroll opacity-0 translate-y-6 transition-all duration-700">
          <h2 className="font-sans font-extrabold text-[48px] text-[#1A1A1A] leading-[1.1] tracking-[-0.02em] mb-6">
            Start planning your next adventure.
          </h2>
          <p className="font-sans font-normal text-[18px] text-[#2A2A2A] mb-10">
            Join the community of travelers building perfect itineraries.
          </p>
          <Link to="/register" className="inline-flex bg-[#1A1A1A] hover:bg-black text-white px-10 h-[52px] rounded-full font-sans font-semibold text-[16px] items-center justify-center transition-transform hover:scale-[1.02]">
            Get started for free <span className="ml-2">→</span>
          </Link>
          <p className="font-inter font-medium text-[13px] text-[#4A4A4A] mt-6">
            No sign-up required to explore · Free forever
          </p>
        </div>
      </section>

      {/* SECTION 11: FOOTER */}
      <footer className="bg-[#1A1A1A] text-white py-12 px-6 md:px-20 border-t border-[#333]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-6 w-6 text-primary-500" />
              <span className="text-[18px] font-bold font-sans tracking-tight">Traveloop</span>
            </div>
            <p className="text-[#AAAAAA] text-sm font-sans mb-6">Journey flawlessly with the ultimate travel planner workspace.</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition">X</div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition">in</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold font-sans text-lg mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-[#AAAAAA] font-inter">
              <li><Link to="/" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link to="/trips" className="hover:text-white transition">My Trips</Link></li>
              <li><Link to="/search" className="hover:text-white transition">Search</Link></li>
              <li><Link to="/community" className="hover:text-white transition">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold font-sans text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-[#AAAAAA] font-inter">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">How it works</a></li>
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
            </ul>
          </div>
          
          <div>
            <div className="bg-primary-600 rounded-[16px] p-6 text-center">
              <h4 className="font-bold font-sans text-white mb-2">Ready to go?</h4>
              <p className="text-white/80 text-sm mb-4">Create your first itinerary today.</p>
              <Link to="/plan" className="block w-full bg-white text-primary-900 font-bold text-sm py-2 rounded-lg hover:bg-gray-100 transition">Start Planning</Link>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-inter text-[#AAAAAA]">
          <p>© {new Date().getFullYear()} Traveloop</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
