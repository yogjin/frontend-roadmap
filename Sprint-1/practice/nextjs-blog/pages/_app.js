import '../styles/global.css';

// 모든 page에서 공통적으로 사용되는 top-level 컴포넌트
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
