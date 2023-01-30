'use client'
import { useRef } from 'react';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import { useSelection } from '@/src/providers/SelectionContext';
import { Site } from '@/src/interfaces/site';


interface Props {
  site?: Site;
}
export function CardSite({ site }: Props) {
  const { selected, toggle, isSelected } = useSelection();
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(site?._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group" >
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(site?._id!)}
        checked={isSelected(site?._id!)}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={
            site?.data.images?.logo?.src ||
            'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'
          }
          alt={
            site?.data.description || 'image description'
          }
        />
        <Link
          href={`/dashboard/sites/${site?.data.type.slug}/${site?._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            {site?.data.name}
          </h2>
        </Link>
      </div>
    </div>
  );
}