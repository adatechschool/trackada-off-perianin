//Import ES Module/NodeJs
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
//Charger et parser la track.json
const data = readFileSync("track.json", "utf-8");
const track = JSON.parse(data);
//Vérifier que le dossier ada existe dans le dossier home/Documents (~)
const home = homedir();
const ada = join(home, "Documents", "ada");
if (existsSync(ada)) {
  console.log("\x1b[1m" + "\x1b[32m" + "✅ dossier ada" + "\x1b[0m" + "\n");
} else {
  console.log("\x1b[1m" + "\x1b[31m" + "❌ dossier ada" + "\x1b[0m" + "\n");
}
// Vérifier que les dossiers des projets existent au bon endroit et sont correctement nommés
//Première erreur possible, lorsque le dossier du projet n’existe pas ou est mal nommé :
//le dossier n'existe pas ou n'est pas nommé correctement
// Vérifier que les projets sont bien initialisés comme des projets git si les projets existent
//bien définir les conditions si les dossiers n'existent pas on affiche pas les fichiers manquant juste quand le dossier et same pour le git
//recueillir toutes les erreurs pour les mettre dans un tableau
//recueillir dans le tableau erreurs les fichiers et crée un tableau = nofile
//pourcentage
//track.projects.length /le nombre de dossier n/10 *100
//arrondi à l'entier le plus proche avec math.round()
let correct = 0;
track.projects.forEach((project) => {
  const findproject = join(ada, project.name);
  const findgit = join(ada, project.name, ".git");
  const errors = [];
  const noFile = [];
  if (existsSync(findproject)) {
    if (!existsSync(findgit)) {
      errors.push("- le repository git n'est pas initialisé");
    }
    project.required.forEach((file) => {
      const filePath = join(findproject, file);
      if (!existsSync(filePath)) {
        noFile.push(file);
      }
    });
  } else {
    errors.push("- le dossier n'existe pas ou n'est pas nommé correctement");
  }
  if (errors.length === 0 && noFile.length === 0) {
    console.log(
      `\x1b[1m \x1b[32m" ✅ dossier du projet ${project.name}\x1b[0m`,
    );
  } else {
    console.log(`\x1b[1m \x1b[31m ❌ dossier du projet ${project.name}\x1b[0m`);
    errors.forEach((error) => {
      console.log(error);
    });
  }
  if (noFile.length === 1) {
    console.log("- Il manque : " + noFile[0]);
  } else if (noFile.length > 1) {
    const firstFiles = noFile.slice(0, noFile.length - 1);
    const lastFile = noFile[noFile.length - 1];
    console.log("- Il manque : " + firstFiles.join(", ") + " et " + lastFile);
  }
  if (errors.length === 0) {
    correct++;
  }
  console.log();
});
const totalProjects = track.projects.length;
const percentage = Math.round((correct / totalProjects) * 100);
console.log(
  `\x1b[1m \x1b[35m ${percentage} % des projets sont initialisés correctement (${correct}/${totalProjects})\x1b[0m`,
);

//=====================================================================================================================================================
