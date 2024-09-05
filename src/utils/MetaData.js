import { useEffect } from 'react';

export const MetaData = ({ title, description }) => {
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

   
  }, [title, description]);

  return null;
};
