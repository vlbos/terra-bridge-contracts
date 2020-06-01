pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "./installed/ERC827Token.sol";
import "./interfaces/IBurnableMintableToken.sol";

contract HomeToken is IBurnableMintableToken, ERC827Token, DetailedERC20, BurnableToken, MintableToken {

  constructor (string _name, string _symbol, uint8 _decimals)
  public
  DetailedERC20(_name, _symbol, _decimals)
  {

  }
//   /**
//   * @dev transfer token to a contract address with additional data if the recipient is a contact.
//   * @param _to The address to transfer to.
//   * @param _value The amount to be transferred.
//   * @param _data The extra data to be passed to the receiving contract.
//   */
//   function transferAndCall(address _to, uint _value, bytes _data)
//     public
//     returns (bool success)
//   {
//     super.transfer(_to, _value);
//     Transfer(msg.sender, _to, _value, _data);
//     if (isContract(_to)) {
//       contractFallback(_to, _value, _data);
//     }
//     return true;
//   }

  function finishMinting() public returns (bool) {
    revert();
  }
}
