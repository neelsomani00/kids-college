import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/config';

export default function Seo({ title, description, path = '/', noindex = false }) {
  const fullTitle = title ? `${title} | ${SITE.fullName}` : `${SITE.fullName} | CBSE School, ${SITE.classes}`;
  const url = `${SITE.url}${path === '/' ? '/' : path}`;
  const image = `${SITE.url}/og-image.png`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: SITE.fullName,
    url: SITE.url,
    logo: `${SITE.url}/icon-512.png`,
    image,
    description,
    email: SITE.email,
    telephone: '+919826311599',
    foundingDate: SITE.established,
    sameAs: Object.values(SITE.social),
    department: SITE.campuses.map((c) => ({
      '@type': 'School',
      name: `${SITE.fullName} – ${c.name}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: c.address,
        addressLocality: 'Indore',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'IN',
      },
    })),
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {path === '/' && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
