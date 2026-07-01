'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function TemplateLoader({ 
  onLoad 
}: { 
  onLoad: (template: string) => void 
}) {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const template = searchParams.get('template');
    if (template) onLoad(template);
  }, [searchParams, onLoad]);
  
  return null;
}
