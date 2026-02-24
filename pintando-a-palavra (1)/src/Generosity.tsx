import { Heart, ChevronLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const platforms = [
  {
    name: 'Vakinha',
    icon: '🇧🇷',
    url: 'https://www.vakinha.com.br',
    description: 'Maior site de doações online do Brasil.'
  },
  {
    name: 'GoFundMe',
    icon: '🌍',
    url: 'https://www.gofundme.com',
    description: 'Plataforma global para arrecadação de fundos.'
  },
  {
    name: 'GiveSendGo',
    icon: '✝️',
    url: 'https://www.givesendgo.com',
    description: 'Plataforma de crowdfunding cristã líder mundial.'
  },
  {
    name: 'GlobalGiving',
    icon: '🏛️',
    url: 'https://www.globalgiving.org',
    description: 'Conectando doadores a projetos comunitários em todo o mundo.'
  }
];

export default function Generosity() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-yellow-50 font-sans text-slate-900 pb-8">
      {/* App Header */}
      <div className="bg-yellow-400 px-4 py-3 sticky top-0 z-10 flex items-center gap-3 shadow-sm">
        <Link to="/" className="p-2 -ml-2 text-yellow-950 hover:bg-yellow-500/20 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold text-yellow-950">{t('generosity.title')}</h1>
      </div>

      <div className="max-w-md mx-auto">
        {/* Intro Card */}
        <div className="bg-yellow-300 p-6 m-4 rounded-2xl shadow-sm text-center border border-yellow-400">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Heart size={28} className="text-yellow-600 fill-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-yellow-950 mb-2">{t('generosity.quote')}</h2>
          <p className="text-yellow-950/80 text-sm leading-relaxed font-medium">
            {t('generosity.platforms_title')}
          </p>
        </div>

        {/* Platforms List */}
        <div className="px-4 space-y-3">
          <h3 className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-2 ml-1">
            {t('generosity.platforms_title')}
          </h3>
          
          {platforms.map((platform) => (
            <div key={platform.name} className="bg-white rounded-xl p-4 shadow-sm border border-yellow-100">
              <div className="flex items-start gap-4 mb-3">
                <div className="text-3xl bg-yellow-50 w-12 h-12 flex items-center justify-center rounded-xl border border-yellow-100">
                  {platform.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900">{platform.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{platform.description}</p>
                </div>
              </div>
              
              <a 
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-yellow-400 text-yellow-950 py-2.5 rounded-lg font-bold text-sm hover:bg-yellow-500 transition-colors"
              >
                <ExternalLink size={14} />
                {t('generosity.visit_site')}
              </a>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 px-8 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('generosity.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
}
