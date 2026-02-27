import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      nav: {
        features: "Recursos",
        safety: "Segurança",
        about: "Sobre",
        generosity: "Generosidade",
        download: "Baixar App"
      },
      hero: {
        badge: "Educação Cristã & Diversão",
        title: "A Bíblia ganha vida através da arte e do brincar",
        subtitle: "Um aplicativo seguro e educativo projetado para ajudar crianças a descobrir as histórias bíblicas de forma interativa e criativa.",
        cta_download: "Baixar no Google Play",
        cta_learn: "Conhecer Recursos",
        badge_creative_title: "Criativo",
        badge_creative_desc: "Pintura digital para pequenos artistas",
        badge_fun_title: "Divertido",
        badge_fun_desc: "Minijogos bíblicos educativos"
      },
      features: {
        title: "Tudo o que seu filho precisa para aprender brincando",
        subtitle: "Recursos pensados para estimular a criatividade e o conhecimento bíblico.",
        items: {
          games: {
            title: "Minijogos Bíblicos",
            desc: "Desafios divertidos que ensinam valores e histórias das Escrituras."
          },
          painting: {
            title: "Pintura Digital",
            desc: "Ferramentas de arte para colorir personagens e cenas marcantes da Bíblia."
          },
          pdf: {
            title: "Atividades em PDF",
            desc: "Materiais exclusivos para imprimir e fazer atividades em família ou na igreja."
          },
          stories: {
            title: "Histórias Ilustradas",
            desc: "Narrativas visuais que facilitam a compreensão da Palavra de Deus."
          }
        }
      },
      safety: {
        title: "Segurança em primeiro lugar",
        subtitle: "Tranquilidade para os pais, diversão segura para os filhos.",
        no_ads: "Sem anúncios invasivos",
        no_ads_desc: "Publicidade restrita e adequada para a faixa etária, seguindo as normas do Google Play.",
        privacy: "Privacidade Total",
        privacy_desc: "Não coletamos dados pessoais. O ambiente é 100% focado na experiência da criança.",
        offline: "Acesso Offline",
        offline_desc: "Muitos recursos funcionam sem internet, garantindo segurança em qualquer lugar."
      },
      about: {
        title: "Nossa Missão",
        p1: "O Pintando a Palavra nasceu do desejo de unir tecnologia e fé, oferecendo uma alternativa saudável de entretenimento para a nova geração.",
        p2: "Acreditamos que a arte é uma das formas mais poderosas de fixar o aprendizado. Por isso, criamos um espaço onde a criança não apenas consome conteúdo, mas interage e cria a partir das verdades bíblicas.",
        stats: {
          users: "Crianças Impactadas",
          rating: "Avaliação Média",
          content: "Atividades Disponíveis"
        }
      },
      footer: {
        desc: "Ajudando crianças a descobrir a Bíblia através da tecnologia, arte e brincadeira.",
        legal: "Contato & Legal",
        privacy: "Política de Privacidade",
        terms: "Termos de Uso",
        contact: "Fale Conosco",
        rights: "Todos os direitos reservados."
      },
      generosity: {
        title: "Generosidade",
        subtitle: "Pratique a Generosidade",
        desc: "Se você desejar, conheça algumas plataformas onde é possível apoiar causas ao redor do mundo.",
        platforms: "Plataformas Conhecidas",
        visit: "Visitar site oficial",
        disclaimer: "Este aplicativo não possui vínculo ou parceria com as plataformas mencionadas. Os links levam para sites externos."
      },
      privacy_policy: {
        title: "Política de Privacidade",
        back: "Voltar para o Início",
        last_update: "Última atualização",
        intro_title: "1. Introdução",
        intro_p: "Agradecemos por escolher o aplicativo Pintando a Palavra. Levamos a sua privacidade e a segurança dos dados de seus filhos muito a sério.",
        data_title: "2. Coleta de Dados e Privacidade Infantil",
        data_p1: "O Pintando a Palavra é projetado para famílias e crianças (faixa etária de 9 a 12 anos e classificação livre).",
        data_p2: "Nós não coletamos intencionalmente informações pessoais identificáveis (como nome, endereço, e-mail ou número de telefone) de crianças.",
        data_p3: "O aplicativo não solicita cadastro, login, nem acesso a dados sensíveis do dispositivo para seu funcionamento.",
        ads_title: "3. Publicidade (Google AdMob)",
        ads_p: "Utilizamos o serviço Google AdMob para exibir anúncios, permitindo que o aplicativo permaneça gratuito. Para garantir a segurança das crianças, configuramos os anúncios para estarem em conformidade com as Políticas do Google Play para Famílias.",
        ads_item1: "Apenas anúncios apropriados para a classificação etária do aplicativo são exibidos.",
        ads_item2: "Utilizamos SDKs de publicidade que estão em conformidade com as políticas de proteção à criança (como a COPPA nos EUA e a LGPD no Brasil).",
        ads_item3: "Não utilizamos publicidade baseada em comportamento (rastreamento) para usuários identificados como crianças.",
        perms_title: "4. Permissões do Dispositivo",
        perms_p: "O aplicativo pode solicitar permissões básicas de funcionamento, como acesso à internet. Não acessamos câmera, microfone, localização ou contatos.",
        share_title: "5. Compartilhamento de Dados",
        share_p: "Não vendemos, trocamos ou transferimos informações pessoais para terceiros.",
        global_title: "6. Conformidade Global (GDPR, CCPA, LGPD)",
        global_p: "Como um aplicativo global disponível em múltiplos idiomas (português, inglês e espanhol), estamos comprometidos com as principais regulamentações de privacidade do mundo:",
        contact_title: "7. Contato"
      },
      terms: {
        title: "Termos de Uso",
        back: "Voltar para o Início",
        last_update: "Última atualização",
        section1_title: "1. Aceitação dos Termos",
        section1_p: "Ao acessar e usar o aplicativo Pintando a Palavra, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso.",
        section2_title: "2. Descrição do Serviço",
        section2_p: "O Pintando a Palavra é uma plataforma educativa cristã que oferece minijogos, ferramentas de pintura digital e materiais para impressão (PDF).",
        section3_title: "3. Uso Adequado",
        section3_p: "O aplicativo é destinado ao uso pessoal e não comercial por famílias, educadores e ministérios infantis.",
        section4_title: "4. Propriedade Intelectual",
        section4_p1: "Os materiais em formato PDF disponibilizados no aplicativo são considerados open source e de uso livre para fins educativos.",
        section4_p2: "No entanto, as artes em formato SVG e demais elementos visuais da interface são de propriedade exclusiva do Pintando a Palavra.",
        section5_title: "5. Links para Terceiros",
        section5_p: "O aplicativo pode conter links para sites ou serviços de terceiros. Não temos controle sobre o conteúdo desses sites.",
        section6_title: "6. Limitação de Responsabilidade",
        section6_p: "O aplicativo é fornecido 'como está', sem garantias de qualquer tipo.",
        section7_title: "7. Alterações nos Termos",
        section7_p: "Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.",
        section8_title: "8. Contato"
      }
    }
  },
  en: {
    translation: {
      nav: {
        features: "Features",
        safety: "Safety",
        about: "About",
        generosity: "Generosity",
        download: "Download App"
      },
      hero: {
        badge: "Christian Education & Fun",
        title: "The Bible comes to life through art and play",
        subtitle: "A safe and educational app designed to help children discover Bible stories interactively and creatively.",
        cta_download: "Download on Google Play",
        cta_learn: "Explore Features",
        badge_creative_title: "Creative",
        badge_creative_desc: "Digital painting for little artists",
        badge_fun_title: "Fun",
        badge_fun_desc: "Educational biblical mini-games"
      },
      features: {
        title: "Everything your child needs to learn while playing",
        subtitle: "Resources designed to stimulate creativity and biblical knowledge.",
        items: {
          games: {
            title: "Biblical Mini-games",
            desc: "Fun challenges that teach values and stories from the Scriptures."
          },
          painting: {
            title: "Digital Painting",
            desc: "Art tools for coloring characters and significant scenes from the Bible."
          },
          pdf: {
            title: "PDF Activities",
            desc: "Exclusive materials to print and do activities with family or at church."
          },
          stories: {
            title: "Illustrated Stories",
            desc: "Visual narratives that facilitate the understanding of God's Word."
          }
        }
      },
      safety: {
        title: "Safety First",
        subtitle: "Peace of mind for parents, safe fun for children.",
        no_ads: "No Invasive Ads",
        no_ads_desc: "Restricted and age-appropriate advertising, following Google Play standards.",
        privacy: "Total Privacy",
        privacy_desc: "We do not collect personal data. The environment is 100% focused on the child's experience.",
        offline: "Offline Access",
        offline_desc: "Many features work without internet, ensuring safety anywhere."
      },
      about: {
        title: "Our Mission",
        p1: "Pintando a Palavra was born from the desire to unite technology and faith, offering a healthy entertainment alternative for the new generation.",
        p2: "We believe that art is one of the most powerful ways to reinforce learning. Therefore, we created a space where children not only consume content but interact and create from biblical truths.",
        stats: {
          users: "Impacted Children",
          rating: "Average Rating",
          content: "Available Activities"
        }
      },
      footer: {
        desc: "Helping children discover the Bible through technology, art, and play.",
        legal: "Contact & Legal",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        contact: "Contact Us",
        rights: "All rights reserved."
      },
      generosity: {
        title: "Generosity",
        subtitle: "Practice Generosity",
        desc: "If you wish, learn about some platforms where it is possible to support causes around the world.",
        platforms: "Known Platforms",
        visit: "Visit official site",
        disclaimer: "This app has no link or partnership with the mentioned platforms. Links lead to external sites."
      },
      privacy_policy: {
        title: "Privacy Policy",
        back: "Back to Home",
        last_update: "Last update",
        intro_title: "1. Introduction",
        intro_p: "Thank you for choosing the Pintando a Palavra app. We take your privacy and the security of your children's data very seriously.",
        data_title: "2. Data Collection and Child Privacy",
        data_p1: "Pintando a Palavra is designed for families and children (age group 9 to 12 and free classification).",
        data_p2: "We do not intentionally collect personally identifiable information (such as name, address, email, or phone number) from children.",
        data_p3: "The app does not request registration, login, or access to sensitive device data for its operation.",
        ads_title: "3. Advertising (Google AdMob)",
        ads_p: "We use the Google AdMob service to display ads, allowing the app to remain free. To ensure children's safety, we have configured ads to comply with Google Play Families Policies.",
        ads_item1: "Only ads appropriate for the app's age rating are displayed.",
        ads_item2: "We use advertising SDKs that comply with child protection policies (such as COPPA in the US and LGPD in Brazil).",
        ads_item3: "We do not use behavior-based advertising (tracking) for users identified as children.",
        perms_title: "4. Device Permissions",
        perms_p: "The app may request basic operating permissions, such as internet access. We do not access camera, microphone, location, or contacts.",
        share_title: "5. Data Sharing",
        share_p: "We do not sell, trade, or transfer personal information to third parties.",
        global_title: "6. Global Compliance (GDPR, CCPA, LGPD)",
        global_p: "As a global app available in multiple languages (Portuguese, English, and Spanish), we are committed to the world's leading privacy regulations:",
        contact_title: "7. Contact"
      },
      terms: {
        title: "Terms of Use",
        back: "Back to Home",
        last_update: "Last update",
        section1_title: "1. Acceptance of Terms",
        section1_p: "By accessing and using the Pintando a Palavra app, you agree to comply with and be bound by the following Terms of Use.",
        section2_title: "2. Service Description",
        section2_p: "Pintando a Palavra is a Christian educational platform that offers mini-games, digital painting tools, and printable materials (PDF).",
        section3_title: "3. Proper Use",
        section3_p: "The app is intended for personal and non-commercial use by families, educators, and children's ministries.",
        section4_title: "4. Intellectual Property",
        section4_p1: "PDF materials provided in the app are considered open source and free for educational purposes.",
        section4_p2: "However, SVG arts and other visual elements of the interface are the exclusive property of Pintando a Palavra.",
        section5_title: "5. Third-Party Links",
        section5_p: "The app may contain links to third-party sites or services. We have no control over the content of these sites.",
        section6_title: "6. Limitation of Liability",
        section6_p: "The app is provided 'as is', without warranties of any kind.",
        section7_title: "7. Changes to Terms",
        section7_p: "We reserve the right to modify these Terms of Use at any time.",
        section8_title: "8. Contact"
      }
    }
  },
  es: {
    translation: {
      nav: {
        features: "Recursos",
        safety: "Seguridad",
        about: "Acerca de",
        generosity: "Generosidad",
        download: "Descargar App"
      },
      hero: {
        badge: "Educación Cristiana y Diversión",
        title: "La Biblia cobra vida a través del arte y el juego",
        subtitle: "Una aplicación segura y educativa diseñada para ayudar a los niños a descubrir las historias bíblicas de forma interactiva y creativa.",
        cta_download: "Descargar en Google Play",
        cta_learn: "Conocer Recursos",
        badge_creative_title: "Creativo",
        badge_creative_desc: "Pintura digital para pequeños artistas",
        badge_fun_title: "Divertido",
        badge_fun_desc: "Minijuegos bíblicos educativos"
      },
      features: {
        title: "Todo lo que su hijo necesita para aprender jugando",
        subtitle: "Recursos diseñados para estimular la creatividad y el conocimiento bíblico.",
        items: {
          games: {
            title: "Minijuegos Bíblicos",
            desc: "Desafíos divertidos que enseñan valores e historias de las Escrituras."
          },
          painting: {
            title: "Pintura Digital",
            desc: "Herramientas de arte para colorear personajes y escenas memorables de la Biblia."
          },
          pdf: {
            title: "Actividades en PDF",
            desc: "Materiales exclusivos para imprimir y realizar actividades en familia o en la iglesia."
          },
          stories: {
            title: "Historias Ilustradas",
            desc: "Narrativas visuales que facilitan la comprensión de la Palabra de Dios."
          }
        }
      },
      safety: {
        title: "Seguridad Primero",
        subtitle: "Tranquilidad para los padres, diversión segura para los hijos.",
        no_ads: "Sin Anuncios Invasivos",
        no_ads_desc: "Publicidad restringida y adecuada para el rango de edad, siguiendo las normas de Google Play.",
        privacy: "Privacidad Total",
        privacy_desc: "No recopilamos datos personales. El entorno está 100% enfocado en la experiencia del niño.",
        offline: "Acceso Offline",
        offline_desc: "Muchos recursos funcionan sin internet, garantizando seguridad en cualquier lugar."
      },
      about: {
        title: "Nuestra Misión",
        p1: "Pintando a Palavra nació del deseo de unir tecnología y fe, ofreciendo una alternativa saludable de entretenimiento para la nueva generación.",
        p2: "Creemos que el arte es una de las formas más poderosas de fijar el aprendizaje. Por eso, creamos un espacio donde el niño no solo consume contenido, sino que interactúa y crea a partir de las verdades bíblicas.",
        stats: {
          users: "Niños Impactados",
          rating: "Calificación Media",
          content: "Actividades Disponibles"
        }
      },
      footer: {
        desc: "Ayudando a los niños a descubrir la Biblia a través de la tecnología, el arte y el juego.",
        legal: "Contacto y Legal",
        privacy: "Política de Privacidad",
        terms: "Términos de Uso",
        contact: "Contáctenos",
        rights: "Todos los derechos reservados."
      },
      generosity: {
        title: "Generosidad",
        subtitle: "Practique la Generosidade",
        desc: "Si lo desea, conozca algunas plataformas donde es posible apoyar causas en todo el mundo.",
        platforms: "Plataformas Conocidas",
        visit: "Visitar sitio oficial",
        disclaimer: "Esta aplicación no tiene vínculo ni asociación con las plataformas mencionadas. Los enlaces llevan a sitios externos."
      },
      privacy_policy: {
        title: "Política de Privacidad",
        back: "Volver al Inicio",
        last_update: "Última actualización",
        intro_title: "1. Introducción",
        intro_p: "Gracias por elegir la aplicación Pintando a Palavra. Nos tomamos muy en serio su privacidad y la seguridad de los datos de sus hijos.",
        data_title: "2. Recopilación de Datos y Privacidad Infantil",
        data_p1: "Pintando a Palavra está diseñado para familias y niños (rango de edad de 9 a 12 años y clasificación libre).",
        data_p2: "No recopilamos intencionalmente información de identificación personal (como nombre, dirección, correo electrónico o número de teléfono) de niños.",
        data_p3: "La aplicación no solicita registro, inicio de sesión ni acceso a datos sensibles del dispositivo para su funcionamiento.",
        ads_title: "3. Publicidad (Google AdMob)",
        ads_p: "Utilizamos el servicio Google AdMob para mostrar anuncios, lo que permite que la aplicación siga siendo gratuita. Para garantizar la seguridad de los niños, hemos configurado los anuncios para que cumplan con las Políticas para Familias de Google Play.",
        ads_item1: "Solo se muestran anuncios adecuados para la clasificación de edad de la aplicación.",
        ads_item2: "Utilizamos SDK de publicidad que cumplen con las políticas de protección infantil (como COPPA en EE. UU. y LGPD en Brasil).",
        ads_item3: "No utilizamos publicidad basada en el comportamiento (seguimiento) para usuarios identificados como niños.",
        perms_title: "4. Permisos del Dispositivo",
        perms_p: "La aplicación puede solicitar permisos básicos de funcionamiento, como acceso a internet. No accedemos a la cámara, el micrófono, la ubicación o los contactos.",
        share_title: "5. Intercambio de Datos",
        share_p: "No vendemos, intercambiamos ni transferimos información personal a terceros.",
        global_title: "6. Cumplimiento Global (GDPR, CCPA, LGPD)",
        global_p: "Como aplicación global disponible en múltiples idiomas (portugués, inglés y español), estamos comprometidos con las principales regulaciones de privacidad del mundo:",
        contact_title: "7. Contacto"
      },
      terms: {
        title: "Términos de Uso",
        back: "Volver al Inicio",
        last_update: "Última actualización",
        section1_title: "1. Aceptación de los Términos",
        section1_p: "Al acceder y utilizar la aplicación Pintando a Palavra, usted acepta cumplir y estar sujeto a los siguientes Términos de Uso.",
        section2_title: "2. Descripción del Servicio",
        section2_p: "Pintando a Palavra es una plataforma educativa cristiana que ofrece minijuegos, herramientas de pintura digital y materiales para imprimir (PDF).",
        section3_title: "3. Uso Adecuado",
        section3_p: "La aplicación está destinada al uso personal y no comercial por parte de familias, educadores y ministerios infantis.",
        section4_title: "4. Propiedad Intelectual",
        section4_p1: "Los materiales en formato PDF disponibles en la aplicación se consideran de código abierto y de uso libre para fines educativos.",
        section4_p2: "Sin embargo, las artes en formato SVG y otros elementos visuales de la interfaz son propiedad exclusiva de Pintando a Palavra.",
        section5_title: "5. Enlaces a Terceros",
        section5_p: "La aplicación puede contener enlaces a sitios o servicios de terceros. No tenemos control sobre el contenido de estos sitios.",
        section6_title: "6. Limitación de Responsabilidad",
        section6_p: "La aplicación se proporciona 'tal cual', sin garantías de ningún tipo.",
        section7_title: "7. Cambios en los Términos",
        section7_p: "Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento.",
        section8_title: "8. Contacto"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['pt', 'en', 'es'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: []
    }
  });

export default i18n;
