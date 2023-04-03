import { Address, toNano } from 'ton-core';
import { Task2 } from '../wrappers/Task2';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Contract address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write('Contract is not deployed');
        return;
    }

    const task2 = provider.open(Task2.createFromAddress(address));

    const result = await task2.get_owner_address();

    ui.write(`ADDRESS: ${result}`);
}
