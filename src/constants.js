export const ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "https://swag-order-dev.minhle2704.workers.dev"
    : "https://swag-order.minhle2704.workers.dev";

export const USER_PROP_STRINGS = {
  firstName: "First name",
  lastName: "Last name",
  username: "Username",
  email: "Email",
};
