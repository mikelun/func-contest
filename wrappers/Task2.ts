import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
    TupleItemInt,
} from 'ton-core';

export type Task2Config = {
    owner_address: Address;
};

export function task2ConfigToCell(config: Task2Config): Cell {
    return beginCell().storeAddress(config.owner_address).endCell();
}

export class Task2 implements Contract {
    address: Address;

    constructor(address: Address, readonly init?: { code: Cell; data: Cell }) {
        this.address = address;
        console.log('Task2 address: ', address);
    }

    static createFromAddress(address: Address) {
        return new Task2(address);
    }

    static createFromConfig(config: Task2Config, code: Cell, workchain = 0) {
        const data = task2ConfigToCell(config);
        const init = { code, data };
        return new Task2(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async get_owner_address(provider: ContractProvider) {
        const result = await provider.get('get_owner_address', []);

        return result.stack.readAddress();
    }
}
