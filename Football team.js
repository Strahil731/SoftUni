class footballTeam {
    constructor(clubName, country) {
        this.clubName = clubName;
        this.country = country;
        this.invitedPlayers = [];
    }

    newAdditions(footballPlayers) {
        for (let currentPlayer of footballPlayers) {
            let [name, age, playerValue] = currentPlayer.split('/');

            let foundPlayer = this.invitedPlayers.find(player => player.name === name);

            if (foundPlayer && foundPlayer.playerValue < playerValue) {
                foundPlayer.playerValue = playerValue;
            }

            this.invitedPlayers.push({ name, age, playerValue });
        }

        let result = '';
        for (let el of this.invitedPlayers) {
            result += el.name + ", ";
        }

        return `You successfully invite ${result.substring(0, result.length - 2)}.`;
    }

    signContract(selectedPlayer) {
        let [name, playerOffer] = selectedPlayer.split('/');

        let foundPlayer = this.invitedPlayers.find(player => player.name === name);

        if (!foundPlayer) {
            throw new Error(`${name} is not invited to the selection list!`);
        }

        if (foundPlayer.playerValue > playerOffer) {
            let priceDifference = foundPlayer.playerValue - playerOffer;
            throw new Error(`The manager's offer is not enough to sign a contract with ${name}, ${priceDifference} million more are needed to sign the contract!`);
        }

        foundPlayer.playerValue = "Bought";

        return `Congratulations! You sign a contract with ${foundPlayer.name} for ${playerOffer} million dollars.`;
    }

    ageLimit(name, age) {
        let foundPlayer = this.invitedPlayers.find(player => player.name === name);

        if (!foundPlayer) {
            throw new Error(`${name} is not invited to the selection list!`);
        }

        if (foundPlayer.age < age) {
            let differenceAge = age - Number(foundPlayer.age);

            if (differenceAge < 5) {
                return `${name} will sign a contract for ${differenceAge} years with ${this.clubName} in ${this.country}!`;
            }

            if (differenceAge > 5) {
                return `${name} will sign a full 5 years contract for ${this.clubName} in ${this.country}!`;
            }
        }

        if (foundPlayer.age >= age) {
            return `${name} is above age limit!`;
        }
    }

    transferWindowResult() {
        let result = "Players list:";

        this.invitedPlayers.sort((a, b) => a.name.localeCompare(b.name));

        for (let el of this.invitedPlayers) {
            result += `\nPlayer ${el.name}-${el.playerValue}`;
        }

        return result;
    }
}

let fTeam = new footballTeam("Barcelona", "Spain");

console.log(fTeam.newAdditions(["Kylian Mbappé/23/160", "Lionel Messi/35/50", "Pau Torres/25/52"]));
console.log(fTeam.signContract("Kylian Mbappé/240"));
console.log(fTeam.ageLimit("Kylian Mbappé", 30));
console.log(fTeam.transferWindowResult())