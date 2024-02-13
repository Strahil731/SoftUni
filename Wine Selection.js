class WineSelection {
    constructor(space) {
        this.space = space;
        this.wines = [];
        this.bill = 0;
    }

    reserveABottle(wineName, wineType, price) {
        if (this.space === this.wines.length) {
            throw new Error("Not enough space in the cellar.");
        }
        let res = {
            wineName,
            wineType,
            price,
            paid: false
        }

        this.wines.push(res);
        return `You reserved a bottle of ${wineName} ${wineType} wine.`;
    }

    payWineBottle(wineName, price) {
        let currentEl = this.wines.find(a => a.wineName === wineName);

        if (!currentEl) {
            throw new Error(`${wineName} is not in the cellar.`);
        }

        if (this.paid) {
            throw new Error(`${wineName} has already been paid.`);
        }

        this.paid = true;
        this.bill += price;
        return `You bought a ${wineName} for a ${price}$.`;
    }

    openBottle(wineName) {
        let currentEl = this.wines.find(b => b.wineName === wineName);

        if (!currentEl) {
            throw new Error("The wine, you're looking for, is not found.");
        }

        if (!this.paid) {
            throw new Error(`${wineName} need to be paid before open the bottle.`);
        }

        this.wines = this.wines.filter(x => x.wineName !== wineName);
        return `You drank a bottle of ${wineName}.`;
    }

    cellarRevision(wineType) {
        if (wineType) {
            let currentEl = this.wines.find(x => x.wineType === wineType);

            if (!currentEl) {
                throw new Error(`There is no ${wineType} in the cellar.`);
            }

            return `${currentEl.wineName} > ${wineType} - ${currentEl.paid ? "Has Paid" : "Not Paid"}.`;
        }

        let buff = `You have space for ${this.space - this.wines.length} bottles more.\n`;
        buff += `You paid ${this.bill}$ for the wine.\n`;
        this.wines.sort((a, b) => a.wineName.localeCompare(b.wineName)).forEach(x => {
            buff += `${x.wineName} > ${x.wineType} - ${x.paid ? "Has Paid" : "Not Paid"}.\n`;
        });

        return buff.trim();
    }
}


const selection = new WineSelection(2)
console.log(selection.reserveABottle('Bodegas Godelia Mencía', 'Rose', 144));
console.log(selection.cellarRevision('Rose'));