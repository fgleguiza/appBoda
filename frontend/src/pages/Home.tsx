import Hero from "../components/Home/Hero";
import Welcome from "../components/Home/Welcome";
import TimelineElegant from "../components/Home/TimelineElegant";
import Location from "../components/Home/Location";
import GiftList from "../components/Home/GiftList";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <Hero />
      <Welcome />
      <TimelineElegant />
      <Location />
      <GiftList />
    </div>
  );
}
