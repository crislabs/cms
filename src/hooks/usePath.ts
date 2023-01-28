import { usePathname } from "next/navigation";

export const usePath = () => {
  const pathname = usePathname();
  pathname!.toString();
  return pathname!.slice(1).split('/');
};