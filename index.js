import inquirer from 'inquirer';
import {randomSuperhero} from 'superheroes';
import sillyname from 'sillyname';
import qr from 'qr-image';
import fs from "fs";

inquirer
    .prompt ([
        {
            message: "What is your name?",
            name: "mabaho"
        }
    ])
    .then ((answers) => {
        const userName = answers.mabaho;
        const villainName = sillyname();
        const superheroName = randomSuperhero();

        console.log(`\nHello ${userName}`);
        console.log(`Your villain name will be ${villainName}`);
        console.log(`And your superhero name will be ${superheroName}\n`);
        
        console.log("QR codes are generated\nText file updated\n");

        const nameQR = qr.image(userName, { type: 'png' });
        nameQR.pipe(fs.createWriteStream('name.png'));

        const villainQR = qr.image(villainName, { type: 'png' });
        villainQR.pipe(fs.createWriteStream('sillyname.png'));

        const heroQR = qr.image(superheroName, { type: 'png' });
        heroQR.pipe(fs.createWriteStream('superheroname.png'));

        const record = `Name: ${userName}\nVillain Name: ${villainName}\nSuperhero Name: ${superheroName}\n\n`;
        fs.appendFileSync("myhero.txt", record, "utf8");

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment.");
        } else {
            console.error("Something went wrong.", error);
        }
    });
