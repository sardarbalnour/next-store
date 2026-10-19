import Image from "next/image";

function CartItem() {
  return (
    <div className="grid grid-cols-12 bg-slate-100 mb-4">
      <div className="col-span-10 rtl p-4">
        <h2>esme mahsol</h2>
        <p>
          tedad : <span>3</span>
        </p>
        <p>
          price : <span>43$</span>
        </p>
        <div className="mt-4">
          <button className="px-4 py-1.5 rounded-xl bg-sky-300">+</button>
          <span className="mx-3">3</span>
          <button className="px-4 py-1.5 rounded-xl bg-sky-300">-</button>
        </div>
      </div>
      <Image
        className="col-span-2"
        src="/animal_raccoon_minimalism_76117_1680x1050.jpg"
        alt="photo"
        width={250}
        height={200}
      />
    </div>
  );
}

export default CartItem;
