import { Alternation } from "@/components/alternation/Alternation";
import { Carousel } from "@/components/carousel/Carousel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero/Hero";
import { Skydive } from "@/components/skydive/Skydive";

export default function Home() {
  return (
	<main>
		<Header />
		<Hero />
		<Skydive />
		<Carousel />
		<Alternation />
		<Footer />
	</main>
  );
}
