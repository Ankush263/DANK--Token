// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


contract ERC20Token{

  string public name = "DANKUSH";   //Name of the Token
  string public symbol = "DANK";    //Symbol of the Token

  uint public decimal = 18;
  uint public totalSupply;    //How much tokens the founder owned
  address public founder;   //Address of the owner of the Token
  mapping(address => uint) balances;
  mapping(address => mapping(address => uint)) allowed;

  event Transfer(address indexed from, address indexed to, uint tokens);
  event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

  constructor() {

    founder = msg.sender;
    totalSupply = 100000;
    balances[msg.sender] = totalSupply;

  }

  function balanceOf(address tokenOwner) public view returns(uint) {
    
    return balances[tokenOwner];

  }

  function transfer(address to, uint tokens) payable public returns(bool success) {

    require(balances[msg.sender] >= tokens);
    balances[to] += tokens;
    balances[msg.sender] -= tokens;
    emit Transfer(msg.sender, to, tokens);
    return true;

  }

  function approve(address spender, uint tokens) public returns(bool success) {

    require(balances[msg.sender] >= tokens);
    require(tokens > 0);
    allowed[msg.sender][spender] = tokens;
    emit Approval(msg.sender, spender, tokens);
    return true;

  }

  function allowance(address tokenOwner, address spender) public view returns(uint) {

    return allowed[tokenOwner][spender];

  }

  function transferFrom(address sender, address to, uint tokens) payable public  returns(bool success) {

    require(allowed[sender][to] >= tokens);
    require(balances[sender] >= 0);
    balances[sender] -= tokens;
    balances[to] += tokens;
    return true;

  }

}
