import structOrganizationList from "./OrganizationList/OrganizationListConstructor";
export const vortepreneurOrganizationList = structOrganizationList();
const structVortepreneurDetails = async () => {
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  summary.textContent = "VORTEPRENEUR";
  details.appendChild(summary);
  details.appendChild(await vortepreneurOrganizationList);
  return details;
};
export default structVortepreneurDetails;
