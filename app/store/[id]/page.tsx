import Image from "next/image";

import Container from "@/components/Container";

function Product() {
  return (
    <Container>
      <div className="grid grid-cols-12 mt-8 shadow-md">
        <div className="col-span-9 rtl p-4 ">
          <h2 className="font-bold text-2xl">عاصبهثب</h2>
          <p className="text-gray-700">
            نتتتتتتشمبسللللللللللل التاشسنالنشتاسلب شتسلاخصقهشیالقمبهقعبی ا
            شتنسذلهشاقلذبتنشسذبل شستتذلشسنتلانت
          </p>
          <p>
            قیمت :<span>$23</span>
          </p>
          <div>
            <button className="px-4 py-1.5 rounded-xl bg-sky-300">+</button>
            <span className="mx-3">3</span>
            <button className="px-4 py-1.5 rounded-xl bg-sky-300">-</button>
          </div>
        </div>
        <div className="col-span-3">
          <Image
            src="/animal_raccoon_minimalism_76117_1680x1050.jpg"
            alt=""
            width={300}
            height={200}
          />
        </div>
      </div>
    </Container>
  );
}

export default Product;
