import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
export interface ContactPoint {
  contactType: string;
  telephone?: string;
  email?: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
  contactOption?: string | string[];
}
export interface CorporateContactJsonLdProps {
  keyOverride?: string;
  url: string;
  contactPoint: ContactPoint[];
  logo?: string;
}

const formatIfArray = (value: string[] | string) =>
  Array.isArray(value) ? `[${value.map(val => `"${val}"`)}]` : `"${value}"`;

const buildContactPoint = (contactPoint: ContactPoint[]) =>
  contactPoint.map(
    contact => `{
    "@type": "ContactPoint",
    ${contact.telephone ? `"telephone": "${contact.telephone}",` : ''}
    ${contact.email ? `"email": "${contact.email}",` : ''}
    "contactType": "${contact.contactType}"${
      contact.areaServed
        ? `,
    "areaServed": ${formatIfArray(contact.areaServed)}`
        : ''
    }${
      contact.availableLanguage
        ? `,
    "availableLanguage": ${formatIfArray(contact.availableLanguage)}`
        : ''
    }${
      contact.contactOption
        ? `,
    "contactOption": "${contact.contactOption}"`
        : ''
    }
    }`,
  );

const CorporateContactJsonLd: FC<CorporateContactJsonLdProps> = ({
  keyOverride,
  url,
  logo,
  contactPoint,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "${url}",
    ${logo ? `"logo": "${logo}",` : ''}
    "contactPoint": [${buildContactPoint(contactPoint)}]
  }`;
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-corporate-contact${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default CorporateContactJsonLd;
