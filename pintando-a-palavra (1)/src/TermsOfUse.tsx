import { FileText, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TermsOfUse() {
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
          <FileText className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-bold text-slate-900">{t('terms_of_use.title')}</h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
          <p className="text-sm text-slate-500">{t('privacy_policy.last_update')}: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('terms_of_use.acceptance_title')}</h2>
            <p>
              {t('terms_of_use.acceptance_p')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('terms_of_use.service_title')}</h2>
            <p>
              {t('terms_of_use.service_p')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('terms_of_use.usage_title')}</h2>
            <p>
              {t('terms_of_use.usage_p')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('terms_of_use.intellectual_title')}</h2>
            <p>
              {t('terms_of_use.intellectual_p1')}
            </p>
            <p>
              {t('terms_of_use.intellectual_p2')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('terms_of_use.links_title')}</h2>
            <p>
              {t('terms_of_use.links_p')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('terms_of_use.liability_title')}</h2>
            <p>
              {t('terms_of_use.liability_p')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('terms_of_use.changes_title')}</h2>
            <p>
              {t('terms_of_use.changes_p')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('privacy_policy.contact_title')}</h2>
            <p>
              {t('terms_of_use.contact_p')}
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
