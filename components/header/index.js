import Link from "next/link";

function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <a>Hakkımda</a>
        </Link>
        <Link href="/blog">
          <a>Yazılar</a>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
