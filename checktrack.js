//Import ES Module/NodeJs
//===================================================================================================================
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
//Charger et parser la track.json
//===================================================================================================================
const data = readFileSync("track.json", "utf-8");
const track = JSON.parse(data);
// console.log(track);
//===================================================================================================================
//Vérifier que le dossier ada existe dans le dossier home/Documents (~)
const home = homedir();
const ada = join(home, "Documents", "ada");
if (existsSync(ada)) {
  console.log("✅ dossier ada");
} else {
  console.log("❌ dossier ada");
}
//====================================================================================================================
// Vérifier que les dossiers des projets existent au bon endroit et sont correctement nommés
//Première erreur possible, lorsque le dossier du projet n’existe pas ou est mal nommé :
//le dossier n'existe pas ou n'est pas nommé correctement
// Vérifier que les projets sont bien initialisés comme des projets git
let correct = 0;
track.projects.forEach((project) => {
  const findproject = join(ada, project.name);
  const findgit = join(ada, project.name, ".git");
  const errors = [];
  let check = true;
  if (existsSync(findproject)) {
    // dossier ok
  } else {
    errors.push("- le dossier n'existe pas où n'est pas nommé correctement");
    check = false;
  }
  if (existsSync(findgit)) {
    // dossier ok
  } else {
    errors.push("- le repository git n'est pas initialisé");
    check = false;
  }
  const noFile = [];
  project.required.forEach((file) => {
    const filePath = join(findproject, file);
    if (!existsSync(filePath)) {
      errors.push(file);
      noFile.push(file);
    }
  });
  if (errors.length === 0) {
    console.log("✅ dossier projet " + project.name);
    check = true;
  } else {
    console.log("❌ dossier projet " + project.name);
  }

  if (noFile.length === 1) {
    console.log("- Il manque :" + noFile[0]);
  } else if (noFile.length > 1) {
    const firstFiles = noFile.slice(0, noFile.length - 1);
    const lastFile = noFile[noFile.length - 1];
    console.log("- Il manque : " + firstFiles.join(", ") + " et " + lastFile);
  }
  if (check === true) {
    correct++;
  }
});
const totalProjects = track.projects.length;
const percentage = (correct / totalProjects) * 100;
console.log(
  `${percentage} % des projets sont initialisés correctement (${correct}/${totalProjects})`,
);
// ❌ 16% des projets sont initialisés correctement (2/12)

//recueillir toutes les erreurs pour les mettre dans un tableau
//recueillir dans le tableau erreurs les fichiers et crée un tableau = nofile
//pourcentage
//variable des projects good
//track.projects.length /le nombre de dossier n/10 *100
//
//=====================================================================================================================
