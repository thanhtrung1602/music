import { useState, useEffect, createContext } from "react";
import instance from "~/services/customize-axios";

type Users = {
  id: number;
  image: string;
  name: string;
};

export const CookieUser = createContext<Users | null>(null);

function UserToken({ children }: { children: React.ReactNode }) {
  const [cookie, setCookie] = useState(null);
  const [user, setUser] = useState<Users | null>(null);

  useEffect(() => {
    instance
      .get("/users/getUserToken")
      .then((response) => {
        setCookie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching token:", error);
      });
  }, []);

  useEffect(() => {
    if (cookie) {
      instance
        .get("/auth/log", {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log("Token expired or invalid. Redirecting to login.");
          } else {
            console.error("Error fetching user data:", error);
          }
        });
    }
  }, [cookie]);

  return <CookieUser.Provider value={user}>{children}</CookieUser.Provider>;
}

export default UserToken;
