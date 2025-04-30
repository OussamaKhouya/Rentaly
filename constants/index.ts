export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Dashboard",
    showUser: true
  },
  {
    img: "/icons/admin/car-logo.svg",
    route: "/admin/cars",
    text: "Cars",
    showUser: true
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account",
    text: "Accounts",
    showUser: false
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  password: "Password",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "number",
  password: "password",
};
