// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract BuilderBaseBounties {
    enum BountyStatus { Open, InProgress, Submitted, Completed, Cancelled }

    struct Applicant {
        address wallet;
        string pitch;
    }

    struct Bounty {
        uint256 id;
        address payable issuer;
        address payable hunter;
        string title;
        string description;
        uint256 rewardAmount;
        address tokenAddress; // address(0) for native ETH, otherwise ERC20 address
        BountyStatus status;
        string submissionLink;
        uint256 applicantCount;
    }

    uint256 public nextBountyId;
    mapping(uint256 => Bounty) public bounties;
    // Maps bountyId to an array of applicants
    mapping(uint256 => Applicant[]) public bountyApplicants;
    // Maps bountyId to user address to see if they already applied
    mapping(uint256 => mapping(address => bool)) public hasApplied;

    event BountyCreated(uint256 indexed id, address indexed issuer, string title, uint256 reward, address token);
    event BountyApplied(uint256 indexed id, address indexed applicant, string pitch);
    event BountyAssigned(uint256 indexed id, address indexed hunter);
    event BountySubmitted(uint256 indexed id, string submissionLink);
    event BountyApproved(uint256 indexed id, address indexed hunter, uint256 payout);
    event BountyCancelled(uint256 indexed id);

    function createBounty(
        string calldata _title,
        string calldata _description,
        uint256 _rewardAmount,
        address _tokenAddress
    ) external payable returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        
        if (_tokenAddress == address(0)) {
            require(msg.value == _rewardAmount, "Must send exact ETH reward amount");
        } else {
            require(msg.value == 0, "Do not send ETH for token bounties");
            // Escrow ERC20 token (requires user to approve the contract first)
            bool success = IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _rewardAmount);
            require(success, "ERC20 transfer failed");
        }

        uint256 bountyId = nextBountyId++;
        Bounty storage newBounty = bounties[bountyId];
        newBounty.id = bountyId;
        newBounty.issuer = payable(msg.sender);
        newBounty.hunter = payable(address(0));
        newBounty.title = _title;
        newBounty.description = _description;
        newBounty.rewardAmount = _rewardAmount;
        newBounty.tokenAddress = _tokenAddress;
        newBounty.status = BountyStatus.Open;
        newBounty.submissionLink = "";
        newBounty.applicantCount = 0;

        emit BountyCreated(bountyId, msg.sender, _title, _rewardAmount, _tokenAddress);
        return bountyId;
    }

    function applyForBounty(uint256 _bountyId, string calldata _pitch) external {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.status == BountyStatus.Open, "Bounty is not open");
        require(msg.sender != bounty.issuer, "Issuer cannot apply");
        require(!hasApplied[_bountyId][msg.sender], "Already applied");

        hasApplied[_bountyId][msg.sender] = true;
        bountyApplicants[_bountyId].push(Applicant({
            wallet: msg.sender,
            pitch: _pitch
        }));
        bounty.applicantCount++;

        emit BountyApplied(_bountyId, msg.sender, _pitch);
    }

    function assignBounty(uint256 _bountyId, address payable _hunter) external {
        Bounty storage bounty = bounties[_bountyId];
        require(msg.sender == bounty.issuer, "Only issuer can assign");
        require(bounty.status == BountyStatus.Open, "Bounty is not open");
        require(hasApplied[_bountyId][_hunter], "User has not applied");

        bounty.hunter = _hunter;
        bounty.status = BountyStatus.InProgress;

        emit BountyAssigned(_bountyId, _hunter);
    }

    function submitWork(uint256 _bountyId, string calldata _submissionLink) external {
        Bounty storage bounty = bounties[_bountyId];
        require(msg.sender == bounty.hunter, "Only assigned hunter can submit");
        require(bounty.status == BountyStatus.InProgress, "Bounty not in progress");
        require(bytes(_submissionLink).length > 0, "Submission link empty");

        bounty.submissionLink = _submissionLink;
        bounty.status = BountyStatus.Submitted;

        emit BountySubmitted(_bountyId, _submissionLink);
    }

    function approveSubmission(uint256 _bountyId) external {
        Bounty storage bounty = bounties[_bountyId];
        require(msg.sender == bounty.issuer, "Only issuer can approve");
        require(bounty.status == BountyStatus.Submitted, "Bounty is not submitted");

        bounty.status = BountyStatus.Completed;
        uint256 payout = bounty.rewardAmount;

        if (bounty.tokenAddress == address(0)) {
            // Payout native ETH
            (bool success, ) = bounty.hunter.call{value: payout}("");
            require(success, "ETH transfer failed");
        } else {
            // Payout ERC20 token
            bool success = IERC20(bounty.tokenAddress).transfer(bounty.hunter, payout);
            require(success, "ERC20 transfer failed");
        }

        emit BountyApproved(_bountyId, bounty.hunter, payout);
    }

    function cancelBounty(uint256 _bountyId) external {
        Bounty storage bounty = bounties[_bountyId];
        require(msg.sender == bounty.issuer, "Only issuer can cancel");
        require(bounty.status == BountyStatus.Open, "Can only cancel open bounties");

        bounty.status = BountyStatus.Cancelled;
        uint256 refund = bounty.rewardAmount;

        if (bounty.tokenAddress == address(0)) {
            // Refund native ETH
            (bool success, ) = bounty.issuer.call{value: refund}("");
            require(success, "Refund failed");
        } else {
            // Refund ERC20 token
            bool success = IERC20(bounty.tokenAddress).transfer(bounty.issuer, refund);
            require(success, "ERC20 refund failed");
        }

        emit BountyCancelled(_bountyId);
    }

    function getApplicants(uint256 _bountyId) external view returns (Applicant[] memory) {
        return bountyApplicants[_bountyId];
    }
}
