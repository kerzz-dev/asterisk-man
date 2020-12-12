import fs from "fs"

export class GlobalConfig {
    /**
     * Mongo DB Connect URL Address Configration
     */
    mongoConnectUrl = ""

    ariUrl = ""
    ariUserName = ""
    ariPassword = ""




}

export function saveConfig() {
    let config = new GlobalConfig()
    fs.writeFileSync("./configs/prod-config.json", JSON.stringify(config))
}

export async function getConfing(): Promise<GlobalConfig> {
    let config: GlobalConfig
    if (process.env.NODE_ENV == "production") {
        let configJson = await fs.readFileSync("./prod-config.json", "utf-8")
        config = Object.assign(new GlobalConfig, JSON.parse(configJson))
    } else {
        let configJson = await fs.readFileSync("./test-config.json", "utf-8")
        config = Object.assign(new GlobalConfig, JSON.parse(configJson))
    }
    return config
}