
import { usePetStore } from "@/src/store/pet";
import Hero from "@/ui/Hero";

export default function Page() {
  const pet = usePetStore.getState()
  return (
    //  <h1>Hola Jesus</h1> 
    <Hero />
  );
}
