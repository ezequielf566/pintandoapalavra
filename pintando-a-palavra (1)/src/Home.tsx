import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Gamepad2, 
  Palette, 
  Printer, 
  BookOpen, 
  ShieldCheck, 
  Download, 
  Star, 
  Heart,
  Menu,
  X,
  Globe,
  Instagram,
  Facebook
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const APP_ICON_URL = "https://bancodedados-five.vercel.app/icon-512.png";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pintandoapalavra.app";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img className="h-8 w-8 rounded-lg" src={APP_ICON_URL} alt="Logo" />
              <span className="font-bold text-xl tracking-tight text-slate-900">Pintando a Palavra</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('features')} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">{t('nav.features')}</button>
              <button onClick={() => scrollToSection('safety')} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">{t('nav.safety')}</button>
              <button onClick={() => scrollToSection('about')} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">{t('nav.about')}</button>
              <Link 
                to="/generosity" 
                className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors flex items-center gap-1"
              >
                <Heart size={16} className="fill-yellow-600" />
                {t('nav.generosity')}
              </Link>
              <a 
                href={PLAY_STORE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
              >
                <Download size={18} />
                {t('nav.download')}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-slate-900 p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => scrollToSection('features')} className="block w-full text-left px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">{t('nav.features')}</button>
              <button onClick={() => scrollToSection('safety')} className="block w-full text-left px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">{t('nav.safety')}</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">{t('nav.about')}</button>
              <Link 
                to="/generosity"
                className="block w-full text-left px-3 py-2 text-yellow-600 font-medium hover:bg-yellow-50 rounded-md flex items-center gap-2"
              >
                <Heart size={16} className="fill-yellow-600" />
                {t('nav.generosity')}
              </Link>
              <a 
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer" 
                className="block w-full text-center mt-4 bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                {t('hero.cta_download')}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6 border border-indigo-100">
              <Star size={14} className="fill-indigo-700" />
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4 sm:mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-base sm:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8" />
              </a>
              <button 
                onClick={() => scrollToSection('about')}
                className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all"
              >
                {t('hero.cta_learn')}
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <ShieldCheck size={16} className="text-green-600" />
                <span>{t('safety.privacy')}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Download size={16} className="text-indigo-600" />
                <span>{t('hero.cta_download')}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Globe size={16} className="text-blue-500" />
                <span>Português, English, Español</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto lg:mr-0"
          >
            <div className="absolute inset-0 bg-indigo-600/10 blur-3xl rounded-full transform translate-y-10 scale-90"></div>
            <img 
              src={APP_ICON_URL} 
              alt="Interface do App Pintando a Palavra" 
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-[2.5rem] shadow-2xl border-8 border-white mx-auto rotate-3 hover:rotate-0 transition-transform duration-500"
            />
            
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 sm:top-10 sm:-right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[160px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                  <Palette size={20} />
                </div>
                <span className="font-bold text-slate-900">{t('hero.badge_creative_title')}</span>
              </div>
              <p className="text-xs text-slate-500">{t('hero.badge_creative_desc')}</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-4 sm:bottom-10 sm:-left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[160px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <Gamepad2 size={20} />
                </div>
                <span className="font-bold text-slate-900">{t('hero.badge_fun_title')}</span>
              </div>
              <p className="text-xs text-slate-500">{t('hero.badge_fun_desc')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{t('about.title')}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {t('about.p1')}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('about.p2')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features / 3 Pillars */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">{t('features.subtitle')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">{t('features.title')}</h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Pillar 1 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Gamepad2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('features.items.games.title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('features.items.games.desc')}
              </p>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Palette size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('features.items.painting.title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('features.items.painting.desc')}
              </p>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Printer size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('features.items.pdf.title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('features.items.pdf.desc')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                      <BookOpen size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t('features.items.stories.title')}</h3>
                    <p className="text-slate-600">
                      {t('features.items.stories.desc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                      <ShieldCheck size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t('safety.title')}</h3>
                    <p className="text-slate-600">
                      {t('safety.subtitle')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                      <Globe size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t('safety.offline')}</h3>
                    <p className="text-slate-600">
                      {t('safety.offline_desc')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-slate-900 rounded-3xl p-8 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
                <div className="relative z-10 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="text-pink-500 fill-pink-500" />
                    <span className="font-semibold text-lg">Amado pelas Famílias</span>
                  </div>
                  <blockquote className="text-2xl font-medium leading-relaxed mb-6">
                    "Finalmente um app que une diversão de qualidade com ensino bíblico genuíno. Meus filhos amam pintar as histórias que aprendem na EBD!"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">S</div>
                    <div>
                      <div className="font-semibold">Sarah M.</div>
                      <div className="text-indigo-200 text-sm">Professora da EBD</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety / Trust Section */}
      <section id="safety" className="py-20 bg-indigo-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ShieldCheck size={48} className="mx-auto text-indigo-300 mb-6" />
          <h2 className="text-3xl font-bold mb-6">{t('safety.title')}</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
            {t('safety.subtitle')}
          </p>
          <a 
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-colors"
          >
            {t('hero.cta_download')}
            <Download size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-white">
                <img className="h-8 w-8 rounded-lg" src={APP_ICON_URL} alt="Logo" />
                <span className="font-bold text-xl">Pintando a Palavra</span>
              </div>
              <p className="max-w-xs text-sm mb-6">
                {t('footer.desc')}
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/pintandoapalavra_?igsh=MTBzdjdnc2k3OG4yaQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/share/17KpHzit3c/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">App</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">{t('nav.features')}</button></li>
                <li><button onClick={() => scrollToSection('safety')} className="hover:text-white transition-colors">{t('nav.safety')}</button></li>
                <li><a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t('nav.download')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link 
                    to="/privacy"
                    onClick={() => window.scrollTo(0, 0)}
                    className="hover:text-white transition-colors"
                  >
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms"
                    onClick={() => window.scrollTo(0, 0)}
                    className="hover:text-white transition-colors"
                  >
                    {t('footer.terms')}
                  </Link>
                </li>
                <li>
                  <a href="mailto:pintandoapalavra@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                    {t('footer.contact')}
                  </a>
                </li>
                <li className="text-xs text-slate-500 mt-2">pintandoapalavra@gmail.com</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col items-center gap-4 text-sm text-center">
            <p>&copy; 2026 Pintando a Palavra<br />{t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
