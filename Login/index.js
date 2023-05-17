// Assuming you have Web3.js and Metamask installed and properly configured

const contractABI = [
  // Paste the contract ABI here

	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "UserLoggedIn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "loginUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}

];
const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"; // Replace with the address of your deployed smart contract

// Connect to Metamask provider
window.addEventListener('load', async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    window.web3 = new Web3(window.ethereum);
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.error('Metamask not detected');
  }

  // Load the smart contract
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Register event listeners for the login and registration forms
  const signUpForm = document.querySelector('.sign_up form');
  const signInForm = document.querySelector('.sign_in form');

  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = signUpForm.querySelector('input[name="username"]').value;
    const email = signUpForm.querySelector('input[name="email"]').value;
    const password = signUpForm.querySelector('input[name="password"]').value;

    // Register the user by calling the smart contract function
    try {
      await contract.methods.registerUser(username, email, password).send({ from: web3.eth.defaultAccount });
      alert('User registered successfully');
    } catch (error) {
      console.error('Error during user registration:', error);
    }
  });

  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signInForm.querySelector('input[name="email"]').value;
    const password = signInForm.querySelector('input[name="password"]').value;

    // Login the user by calling the smart contract function
    try {
      const loggedIn = await contract.methods.loginUser(email, password).call({ from: web3.eth.defaultAccount });
      if (loggedIn) {
        alert('User logged in successfully');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during user login:', error);
    }
  });
});
