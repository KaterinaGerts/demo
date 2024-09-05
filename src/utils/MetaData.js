import { useEffect } from 'react';

export const MetaData = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      let descriptionMetaTag = document.querySelector("meta[name='description']");
      if (!descriptionMetaTag) {
        descriptionMetaTag = document.createElement('meta');
        descriptionMetaTag.setAttribute('name', 'description');
        document.head.appendChild(descriptionMetaTag);
      }
      descriptionMetaTag.setAttribute('content', description);
    }

    if (keywords) {
      let keywordsMetaTag = document.querySelector("meta[name='keywords']");
      if (!keywordsMetaTag) {
        keywordsMetaTag = document.createElement('meta');
        keywordsMetaTag.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMetaTag);
      }
      keywordsMetaTag.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);

  return null;
};
