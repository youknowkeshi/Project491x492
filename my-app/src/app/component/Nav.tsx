
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
<<<<<<< HEAD
        <Navbar.Toggle />
        <Navbar fluid rounded>
          <Navbar.Collapse>
            {isLoggedIn ? (
              <>
                <Navbar.Link href="/dashboard" active>
                  หน้าหลัก
                </Navbar.Link>
                <Navbar.Link as={Link} href="/register">
                  ลงทะเบียนครั้งแรก
                </Navbar.Link>
                <Navbar.Link href="/appointment">จองห้องให้คำปรึกษา</Navbar.Link>
                <Navbar.Link href="/profile">ข้อมูลผู้ใช้งาน</Navbar.Link>
                <Dropdown label="Dropdown" inline>
                  <Dropdown.Item>
                    <Navbar.Link href="/Evaluationform">แบบประเมินตนเอง</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link href="/article">บทความ</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link href="/accessCode">สร้าง ID สำหรับผู้รับบริการใหม่</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link href="/List">รายการ</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link href="/UserInfomation">UserInfo</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link href="/graph">สร้างกราฟ</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link onClick={signOut}>Logout</Navbar.Link>
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <Navbar.Link href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}>
                Login
              </Navbar.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Navbar>
      <div className="mt-4" />
    </>
=======
      </div>

    </nav>
  </div>
>>>>>>> origin/mhog-dev
  );
}
