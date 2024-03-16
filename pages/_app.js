import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
  return (
			<Layout>
					<Component {...pageProps} />
			</Layout>
	)
}
