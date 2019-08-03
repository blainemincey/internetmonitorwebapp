import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser, faDatabase } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faDatabase);
}

export default initFontAwesome;
