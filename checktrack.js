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
//Première erreur possible, lorsque le dossier du projet n’existe pas ou est mal nommé :
//- le dossier n'existe pas ou n'est pas nommé correctement
// Vérifier que les projets sont bien initialisés comme des projets git

//====================================================================================================================
track.projects.forEach((project) => {
  const findproject = join(ada, project.name);
  const findgit = join(ada, project.name, ".git");
  if (existsSync(findproject, findgit)) {
    console.log("✅ dossier " + " " + project.name);
  } else {
    console.log("❌ dossier " + " " + project.name);
  }
});
//=====================================================================================================================
