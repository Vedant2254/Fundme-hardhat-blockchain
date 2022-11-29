# Steps

1. Creating contracts and compiling them. For compiling we need to add `@chainlink/contracts` as dependency as we are using it in `PriceConverter.sol`.

2. Deploying using `scripts/deploy.js` is kind of a dirty way of deploying contracts we cannot keep track of what contracts are deployed, what are their addresses etc. The better way is to use `hardhat-deploy` package that makes deploying and tracking deployments alot easier.

3. We are using `AggregatorV3Interface` for getting the price conversions from Ether to USD. There are different Contract addresses for different blockchains, and we want this to be controlled dynamically without requiring to change the code for different addresses. So we update the code such that the address of the `AggregatorV3Interface` is passed to `FundMe.sol` as a parameter in constructor and the same Contract is passed to `PriceConverter.sol` through parameters.

4. Setting up `deploy/01-deploy-fundme.js`. Here we don't need to write the deployment script in main function and run it. We just need to export the script and it is automatically executed when we run `yarn hardhat deploy`. The `deploy` functionality in hardhat is provided by `hardhat-deploy` npm package.

5. For this project we are importing external smart contract. This smart contract is available on testnet and mainnet, but not on the local network. For this we create a mock contract for our local network so that we can test our application on local network. This is called mocking. **Mocking a contract essentially means creating a second version of that contract which behaves very similar to the original one, but in a way that can be easily controlled by the developer.**

6. We store these contracts in `contracts/test`, and create a deployment script for these mock contracts too.

7. Now after deployment we also want to verify the contract programatically. For this we create a new file `verify.js` in `utils` folder and import it in the deployment script to verify the contract.

8. Testing using hardhat test scripts. Writing these scripts and using `yarn hardhat test` to run the tests.

9. Understanding Storage in Solidity and how it can help in gas optimizations.
