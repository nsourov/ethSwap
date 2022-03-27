// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Token.sol";

contract EthSwap {
  string public name = "EthSwap Instant Exchange";
  Token public token;
  uint public rate = 100;

  event TokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event TokenSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(Token _token) {
    token = _token;
  }

  function buyTokens() payable public {
    // edemption rate  = number of token they recieve for 1 ether
    // tokenAmount = Amount of Ethereum * Redeption rate
    uint tokenAmount = msg.value * rate;
    // EthSwap should have enough balance
    require(token.balanceOf(address(this)) >= tokenAmount);
    token.transfer(msg.sender, tokenAmount);
    // Emit an event
    emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
  }

  function sellTokens(uint tokenAmount) payable public {
    // User can't sell more tokens than they have
    require(token.balanceOf(msg.sender) >= tokenAmount);
    uint etherAmount = tokenAmount  / rate;
    // EthSwap should have enough balance
    require(address(this).balance >= etherAmount);
    token.transferFrom(msg.sender, address(this), tokenAmount);
    payable(msg.sender).transfer(etherAmount);
    // Emit an event
    emit TokenSold(msg.sender, address(token), etherAmount, rate);
  }
}