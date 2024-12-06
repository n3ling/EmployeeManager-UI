import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch("/api/check-session", {
            method: "GET",
            credentials: "include", // Ensures session cookies are sent
          });

          if (!response.ok) {
            // Redirect to login if not authenticated
            router.push("/login");
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          router.push("/login");
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
