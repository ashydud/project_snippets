import { config } from "dotenv"
config()

export const configENV = {
    port: process.env.PORT || "5000",
    jwt: process.env.JWT || "",
    db: process.env.DB || ""
}

