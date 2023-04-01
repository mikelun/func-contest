import { Address, toNano } from 'ton-core';
import { Task1 } from '../wrappers/Task1';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Pascal address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write('Contract is not deployed');
        return;
    }

    const task1 = provider.open(Task1.createFromAddress(address));

    const gcd = await task1.get_gcd(BigInt(128), BigInt(64));

    ui.write(`GCD: ${gcd}`);
}
