#!/usr/bin/env node
import inquirer from "inquirer";

class Player {
    name: string;
    fuel: number = 50;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel -= 25;
    }

    isOutOfFuel() {
        return this.fuel <= 0;
    }
}

class Opponent {
    name: string;
    fuel: number = 50;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel -= 25;
    }

    isOutOfFuel() {
        return this.fuel <= 0;
    }
}

async function main() {
    let players = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter your name",
        }
    ]);

    let opponents = await inquirer.prompt([
        {
            name: "name",
            type: "list",
            message: "Select the opponent",
            choices: ["Spiderman", "Batman", "Antman"]
        }
    ]);

    let p1 = new Player(players.name);
    let o1 = new Opponent(opponents.name);

    do {
        let ask = await inquirer.prompt([
            {
                name: "opt",
                type: "list",
                message: "What would you like to do?",
                choices: ["Attack", "Defend", "Runaway", "Exit"]
            }
        ]);

        if (ask.opt === "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.fuelDecrease();
                console.log(`${p1.name}'s fuel decreased. Fuel remaining: ${p1.fuel}`);
                console.log(`${o1.name}'s fuel decreased. Fuel remaining: ${o1.fuel}`);
            }
        }

        if (ask.opt === "Defend") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                o1.fuelDecrease();
                console.log(`${p1.name}'s fuel decreased. Fuel remaining: ${p1.fuel}`);
                console.log(`${o1.name}'s fuel decreased. Fuel remaining: ${o1.fuel}`);
            }
            else {
                console.log(`${o1.name} failed to decrease the fuel of ${p1.name}`);
            }
        }

        if (ask.opt === "Runaway") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                console.log(`${o1.name} successfully escaped.`);
            }
            else {
                p1.fuelDecrease();
                console.log(`${p1.name}'s fuel decreased. Fuel remaining: ${p1.fuel}`);
                console.log(`${o1.name} failed to escape.`);
            }
        }

        if (ask.opt === "Exit") {
            console.log("Exiting the game.");
            break; 
        }

        if (p1.isOutOfFuel() || o1.isOutOfFuel()) {
            console.log("One of the players is out of fuel. Game over.");
            break;
        }
    } while (true);
}

main();
