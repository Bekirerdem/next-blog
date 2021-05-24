import "../styles/global.css";
import Header from "../components/index";

function MyApp({ Component, pageProps }) {
  return (
    <div className="antialiased text-gray-700">
      <Header />
      <main className="mt-5">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
