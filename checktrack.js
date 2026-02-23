import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

const data = readFileSync("track.json", "utf-8");
const track = JSON.parse(data);

console.log(join(homedir(), "ada"));
