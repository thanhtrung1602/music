import Home from "~/pages/Home";
import Detail from "~/pages/Detail";
import Upload from "~/pages/Upload";
import { HeaderOnly } from "~/components/layout";
import Login from "~/pages/Auth/Login";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/detail", component: Detail },
  { path: "/upload", component: Upload, layout: HeaderOnly },
  { path: "/login", component: Login, layout: HeaderOnly },
  { path: "/upload", component: Upload, layout: HeaderOnly },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };
