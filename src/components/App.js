import React, { useEffect, useState } from "react";
import web3 from "../web3";
import Navbar from "./Navbar";
import Token from "../abis/Token.json";
import EthSwap from "../abis/EthSwap.json";
import Main from "./Main";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState();
  const [ethBalance, setEthBalance] = useState("0");
  const [token, setTokenContract] = useState();
  const [ethSwap, setEthSwapContract] = useState();
  const [tokenBalance, setTokenBalance] = useState("0");

  const loadBlockchainData = async () => {
    setLoading(true);
    const [account] = await web3.eth.getAccounts();
    setAddress(account);
    const ethBalance = await web3.eth.getBalance(account);
    setEthBalance(ethBalance);

    const networkId = await web3.eth.net.getId();

    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const tokenContract = new web3.eth.Contract(Token.abi, tokenData.address);
      setTokenContract(tokenContract);
      const tokenBalance = await tokenContract.methods
        .balanceOf(account)
        .call();
      setTokenBalance(tokenBalance.toString());
    } else {
      alert("Contract not deployed");
    }

    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwapContract = new web3.eth.Contract(
        EthSwap.abi,
        ethSwapData.address
      );
      setEthSwapContract(ethSwapContract);
    } else {
      alert("Contract not deployed");
    }
    setLoading(false);
  };

  const buyTokens = async (etherAmount) => {
    setLoading(true);
    await ethSwap.methods.buyTokens().send({ value: etherAmount, from: address });
    await loadBlockchainData()
    setLoading(false);
  };

  const sellTokens = async (tokenAmount) => {
    setLoading(true);
    // tell the blockchain to approve ethswap transaction to receive the token back
    await token.methods.approve(ethSwap._address, tokenAmount).send({ from: address });
    await ethSwap.methods.sellTokens(tokenAmount).send({ from: address });
    await loadBlockchainData()
    setLoading(false);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navbar address={address} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
              {loading ? (
                <p id="loader" className="text-center">
                  Loading...
                </p>
              ) : (
                <Main
                  ethBalance={ethBalance}
                  tokenBalance={tokenBalance}
                  buyTokens={buyTokens}
                  sellTokens={sellTokens}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
