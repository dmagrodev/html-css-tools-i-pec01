
+( function() {
  const kioto = "Kioto";
  console.log(`Hello, ${kioto}!`);
} )();

//https://docs.fontawesome.com/apis/javascript aqui documentacion
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import { faCoffee, faHome, faMapMarkerAlt,faBars, faMinus } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faHome, faMapMarkerAlt,faBars, faMinus);

dom.watch();