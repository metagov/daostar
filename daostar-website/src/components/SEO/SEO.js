import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'DAOstar | The DAO Standard', 
  description = 'DAOstar defines a common interface for DAOs, making them easier to discover, more legible to members, and more compatible with future tooling.', 
  image = 'https://daostar.org/img/daostar.png',
  url = typeof window !== 'undefined' ? window.location.href : 'https://daostar.org'
}) => {
  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
