import { BigNumber } from "./bignumber";
import { LocalContractStorage, Blockchain, StorageMap, Event } from "./System";
// Make Sure delete those imports above to deploy

class DepositeContent {
    balance: BigNumber;
    expiryHeight: BigNumber;

    constructor(text?: string) {
        if (text) {
            let o = JSON.parse(text);
            this.balance = new BigNumber(o.balance);
            this.expiryHeight = new BigNumber(o.expiryHeight);
        } else {
            this.balance = new BigNumber(0);
            this.expiryHeight = new BigNumber(0);
        }
    }

    toString(): string {
        return JSON.stringify(this);
    }

}

type CommonAxisType = number | string
class Axis {
    x: CommonAxisType;
    y: CommonAxisType;

    constructor(x :CommonAxisType, y :CommonAxisType) {
        this.x = x
        this.y = y
    }

    toString(): string {
        const {x,y} = this
        return `X is: ${x}, Y is: ${y}`;
    }
}

class DictContract {
    name: string;
    constructor() {
        LocalContractStorage.defineProperties(this, {
            name: null,
        })
        LocalContractStorage.defineMapProperty(this, "bankVault", {
            parse(text: string): DepositeContent {
                return new DepositeContent(text);
            },

            stringify(o: DepositeContent): string {
                return o.toString();
            },
        });
    }

        // init function.
    init(name) {
        this.name = name;
    }

    getName() {
        return this.name
    }

    changeName(str) {
        this.name = str
    }

    testBigNumber(number :string | number) :String{
        return new BigNumber(number).toString()
    }

    getBlockHeight() :number {
        return Blockchain.block.height
    }

    getBlockTimestamp() :BigNumber {
        return new BigNumber(Blockchain.block.timestamp)
    }

    getAxis(x: CommonAxisType , y: CommonAxisType) :string {
        return new Axis(x,y).toString()
    }

}

module.exports = DictContract