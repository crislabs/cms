
import { usePetStore } from "@/src/store/pet";
import Hero from "@/ui/Hero";
export const revalidate = 20;
export default function Page() {
  const pet = usePetStore.getState()
  return (
    //  <h1>Hola Jesus</h1> 
    <Hero />
  );
}
