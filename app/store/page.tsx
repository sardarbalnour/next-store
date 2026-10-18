import Link from "next/link";

import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";

function Store() {
  const mockData = [
    {
      id: "1",
      title: "راکون بازیگوش",
      image: "/animal_raccoon_minimalism_76117_1680x1050.jpg",
      description: "راکونی که لحظه های شما رو شاد میکنه.",
      price: "۲۵",
    },
    {
      id: "2",
      title: "راکون بازیگوش",
      image: "/animal_raccoon_minimalism_76117_1680x1050.jpg",
      description: "راکونی که لحظه های شما رو شاد میکنه.",
      price: "۲۵",
    },
    {
      id: "3",
      title: "راکون بازیگوش",
      image: "/animal_raccoon_minimalism_76117_1680x1050.jpg",
      description: "راکونی که لحظه های شما رو شاد میکنه.",
      price: "۲۵",
    },
    {
      id: "4",
      title: "راکون بازیگوش",
      image: "/animal_raccoon_minimalism_76117_1680x1050.jpg",
      description: "راکونی که لحظه های شما رو شاد میکنه.",
      price: "۲۵",
    },
    {
      id: "5",
      title: "راکون بازیگوش",
      image: "/animal_raccoon_minimalism_76117_1680x1050.jpg",
      description: "راکونی که لحظه های شما رو شاد میکنه.",
      price: "۲۵",
    },
  ];

  return (
    <Container>
      <h1 className="text-right py-4">فروشگاه</h1>
      <div className="grid grid-cols-4 rtl gap-4">
        {mockData.map((item) => (
          <Link href={`/store/${item.id}`} key={item.id}>
            <ProductItem {...item} />
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Store;
