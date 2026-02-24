//Import ES Module/NodeJs
//===================================================================================================================
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
//Charger et parser la track.json
//===================================================================================================================
const data = readFileSync("track.json", "utf-8");
const track = JSON.parse(data);
console.log(track);
//Vérifier que le dossier ada existe dans le dossier home/Documents (~)
//===================================================================================================================
const home = homedir();
const ada = join(home, "documents", "ada");
if (existsSync(ada)) {
  console.log("✅ : le dossier ada est là !");
} else {
  console.log("❌ : le dossier ada n'est pas là !");
}
// Vérifier que les dossiers des projets existent au bon endroit et sont correctement nommés
//====================================================================================================================
track.projects.forEach((project) => {
  console.log(project.name);
  const findproject = join(ada, "projets");
  if (existsSync(project.name)) {
    console.log("✅ dossier du projet <nom_du_projet>");
  } else {
    console.log("❌ dossier du projet <nom_du_projet>");
  }
});
