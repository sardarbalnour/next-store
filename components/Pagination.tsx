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
    <nav
      aria-label="صفحه‌بندی محصولات"
      className="mt-12 flex justify-center border-t border-stone-200 pt-7"
      dir="rtl"
    >
      <ReactPaginate
        breakLabel="..."
        nextLabel="بعدی ←"
        previousLabel="→ قبلی"
        previousAriaLabel="صفحه قبلی"
        nextAriaLabel="صفحه بعدی"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex max-w-full items-center gap-1.5 rounded-2xl border border-stone-200 bg-white p-2 shadow-sm sm:gap-2"
        pageClassName="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-sm font-semibold text-stone-600 transition hover:bg-emerald-50 hover:text-emerald-900"
        pageLinkClassName="flex size-full items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
        activeClassName="!bg-emerald-800 !text-white shadow-sm shadow-emerald-900/20 hover:!bg-emerald-900 hover:!text-white"
        previousClassName="flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-xl px-2.5 text-xs font-semibold text-stone-600 transition hover:bg-emerald-50 hover:text-emerald-900 sm:px-3 sm:text-sm"
        previousLinkClassName="flex h-full items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
        nextClassName="flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-xl px-2.5 text-xs font-semibold text-stone-600 transition hover:bg-emerald-50 hover:text-emerald-900 sm:px-3 sm:text-sm"
        nextLinkClassName="flex h-full items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
        disabledClassName="cursor-not-allowed opacity-40 hover:bg-transparent hover:text-stone-600"
        breakClassName="flex h-10 min-w-5 items-center justify-center text-stone-400"
      />
    </nav>
  );
}

export default Pagination;
