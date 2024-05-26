import router from "./router";
import usersCont from "../controllers/users";

router.get("/login", usersCont.login);