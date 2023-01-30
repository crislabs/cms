import { useRef } from 'react';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import { useSelection } from '@/src/providers/SelectionContext';
import { Service } from '@/src/interfaces/service';
import { usePath } from '@/src/hooks/usePath';



interface Props {
  service?: Service;
}
export function CardService({ service }: Props) {
  const { selected, toggle, isSelected } = useSelection();
  const path = usePath()
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(service?._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group" >
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(service?._id!)}
        checked={isSelected(service?._id!)}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={
            service?.data.thumbnailUrl! ||
            'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'
          }
          alt={
            service?.data.description! || 'image description'
          }
        />
        <Link
          href={`/dashboard/sites/${path[2]}/${path[3]}/services/${service?._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            { service?.data.name }
          </h2>
        </Link>
      </div>
    </div>
  );
}