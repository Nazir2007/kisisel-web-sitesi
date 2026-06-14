import React, { useState, useEffect, useRef } from 'react';

// Konu başlıkları, renkler, açıklamalar ve gerçekçi Unsplash görsel linkleri
const DATA_SECTIONS = [
  {
    id: 'dead-cells',
    title: 'Dead Cells: Cavern Biyomuna Hücum! ⚔️',
    description: 'Şu sıralar en büyük baş ağrım ve tutkum: Graveyard üzerinden o devasa kapıyı açıp Cavern biyomuna sağ salim ulaşabilmek. Lavlar, amansız tuzaklar ve o devasa boss beni beklerken her deneme ayrı bir adrenalin!',
    color: '#2e1065', // Derin Mor / Kristal Mağara Havası
    image: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?q=80&w=800&auto=format&fit=crop', // Gaming atmosferli görsel
    badge: 'Zorluk: Kabus'
  },
  {
    id: 'cpu-architecture',
    title: 'CPU Mimarisinin Derinlikleri 💻',
    description: 'İşlemcilerin o büyüleyici mantıksal dünyasındayım. Mantık kapıları (logic gates), zamanlama diyagramları, yazmaçlar (registers) ve saat döngülerinin o kusursuz senkronizasyonu... Donanımın saf matematik ve mantıkla nasıl can bulduğunu adım adım simüle ediyorum.',
    color: '#022c22', // Derin Koyu Yeşil / Matrix & Donanım Havası
    image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=800&auto=format&fit=crop', // İşlemci ve Devre Kartı
    badge: '01000011 01010000 01010101'
  },
  {
    id: 'god-of-war-ost',
    title: 'God of War OST Seansı 🪓',
    description: 'Arka planda o derin İskandinav koroları, Bear McCreary\'nin epik yaylıları ve Kratos\'un olgun ama öfkeli hikayesini anlatan melodiler yankılanıyor. Savaşın ritmi ve o ağır mitolojik atmosfer odaklanmamı maksimuma çıkarıyor.',
    color: '#4c0519', // Epik Savaş Kırmızısı
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop', // Canlı performans / Stüdyo / Atmosferik
    badge: 'Şu an Çalıyor: Ashes'
  },
  {
    id: 'gaming-news',
    title: 'Oyun Dünyasının Nabzı 🎮',
    description: 'Sektör nereye gidiyor? Hangi stüdyo neyi duyurdu, yeni remake projeleri ne durumda, hangi yapımcı çizgisini bozdu? Oyun dünyasındaki tüm büyük gelişmeleri, fragmanları ve sektörel çalkantıları çok sıkı bir şekilde radarıma aldım.',
    color: '#0f172a', // Gece Mavisi / Teknoloji Medyası Havası
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop', // Espor / Oyun Gündemi
    badge: 'Son Dakika'
  }
];

export default function App() {
  const [bgColor, setBgColor] = useState('#111827'); // Varsayılan koyu arka plan
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Scroll esnasında hangi bölümün ekranda daha baskın olduğunu tespit eden observer
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px', // Ekranın ortasına yaklaştığında tetiklenir
      threshold: 0.2
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
      className="min-h-screen text-white font-sans transition-colors duration-1000 ease-in-out selection:bg-white selection:text-black"
      style={{ backgroundColor: bgColor }}
    >
      {/* Sabit Sabit Sağ Menü (Navigasyon Noktaları) */}
      <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 bg-black/30 backdrop-blur-md p-4 rounded-full border border-white/10">
        {DATA_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id ? 'bg-white scale-150 shadow-lg shadow-white/50' : 'bg-white/40 hover:bg-white/70'
            }`}
            title={section.title}
          />
        ))}
      </nav>

      {/* Giriş Hero Alanı */}
      <header className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <span className="text-xs font-mono tracking-widest text-white/60 bg-white/10 px-3 py-1 rounded-full mb-4 animate-pulse">
          GÜNCEL DURUM RAPORU
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
          Ben Bugünlerde <br /><span className="text-yellow-400">Ne Yapıyorum?</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-xl mb-8 font-light">
          Aşağı kaydırarak zihnimin şu günlerde hangi dünyalar arasında mekik dokuduğunu interaktif renk geçişleriyle keşfet.
        </p>
        <div className="animate-bounce text-2xl text-white/50">
          ↓
        </div>
      </header>

      {/* Dinamik İçerik Bölümleri */}
      <main>
        {DATA_SECTIONS.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="min-h-screen flex items-center justify-center py-20 px-4 md:px-12 relative"
          >
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Sol Taraf: Metin İçeriği */}
              <div className="space-y-6 order-2 md:order-1">
                <span className="inline-block text-xs font-mono bg-white/10 text-white/90 px-3 py-1 rounded-md tracking-wider border border-white/10">
                  {section.badge}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                  {section.title}
                </h2>
                <p className="text-base md:text-lg text-white/80 leading-relaxed font-light">
                  {section.description}
                </p>
                
                {/* Etkileşimli Buton Eklentisi */}
                <button 
                  onClick={() => alert(`${section.title} hakkında yakında daha fazla detay eklenecek!`)}
                  className="group flex items-center gap-2 text-sm font-semibold bg-white text-black px-5 py-3 rounded-xl transition-all duration-300 hover:bg-opacity-90 active:scale-95"
                >
                  Detayları Merak Ettim
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>

              {/* Sağ Taraf: Kart ve Gerçek Fotoğraf Tasarımı */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative group w-full max-w-md aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/20">
                  {/* Arka plandaki neon parlama efekti */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                  
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-white/40 border-t border-white/5 bg-black/10">
        <p>© 2026 • Tüm Hakları Saklıdır. Renkli Kaydırma Deneyimi.</p>
      </footer>
    </div>
  );
}