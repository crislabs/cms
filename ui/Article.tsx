'use client'

import React from 'react';
import { Article } from '@/src/interfaces/article';
import { HeadingDashboard } from './HeadingDashboard';
import { MarkdownPreview } from '@/src/utils/markdown';
import { usePetGetArticle } from '@/src/hooks/articles';
interface Props {
  article: Article
}
export function Article(props: Props) {
  const { data: post } = usePetGetArticle(props.article)
  return (
    <React.Fragment>
      <HeadingDashboard title={post.data.name} article={post} />
      <article className="max-w-2xl px-6 py-6 mx-auto space-y-12  text-gray-900">
        
        <div className="text-gray-800 prose prose-h1:text-6xl max-w-none prose-pre:p-0 prose-pre:bg-inherit">
          
          <MarkdownPreview markdown={post.data.content || ''}/>
        </div>

      </article>
    </React.Fragment>
  );
}