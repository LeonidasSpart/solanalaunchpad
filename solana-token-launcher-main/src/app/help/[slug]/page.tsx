'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface Article {
  title: string;
  description: string;
  category: string;
  order: number;
  content: string;
  slug: string;
}

export default function HelpArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/help/${slug}`);
        if (!response.ok) throw new Error('Article not found');
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#BDDBDB]">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
        <p className="text-[#BDDBDB] mb-6">The article you're looking for doesn't exist.</p>
        <Link
          href="/help"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#BDDBDB] mb-6">
        <Link href="/help" className="hover:text-white transition">
          Help Center
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">{article.category}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#FF2D2D]">{article.title}</span>
      </div>

      {/* Back Link */}
      <Link
        href="/help"
        className="inline-flex items-center gap-2 text-[#BDDBDB] hover:text-white transition mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Help Center
      </Link>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#1a1a1a]"
      >
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-[#FF2D2D] bg-[#FF2D2D]/10 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="text-3xl font-bold text-white">{article.title}</h1>
          {article.description && (
            <p className="text-[#BDDBDB] mt-2">{article.description}</p>
          )}
        </div>

        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-[#BDDBDB] prose-a:text-[#FF2D2D] prose-a:hover:text-[#B10000] prose-strong:text-white prose-li:text-[#BDDBDB] prose-code:text-[#FF2D2D] prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </motion.article>

      {/* Still Need Help */}
      <div className="mt-8 text-center">
        <p className="text-[#BDDBDB] text-sm">
          Still have questions?{' '}
          <Link href="/contact" className="text-[#FF2D2D] hover:text-[#B10000] transition">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
