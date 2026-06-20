import Image from "next/image";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col">
      <Banner />
    </div>
  );
}
