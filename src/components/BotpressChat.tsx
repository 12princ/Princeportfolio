'use client';

import { useEffect } from 'react';

export default function BotpressChat() {
  useEffect(() => {
    // Add Botpress CSS link if it doesn't exist
    if (typeof document !== 'undefined') {
      const existingLink = document.querySelector('link[href="/botpress-chat.css"]');
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/botpress-chat.css';
        document.head.appendChild(link);
      }
    }
  }, []);

  return null;
}

