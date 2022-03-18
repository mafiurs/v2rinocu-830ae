import { useState } from 'react';

export const useTabContent = (baseContent) => {
  const [content, setContent] = useState(baseContent);
  const handleSwitchTab = (name) => (e) => {
    const newContent = content.map((item) => {
      if (item.name === name) {
        return { ...item, active: true };
      }
      return { ...item, active: false };
    });
    setContent(newContent);
  };

  return { content, handleSwitchTab };
};
