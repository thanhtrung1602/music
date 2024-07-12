import Home from "~/pages/Home";
import Detail from "~/pages/Detail";
import Upload from "~/pages/Upload";
import Profile from "~/pages/Profile";
import { HeaderOnly, BoardOnly } from "~/components/layout";
import Login from "~/pages/Auth/Login";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/detail/:id", component: Detail, layout: BoardOnly },
  {
    path: "/profile/:id",
    component: Profile,
    layout: BoardOnly,
  },
  { path: "/upload", component: Upload, layout: HeaderOnly },
  { path: "/login", component: Login, layout: HeaderOnly },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };
