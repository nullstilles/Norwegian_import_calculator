import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const SEO = ({ title, description, path = '' }) => {
    const { language } = useLanguage();

    const siteTitle = 'NorTools';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    // Default descriptions if none provided
    const defaultDescription = language === 'no'
        ? 'Norges beste samling av nyttige verktøy og kalkulatorer. Beregn toll, strømstøtte, valuta og mer.'
        : 'Norway\'s best collection of useful tools and calculators. Calculate toll, electricity support, currency and more.';

    const metaDescription = description || defaultDescription;
    const url = `https://nortools.no${path}`; // Replace with actual domain when deployed

    return (
        <Helmet>
            <html lang={language} />
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
        </Helmet>
    );
};

export default SEO;
