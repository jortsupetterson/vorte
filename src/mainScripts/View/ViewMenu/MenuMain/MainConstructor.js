import structMyVorteDetails from "./MyVorteDetails/MyVorteDetailsConstructor";
import structVortepreneurDetails from "./VortepreneurDetails/VortepreneurDetailsConstructor";
import structUserDetails from "./UserDetails/UserDetailsConstructor";

const myVorteDetails = structMyVorteDetails();
const vortepreneurDetails = structVortepreneurDetails();
const userDetails = structUserDetails();

const structMain = async () => {
  const main = document.createElement("main");
  for (const details of [
    await myVorteDetails,
    await vortepreneurDetails,
    await userDetails,
  ]) {
    main.appendChild(details);
  }
  return main;
};
export default structMain;
