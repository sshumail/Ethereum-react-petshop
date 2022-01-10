//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTERC721 is ERC721, Ownable {
  using Strings for uint256;
  using Counters for Counters.Counter;
  Counters.Counter private tokenIds;
  
  mapping(uint256 => string) private _tokenURIs;
  mapping(address => uint256[]) ownerTokens;
  
  string private _baseURIextended;
  
  constructor(
  
      )
      ERC721
      (
         "Q4", "$Q"
      ){
          _baseURIextended = "https://api.optimate.world/get_nft?token_id=";
      }
  
  function _baseURI() internal view virtual override returns (string memory){
      return _baseURIextended;
  }
  
  function tokenURI(uint256 tokenId) public view virtual override returns(string memory){
      require(_exists(tokenId), "ERC721Metadata: URI query for nonexisten token");
      string memory _tokenURI = _tokenURIs[tokenId];
      string memory base = _baseURI();
      
      if(bytes(_tokenURI).length > 0) {
          return string(abi.encodePacked(base,_tokenURI));
      }
      
      return string(abi.encodePacked(base, tokenId.toString()));
      
  }
  
  function mintNFT() public{
      require(msg.sender != address(0),"sender cannot be zero address");
      
      uint256 newTokenId =  tokenIds.current();
      _mint(msg.sender, newTokenId);
      tokenURI(newTokenId);
      ownerTokens[msg.sender].push(newTokenId);
      tokenIds.increment();
      
  }
  
  function totalSupply() external view returns(uint256) {
      return tokenIds.current();
  }
  
  function tokensOfOwner(address _owner) public view returns(uint256[] memory){
      return ownerTokens[_owner];
  }
  
  
  
  
}
