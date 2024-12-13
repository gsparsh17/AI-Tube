export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/summarize"] };

console.log("Middleware triggered for route:", config.matcher);
