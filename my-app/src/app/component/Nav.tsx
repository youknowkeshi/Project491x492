
export function Nav() {

  return (
    <div>
    <nav className="bg-[#95BDFF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-20 w-20"
                src="/logoent.png"
                alt="Your Company"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
              <a
                  href="/"
                  className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                  aria-current="page"
                >
                  หน้าแรก
                </a>
                <a
                  href="/EvaluationformGuest"
                  className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                  aria-current="page"
                >
                  แบบประเมิน
                </a>
                <a
                  href="/articleguest"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                >
                  บทความ
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </nav>
  </div>
  );
}
