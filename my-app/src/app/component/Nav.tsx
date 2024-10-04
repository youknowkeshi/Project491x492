export function Nav() {
  return (
    <div>
      <nav className="bg-[#bbd9ee]">
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
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
                    aria-current="page"
                  >
                    หน้าแรก
                  </a>
                  <a
                    href="/EvaluationformGuest"
                    className="rounded-md spx-3 py-2 text-sm font-semibold text-gray-800"
                    aria-current="page"
                  >
                    แบบประเมิน
                  </a>
                  {/* <a
                    href="/articleguest"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
                  >
                    บทความ
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-blue"
              // aria-current="page"
            >
              หน้าแรก
            </a>

            <a
              href="/Evaluationform"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              แบบประเมิน
            </a>

            {/* <a
              href="/artical"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              บทความ
            </a> */}


          </div>
        </div>
      </nav>
    </div>
  );
}
