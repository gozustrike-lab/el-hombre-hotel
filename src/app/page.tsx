import { Navbar } from '@/components/site/navbar';
import { Hero } from '@/components/site/hero';
import { RoomsPreview } from '@/components/site/rooms-preview';
import { Services } from '@/components/site/services';
import { RestaurantPreview } from '@/components/site/restaurant-preview';
import { Experiences } from '@/components/site/experiences';
import { Testimonials } from '@/components/site/testimonials';
import { Footer } from '@/components/site/footer';

export default function HomePage() {
  return (
    <main className="w-full m-0 p-0 overflow-x-hidden">
      <Navbar />
      <Hero />
      <RoomsPreview />
      <Services />
      <RestaurantPreview />
      <Experiences />
      <Testimonials />
      <Footer />
    </main>
  );
}
