// import Type definitions
import { BigNumber } from "./bignumber";
import { LocalContractStorage, Blockchain, Descriptor, StorageMap, Event } from "./System";
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

// `type` here works like `typedef` in c++
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

const BigNumberDescriptor :Descriptor = {
    parse: function (value) {
        return new BigNumber(value);
    },
    stringify: function (o) {
        return o.toString(10);
    }
}

class DictContract {
    // Only for type annotations, 
    // In JavaScript, we don't need to declare member variable in the class, 
    // not in TypeScript though
    name: string;

    constructor() {
        // 一个猜测: 每次虚拟机都要执行合约构造方法，可能从 LocalContractStorage 获得成员变量的值
        LocalContractStorage.defineProperties(this, {
            name: null,
            price: BigNumberDescriptor
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

    // init function. 只有创建合约的时候执行
    init(name) {
        this.name = name;
    }

    // sure, you still have auto Type Inference
    getName() {
        return this.name
    }

    changeName(str :string) {
        this.name = str
    }

    // Test BigNumber and Type annotations for parameters
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


// Only one true exports???

module.exports = DictContract