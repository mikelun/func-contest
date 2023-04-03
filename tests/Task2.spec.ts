import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Address, Cell, toNano } from 'ton-core';
import { Task2 } from '../wrappers/Task2';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task2', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task2');
    });

    let blockchain: Blockchain;
    let task2: SandboxContract<Task2>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        let address: string = 'EQDZkcnJG_SPHuUDfDuq9A62rMdrF94yAKUlZxMx8-7QAGkG';

        task2 = blockchain.openContract(
            Task2.createFromConfig(
                {
                    owner_address: Address.parse(address),
                },
                code
            )
        );

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task2.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task2.address,
            deploy: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task1 are ready to use
    });

    it('should get owner address', async () => {
        // should get_owner_address
        const ownerAddress = await task2.get_owner_address();


        expect(ownerAddress.toString()).toEqual('EQDZkcnJG_SPHuUDfDuq9A62rMdrF94yAKUlZxMx8-7QAGkG');
    });
});
