import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import Layout from '@/components/Layout';
import { RoleProvider } from "@/components/RoleContext";

export default function App({ Component, pageProps }) {
  const { isManager } = pageProps;

  return (
	< RoleProvider isManager={isManager}>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</ RoleProvider>
	)
}
