import React, { useState, useEffect, useRef } from 'react';

// Daha canlı renkler, eğlenceli içerikler ve yeni görseller
const DATA_SECTIONS = [
  {
    id: 'dead-cells',
    title: 'Dead Cells: Lavlar, Tuzaklar ve Gözyaşı ⚔️',
    description: 'Şu anki ruh halim: Bir elimde kılıç, diğerinde sağlık iksiri (o da bitti bitecek). Cavern biyomundaki o lanet olası dev kapıyı bulana kadar 50 kere öldüm ama pes etmek yok! Graveyard\'dan geçerken hissettiğim o "acaba bu sefer olacak mı?" gerginliği...',
    color: '#701a75', // Canlı Neon Mor
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop', // Aksiyon / Oyun
    badge: '☠️ Zorluk: Hücre Kaybı',
    extraComponent: (
      <div className="mt-4 p-4 bg-black/40 rounded-xl border border-red-500/30">
        <div className="flex justify-between text-sm mb-1 text-red-300">
          <span>Kalan Can (Tahmini)</span>
          <span>%12</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div className="bg-red-600 h-2.5 rounded-full animate-pulse" style={{ width: '12%' }}></div>
        </div>
        <p className="text-xs text-white/50 mt-2 italic">"Yine zehirlendim..."</p>
      </div>
    )
  },
  {
    id: 'cpu-architecture',
    title: 'İşlemcinin Kalbine Yolculuk ⚡',
    description: 'Sıradan bir oyuncu olmaktan sıkılıp "Bu meret nasıl çalışıyor?" dedim. Mantık kapıları (AND, OR, NOT) ile zihnimde satranç oynuyorum. Transistörlerin o nanosaniyelik dansı, saat döngülerinin (clock cycle) kalp atışı gibi donanıma can vermesi... Kodların metale dönüştüğü o büyülü anı anlamaya çalışıyorum.',
    color: '#064e3b', // Zehir Yeşili / Matrix
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop', // İşlemci Anakart
    badge: '💻 01000011 01010000 01010101',
    extraComponent: (
      <div className="mt-4 flex items-center gap-4 p-4 bg-black/40 rounded-xl font-mono text-green-400 border border-green-500/30 overflow-hidden relative">
        {/* İşlemci atış efekti */}
        <div className="w-12 h-12 bg-green-900/50 rounded flex items-center justify-center border border-green-500 relative">
           <div className="absolute inset-0 bg-green-400 opacity-20 animate-ping rounded"></div>
           <span className="text-2xl">💾</span>
        </div>
        <div className="flex-1">
          <p className="text-xs text-green-300/70 mb-1">Clock Cycle: 4.2 GHz</p>
          <div className="text-sm truncate w-full flex gap-2">
            <span className="animate-pulse">1010</span>
            <span className="animate-pulse delay-75">1100</span>
            <span className="animate-pulse delay-150">0011</span>
            <span className="animate-pulse delay-300">1001</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'god-of-war-ost',
    title: 'Kratos\'un Öfkesi Arka Planda Çalıyor 🪓',
    description: 'Bear McCreary sen ne yaptın! O derin İskandinav koroları, çellonun damarlara işleyen hüznü... Çalışırken, kod yazarken veya sadece boşluğa bakarken arkada epik bir savaşın müziği dönüyor. "BOY!" diye bağırasım geliyor.',
    color: '#9f1239', // Kan Kırmızısı / Epik
    image: 'https://images.unsplash.com/photo-1614680376573-e36448ce98bb?q=80&w=800&auto=format&fit=crop', // Kulaklık / Müzik
    badge: '🎵 Şu An Çalıyor',
    extraComponent: (
      <div className="mt-4 p-4 bg-black/40 rounded-xl border border-red-500/20 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white">God of War (PlayStation Soundtrack)</h4>
            <p className="text-xs text-white/60">Bear McCreary • Ashes</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center animate-bounce">
            ▶️
          </div>
        </div>
        {/* Sahte Ses Dalgası */}
        <div className="flex items-end gap-1 h-8 mt-2 opacity-70">
           {[...Array(20)].map((_, i) => (
             <div 
               key={i} 
               className="w-full bg-red-400 rounded-t" 
               style={{ 
                 height: `${Math.random() * 100}%`,
                 animation: `pulse ${0.5 + Math.random()}s infinite alternate` 
               }}
             />
           ))}
        </div>
      </div>
    )
  },
  {
    id: 'gaming-news',
    title: 'Oyun Sektörünün Nabzı Bende 🎮',
    description: 'Hangi stüdyo kime satıldı? Yeni motor (engine) güncellemeleri, ertelenen AAA oyunlar, sürpriz indie hitler... Twitter (X) akışım ve haber kaynaklarım tamamen bunlarla dolu. Geliştirici röportajlarını okumak en büyük zevkim.',
    color: '#1e3a8a', // Parlak Okyanus Mavisi
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop', // Oyun Konsolu / Setup
    badge: '📰 Son Dakika',
    extraComponent: (
      <div className="mt-4 p-3 bg-blue-900/30 rounded-xl border border-blue-500/30 overflow-hidden flex items-center">
        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mr-3 whitespace-nowrap z-10 shadow-lg shadow-blue-500/50">
          FLASH
        </span>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-[marquee_10s_linear_infinite] whitespace-nowrap text-sm text-blue-200">
            Yeni nesil konsol dedikoduları sızdırıldı... Bağımsız stüdyolardan sürpriz duyurular geliyor... Yılın oyunu adayları belli olmaya başladı...
          </div>
        </div>
      </div>
    )
  }
];

export default function App() {
  const [bgColor, setBgColor] = useState('#0f172a'); // Varsayılan Başlangıç Rengi
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', 
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.getAttribute('id');
          const matched = DATA_SECTIONS.find((s) => s.id === targetId);
          if (matched) {
            setBgColor(matched.color);
            setActiveSection(matched.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="min-h-screen text-white font-sans transition-colors duration-700 ease-in-out selection:bg-white selection:text-black"
      style={{ backgroundColor: bgColor }}
    >
      {/* Kaydırma animasyonu için özel CSS (Tailwind config gerektirmesin diye inline ekledim) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* Sağ Taraf Sabit Navigasyon */}
      <nav className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-5">
        {DATA_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center justify-end gap-3"
            title={section.title}
          >
            <span className={`text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeSection === section.id ? 'opacity-100' : ''}`}>
               {section.title.split(':')[0]} {/* Sadece ilk kısmı göster */}
            </span>
            <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 border-2 border-white/20 ${
              activeSection === section.id 
              ? 'bg-white scale-150 shadow-[0_0_15px_rgba(255,255,255,0.7)]' 
              : 'bg-white/20 hover:bg-white/50'
            }`} />
          </a>
        ))}
      </nav>

      {/* Gelişmiş Hero (Giriş) Alanı */}
      <header className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        {/* Hareketli Arka Plan Desenleri */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl mix-blend-overlay animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl mix-blend-overlay"></div>
        </div>
        
        <div className="z-10 bg-black/20 p-8 md:p-16 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
            <span className="inline-block text-xs md:text-sm font-mono tracking-[0.3em] text-white/80 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            DURUM GÜNCELLEMESİ V2.0
            </span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">
            Ben Bugünlerde <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 drop-shadow-lg">
                Ne Alemdeyim?
            </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light">
            Oyunlar, donanım mimarisi ve epik müzikler arasında gidip gelen zihnimin güncel bir haritası. Aşağı kaydır ve atmosfere gir.
            </p>
        </div>

        <div className="absolute bottom-10 animate-bounce flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-sm font-mono tracking-widest">AŞAĞI KAYDIR</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
             <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Dinamik İçerik Bölümleri */}
      <main className="relative z-10 pb-20">
        {DATA_SECTIONS.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="min-h-[80vh] flex items-center justify-center py-20 px-4 md:px-16"
          >
            <div className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 transform ${
              activeSection === section.id ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-10'
            }`}>
              
              {/* Sol Taraf: Metin ve Eğlenceli İçerikler */}
              <div className={`space-y-6 order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="inline-block">
                  <span className="text-sm font-bold bg-white text-black px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    {section.badge}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
                  {section.title}
                </h2>
                <p className="text-lg text-white/80 leading-relaxed font-medium">
                  {section.description}
                </p>
                
                {/* Her konuya özel eğlenceli ekstra içerik */}
                {section.extraComponent}

              </div>

              {/* Sağ Taraf: Glassmorphism Kartlı Görsel */}
              <div className={`order-1 flex justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <div className="relative group w-full max-w-lg">
                  {/* Kartın arkasındaki renkli parlama efekti */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/0 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 bg-black/40 shadow-2xl backdrop-blur-sm p-2">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover rounded-2xl transform transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Görselin üzerine hafif bir vignette/gölge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        ))}
      </main>

    </div>
  );
}