// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BuilderBaseDAO {
    struct Member {
        address wallet;
        string profileType; // "farcaster", "wizzhq", "firstDollar"
        string profileIpfsHash; // JSON string or IPFS hash containing display name, bio, website, skills, etc.
        bool isRegistered;
        uint256 registrationTimestamp;
    }

    mapping(address => Member) public members;
    address[] public memberAddresses;
    
    event MemberRegistered(address indexed wallet, uint256 timestamp);
    event ProfileUpdated(address indexed wallet, string profileType, string profileIpfsHash);

    // Register a member. In a sponsored context, a paymaster pays the gas for this call.
    function registerMember(address _wallet) external {
        require(!members[_wallet].isRegistered, "Member already registered");
        
        members[_wallet] = Member({
            wallet: _wallet,
            profileType: "farcaster",
            profileIpfsHash: "",
            isRegistered: true,
            registrationTimestamp: block.timestamp
        });
        memberAddresses.push(_wallet);
        
        emit MemberRegistered(_wallet, block.timestamp);
    }

    // Update social profiles onchain
    function updateProfile(
        string calldata _profileType,
        string calldata _profileIpfsHash
    ) external {
        require(members[msg.sender].isRegistered, "Must be registered member");
        
        Member storage member = members[msg.sender];
        member.profileType = _profileType;
        member.profileIpfsHash = _profileIpfsHash;
        
        emit ProfileUpdated(msg.sender, _profileType, _profileIpfsHash);
    }

    function getMember(address _wallet) external view returns (Member memory) {
        return members[_wallet];
    }

    function getMemberCount() external view returns (uint256) {
        return memberAddresses.length;
    }
}
