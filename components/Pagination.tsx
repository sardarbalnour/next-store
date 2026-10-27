"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

function Pagination({ pageCount }: { pageCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageClick = (e: { selected: number }) => {
    const page = e.selected + 1;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    if (!params.has("per_page")) {
      params.set("per_page", "2");
    }

    router.push(`/store?${params.toString()}`);
  };

  return (
    <div className="mt-10 flex justify-center" dir="rtl">
      <ReactPaginate
        breakLabel="..."
        nextLabel="بعدی ←"
        previousLabel="→ قبلی"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center gap-2"
        pageClassName="flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 transition hover:border-blue-500 hover:text-blue-600"
        pageLinkClassName="flex h-full w-full cursor-pointer items-center justify-center px-3"
        activeClassName="!border-blue-500 bg-blue-500 text-white hover:text-white"
        previousClassName="flex h-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 px-3 transition hover:border-blue-500 hover:text-blue-600"
        nextClassName="flex h-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 px-3 transition hover:border-blue-500 hover:text-blue-600"
        disabledClassName="cursor-not-allowed opacity-40"
        breakClassName="px-2 text-gray-500"
      />
    </div>
  );
}

export default Pagination;
