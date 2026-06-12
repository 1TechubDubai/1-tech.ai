import React from 'react';
import { Helmet } from 'react-helmet-async';

// Import your data to feed the schema
import { allServicesData } from '../data/ServicesData.js'; 

const SEO = ({ title, description, url, isServicePage, serviceData }) => {
  const siteName = "1TecHub";
  
  // Default values for the homepage or non-service pages
  const defaultDescription = "1TecHub leads the AI revolution, merging autonomous intelligence with innovation to help enterprises automate, scale, and excel. We engineer custom AI solutions, autonomous agents, and advanced ML pipelines.";
  const defaultKeywords = allServicesData.map(service => service.title).join(', ');

  const finalTitle = title ? `${title} | ${siteName}` : `${siteName} | Enterprise AI & Autonomous Systems`;
  const finalDescription = description || defaultDescription;

  // 1. Base Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "1TecHub",
    "url": "https://1techub.ai",
    "logo": "https://firebasestorage.googleapis.com/v0/b/techub-495313.firebasestorage.app/o/logos%2F1-techub-logo-white.svg?alt=media&token=7f747c8d-dcf3-4d00-a57b-2775eb44a588",
    "description": defaultDescription,
    "email": "contactus@1techub.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "contactus@1techub.com"
    }
  };

  // 2. Dynamic Schema for Specific Service Pages
  // Tells Google exactly what this specific page is offering
  const serviceSchema = isServicePage && serviceData ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.title,
    "provider": {
      "@type": "Organization",
      "name": "1TecHub"
    },
    "description": serviceData.hero.description,
    "serviceType": "Enterprise AI & Software Engineering"
  } : null;

  // 3. Homepage Schema mapping all your services for Sitelinks
  const servicesListSchema = !isServicePage ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": allServicesData.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://1techub.ai/services/${service.slug}`,
      "name": service.title
    }))
  } : null;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={defaultKeywords} />

      {/* Open Graph / Social Media Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://1techub.ai"} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />

      {/* Inject Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}

      {servicesListSchema && (
        <script type="application/ld+json">
          {JSON.stringify(servicesListSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;