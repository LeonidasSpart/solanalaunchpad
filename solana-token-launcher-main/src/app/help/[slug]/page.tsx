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
    <div className="min-h-screen bg-[#050505] py-12 px-4">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl font-orbitron font-bold text-white">
              {article.title}
            </h1>
            {article.description && (
              <p className="text-[#BDDBDB] mt-2">{article.description}</p>
            )}
          </div>

          {/* 🔥 BRAND‑STYLED MARKDOWN CONTENT 🔥 */}
          <div className="
            prose 
            prose-invert 
            max-w-none
            prose-headings:font-orbitron 
            prose-headings:text-white 
            prose-h1:text-3xl 
            prose-h2:text-2xl 
            prose-h2:mt-8 
            prose-h2:border-b 
            prose-h2:border-[#1a1a1a] 
            prose-h2:pb-2
            prose-h3:text-xl
            prose-p:text-[#BDDBDB] 
            prose-p:leading-relaxed
            prose-a:text-[#FF2D2D] 
            prose-a:no-underline 
            prose-a:hover:underline 
            prose-strong:text-white 
            prose-ul:list-disc 
            prose-ul:pl-6
            prose-ol:list-decimal 
            prose-ol:pl-6
            prose-li:text-[#BDDBDB]
            prose-li:marker:text-[#FF2D2D]
            prose-code:text-[#FF2D2D] 
            prose-code:bg-[#1a1a1a] 
            prose-code:px-1 
            prose-code:py-0.5 
            prose-code:rounded 
            prose-code:text-sm
            prose-pre:bg-[#0D0D0D] 
            prose-pre:border 
            prose-pre:border-[#1a1a1a] 
            prose-pre:rounded-xl
            prose-blockquote:border-l-[#FF2D2D] 
            prose-blockquote:bg-[#1a1a1a] 
            prose-blockquote:px-4 
            prose-blockquote:py-2 
            prose-blockquote:rounded-r-xl
            prose-table:border-collapse 
            prose-th:border 
            prose-th:border-[#1a1a1a] 
            prose-th:bg-[#1a1a1a] 
            prose-th:text-white 
            prose-th:font-orbitron 
            prose-th:px-4 
            prose-th:py-2
            prose-td:border 
            prose-td:border-[#1a1a1a] 
            prose-td:px-4 
            prose-td:py-2 
            prose-td:text-[#BDDBDB]
            prose-img:rounded-xl 
            prose-img:border 
            prose-img:border-[#1a1a1a]
          ">
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
    </div>
  );
}
