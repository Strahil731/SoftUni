class Triathlon {
    constructor(competitionName) {
        this.competitionName = competitionName;
        this.participants = {};
        this.listOfFinalists = [];
    }

    addParticipant(participantName, participantGender) {
        if (this.participants.hasOwnProperty(participantName)) {
            return `${participantName} has already been added to the list`;
        }

        this.participants[participantName] = participantGender;

        return `A new participant has been added - ${participantName}`;
    }

    completeness(participantName, condition) {
        if (!this.participants.hasOwnProperty(participantName)) {
            throw new Error(`${participantName} is not in the current participants list`);
        }

        if (this.participants.hasOwnProperty(participantName) && condition < 30) {
            throw new Error(`${participantName} is not well prepared and cannot finish any discipline`);
        }

        let completedCount = Math.floor(condition / 30);

        if (completedCount < 3) {
            return `${participantName} could only complete ${completedCount} of the disciplines`;
        }

        let participantGender = this.participants[participantName];

        this.listOfFinalists.push({
            participantName,
            participantGender
        });

        return `Congratulations, ${participantName} finished the whole competition`;
    }

    rewarding(participantName) {
        if (!this.listOfFinalists.find(a => a.participantName === participantName)) {
            return `${participantName} is not in the current finalists list`;
        }

        return `${participantName} was rewarded with a trophy for his performance`;
    }

    showRecord(criteria) {
        if (this.listOfFinalists.length === 'empty') {
            return `There are no finalists in this competition`;
        }

        if (criteria === 'male' || criteria === 'female') {
            let person = this.listOfFinalists.find(a => a.participantGender === criteria);
            if (!person) {
                return `There are no ${criteria}'s that finished the competition`;
            }
            else {
                return `${person.participantName} is the first ${criteria} that finished the ${this.competitionName} triathlon`;
            }
        }

        let result = '';
        this.listOfFinalists.sort((a, b) => a.participantName.localeCompare(b.participantName));

        for (let el of this.listOfFinalists) {
            result += el.participantName + '\n';
        }

        return (`List of all ${this.competitionName} finalists: \n` + result).trim();
    }
}

const contest = new Triathlon("Dynamos");

console.log(contest.addParticipant("Peter", "male"));
console.log(contest.addParticipant("Sasha", "female"));
console.log(contest.completeness("Peter", 100));
console.log(contest.completeness("Sasha", 90));
console.log(contest.rewarding("Peter"));
console.log(contest.rewarding("Sasha"));
console.log(contest.showRecord("all"));