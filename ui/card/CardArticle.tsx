import { useRef } from 'react';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import { useSelection } from '@/src/providers/SelectionContext';
import { Article } from '@/src/interfaces/article';
import { usePath } from '@/src/hooks/usePath';



interface Props {
  article?: Article;
}
export function CardArticle({ article }: Props) {
  const { selected, toggle, isSelected } = useSelection();
  const path = usePath()
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(article?._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group" >
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(article?._id!)}
        checked={isSelected(article?._id!)}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={
            article?.data.thumbnailUrl! ||
            'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'
          }
          alt={
            article?.data.description! || 'image description'
          }
        />
        <Link
          href={`/dashboard/sites/${path[2]}/${path[3]}/articles/${article?._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            {article?.data.name}
          </h2>
        </Link>
      </div>
    </div>
  );
}