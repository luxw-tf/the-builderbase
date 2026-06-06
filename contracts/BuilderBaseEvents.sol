// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BuilderBaseEvents {
    struct Event {
        uint256 id;
        address creator;
        string title;
        string description;
        string category; // e.g. "Hackathon", "Meetup", "Workshop", "Demo Day"
        uint256 eventTimestamp;
        string ipfsHash; // details link or ipfs hash for richer details
        bool isCancelled;
        uint256 rsvpCount;
    }

    uint256 public nextEventId;
    mapping(uint256 => Event) public events;
    // Map event ID to mapping of user address to RSVP status
    mapping(uint256 => mapping(address => bool)) public hasRsvped;

    event EventCreated(uint256 indexed id, address indexed creator, string title, uint256 timestamp);
    event EventCancelled(uint256 indexed id);
    event Rsvped(uint256 indexed id, address indexed attendee);
    event RsvpCancelled(uint256 indexed id, address indexed attendee);

    function createEvent(
        string calldata _title,
        string calldata _description,
        string calldata _category,
        uint256 _eventTimestamp,
        string calldata _ipfsHash
    ) external returns (uint256) {
        require(_eventTimestamp > block.timestamp, "Event must be in the future");
        require(bytes(_title).length > 0, "Title cannot be empty");

        uint256 eventId = nextEventId++;
        events[eventId] = Event({
            id: eventId,
            creator: msg.sender,
            title: _title,
            description: _description,
            category: _category,
            eventTimestamp: _eventTimestamp,
            ipfsHash: _ipfsHash,
            isCancelled: false,
            rsvpCount: 0
        });

        emit EventCreated(eventId, msg.sender, _title, _eventTimestamp);
        return eventId;
    }

    function rsvpToEvent(uint256 _eventId) external {
        Event storage myEvent = events[_eventId];
        require(!myEvent.isCancelled, "Event is cancelled");
        require(myEvent.eventTimestamp > block.timestamp, "Event has already passed");
        require(!hasRsvped[_eventId][msg.sender], "Already RSVPed");

        hasRsvped[_eventId][msg.sender] = true;
        myEvent.rsvpCount++;

        emit Rsvped(_eventId, msg.sender);
    }

    function cancelRsvp(uint256 _eventId) external {
        Event storage myEvent = events[_eventId];
        require(hasRsvped[_eventId][msg.sender], "Have not RSVPed");
        require(myEvent.eventTimestamp > block.timestamp, "Event has already passed");

        hasRsvped[_eventId][msg.sender] = false;
        myEvent.rsvpCount--;

        emit RsvpCancelled(_eventId, msg.sender);
    }

    function cancelEvent(uint256 _eventId) external {
        Event storage myEvent = events[_eventId];
        require(msg.sender == myEvent.creator, "Only creator can cancel");
        require(!myEvent.isCancelled, "Already cancelled");

        myEvent.isCancelled = true;
        emit EventCancelled(_eventId);
    }

    function getEvent(uint256 _eventId) external view returns (
        uint256 id,
        address creator,
        string memory title,
        string memory description,
        string memory category,
        uint256 eventTimestamp,
        string memory ipfsHash,
        bool isCancelled,
        uint256 rsvpCount
    ) {
        Event memory myEvent = events[_eventId];
        return (
            myEvent.id,
            myEvent.creator,
            myEvent.title,
            myEvent.description,
            myEvent.category,
            myEvent.eventTimestamp,
            myEvent.ipfsHash,
            myEvent.isCancelled,
            myEvent.rsvpCount
        );
    }
}
