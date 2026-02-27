import { ShieldCheck, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <Link 
          to="/"
          className="flex items-center gap-2 text-indigo-600 font-medium mb-8 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft size={20} />
          {t('privacy_policy.back')}
        </Link>

        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
          <ShieldCheck className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-bold text-slate-900">{t('privacy_policy.title')}</h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
          <p className="text-sm text-slate-500">{t('privacy_policy.last_update')}: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('privacy_policy.intro_title')}</h2>
            <p>
              {t('privacy_policy.intro_p')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('privacy_policy.data_title')}</h2>
            <div className="space-y-4">
              <p>
                {t('privacy_policy.data_p1')}
              </p>
              <p>
                {t('privacy_policy.data_p2')}
              </p>
              <p>
                {t('privacy_policy.data_p3')}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('privacy_policy.ads_title')}</h2>
            <p>
              {t('privacy_policy.ads_p')}
            </p>
            <div className="mt-4 space-y-4">
              <p>{t('privacy_policy.ads_item1')}</p>
              <p>{t('privacy_policy.ads_item2')}</p>
              <p>{t('privacy_policy.ads_item3')}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('privacy_policy.perms_title')}</h2>
            <p>
              {t('privacy_policy.perms_p')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('privacy_policy.share_title')}</h2>
            <p>
              {t('privacy_policy.share_p')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('privacy_policy.global_title')}</h2>
            <p>
              {t('privacy_policy.global_p')}
            </p>
            <div className="mt-4 space-y-4">
              <p><strong>LGPD (Brasil):</strong> Lei Geral de Proteção de Dados.</p>
              <p><strong>COPPA (EUA):</strong> Children's Online Privacy Protection Act.</p>
              <p><strong>GDPR (Europa):</strong> Regulamento Geral sobre a Proteção de Dados.</p>
              <p><strong>CCPA (Califórnia):</strong> California Consumer Privacy Act.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('privacy_policy.contact_title')}</h2>
            <p>
              Se você tiver alguma dúvida sobre nossa Política de Privacidade, entre em contato conosco:
            </p>
            <div className="flex items-center gap-2 mt-2 text-indigo-600 font-medium">
              <Mail size={18} />
              <a href="mailto:pintandoapalavra@gmail.com">pintandoapalavra@gmail.com</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
