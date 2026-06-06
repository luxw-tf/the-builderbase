// Web3 Service layer to interact with smart contracts on Base Sepolia or simulate operations locally
// Persistence is maintained via localStorage so data remains active across page reloads.

const LOCAL_STORAGE_KEY = 'builder_base_onchain_data';

// Helper to generate a random transaction hash for Web3 aesthetics
const generateTxHash = () => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

// Default seed data to populate the platform on first load
const defaultData = {
  events: [
    {
      id: 0,
      creator: '0x3216832168321683216832168321683216832168',
      title: 'Base Sepolia Buildathon 2026',
      description: 'A 48-hour online hackathon to build consumer-facing applications, social dApps, and tools on the Base network. Staking pool rewards and gas subsidies provided.',
      category: 'Hackathon',
      eventTimestamp: new Date('2026-07-12T10:00:00Z').getTime(),
      location: 'Zoom Webinar & Discord Stage',
      hostName: '@builderbase',
      bannerGradient: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
      rsvpLink: 'https://lu.ma/base-buildathon',
      ipfsHash: 'QmXoyp1sW3WnJGSd2891349813941',
      isCancelled: false,
      rsvpCount: 42,
      rsvps: ['0x1111111111111111111111111111111111111111']
    },
    {
      id: 1,
      creator: '0x8888888888888888888888888888888888888888',
      title: 'Gas Optimization and Yul Deep Dive',
      description: 'Technical masterclass on optimizing Solidity smart contracts, understanding the EVM memory model, and writing assembly (Yul) for production deployment.',
      category: 'Workshop',
      eventTimestamp: new Date('2026-06-25T16:00:00Z').getTime(),
      location: 'Google Meet Platform',
      hostName: '@Impure_eth',
      bannerGradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      rsvpLink: 'https://lu.ma/solidity-yul-class',
      ipfsHash: 'QmYoyp1sW3WnJGSd9876543210123',
      isCancelled: false,
      rsvpCount: 18,
      rsvps: []
    },
    {
      id: 2,
      creator: '0x9999999999999999999999999999999999999999',
      title: 'DAO Weekly Ecosystem Sync',
      description: 'Weekly voice call to discuss upcoming grants, project status updates, governance proposal review, and ecosystem milestones. Join via Discord Stage.',
      category: 'Meetup',
      eventTimestamp: new Date('2026-06-15T18:00:00Z').getTime(),
      location: 'Discord Voice Lounge',
      hostName: '@shahitechnovation',
      bannerGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      rsvpLink: 'https://discord.gg/builderbase',
      ipfsHash: 'QmZoyp1sW3WnJGSd1112223334445',
      isCancelled: false,
      rsvpCount: 29,
      rsvps: []
    }
  ],
  bounties: [
    {
      id: 0,
      issuer: '0x3216832168321683216832168321683216832168',
      hunter: null,
      title: 'Design Glassmorphic DAO Dashboard Layout',
      description: 'We need high-fidelity responsive UI designs for our upcoming DAO Voting and Treasury portal. Deliverables should include Figma links, custom SVG assets, and a styling token set matching our neon-cybernetic theme.',
      rewardAmount: '0.25',
      tokenAddress: 'address(0)', // Native ETH
      status: 'Open', // Open, InProgress, Submitted, Completed, Cancelled
      submissionLink: '',
      difficulty: 'Intermediate',
      category: 'Design',
      applicants: [
        {
          wallet: '0x5555555555555555555555555555555555555555',
          pitch: 'I have designed UI kits for 3 major DeFi protocols. I specialize in futuristic glassmorphism and light-weight CSS animations.'
        }
      ]
    },
    {
      id: 1,
      issuer: '0x7777777777777777777777777777777777777777',
      hunter: '0x9999999999999999999999999999999999999999',
      title: 'Integrate ERC-20 Support in Bounties Escrow',
      description: 'Audit and modify the current smart contract to accept custom ERC-20 tokens (like USDC/USDT) instead of just native ETH. Add secure transfer checks, reentrancy guards, and complete Hardhat test suites.',
      rewardAmount: '0.50',
      tokenAddress: 'address(0)',
      status: 'InProgress',
      submissionLink: '',
      difficulty: 'Advanced',
      category: 'Development',
      applicants: [
        {
          wallet: '0x9999999999999999999999999999999999999999',
          pitch: 'Solidity Dev with 3 years of auditing experience. Happy to tackle the ERC20 integration safely.'
        }
      ]
    },
    {
      id: 2,
      issuer: '0x4444444444444444444444444444444444444444',
      hunter: '0x1111111111111111111111111111111111111111',
      title: 'Draft API Getting-Started SDK Guides',
      description: 'Write complete developer tutorials and copy-pasteable script recipes showing how to query the Builder Base Indexer API. Output must be in markdown.',
      rewardAmount: '0.15',
      tokenAddress: 'address(0)',
      status: 'Completed',
      submissionLink: 'https://github.com/builderbase/sdk/pull/42',
      difficulty: 'Beginner',
      category: 'Writing',
      applicants: [
        {
          wallet: '0x1111111111111111111111111111111111111111',
          pitch: 'I am a technical writer specializing in Web3 developer onboarding materials.'
        }
      ]
    }
  ],
  directory: [
    {
      id: 0,
      name: 'Base CLI Contract Deployer',
      description: 'Zero-config command-line tool to deploy and instantly verify Solidity contracts on Base Sepolia and Mainnet.',
      category: 'Developer Tools',
      link: 'https://github.com/builderbase/deployer',
      creator: '0x1212121212121212121212121212121212121212',
      upvotes: 56,
      upvoters: []
    },
    {
      id: 1,
      name: 'MemeFlow Streaming',
      description: 'Micro-payment streaming protocol for creators. Stream cents of native ETH per second of video viewed on-chain.',
      category: 'Startups',
      link: 'https://memeflow.io',
      creator: '0x9090909090909090909090909090909090909090',
      upvotes: 34,
      upvoters: []
    },
    {
      id: 2,
      name: 'Base Gas Optimization Subsidies',
      description: 'A DAO grant opportunity supporting early-stage dApps with gas refunds up to 1 ETH for smart contract activities.',
      category: 'Grants & Opportunities',
      link: 'https://builderbase.dao/grants/gas',
      creator: '0xDAO_Treasury',
      upvotes: 120,
      upvoters: []
    }
  ],
  members: {
    '0x1111111111111111111111111111111111111111': {
      wallet: '0x1111111111111111111111111111111111111111',
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: 'Alice Vance',
        username: 'alice',
        bio: 'Solidity Architect & Security auditor. Loving Base ecosystem.',
        website: 'https://github.com/alicev',
        location: 'Paris, France',
        profession: 'Solidity Architect',
        country: 'France',
        skills: 'Solidity, Auditing, Yul'
      }),
      isRegistered: true,
      registrationTimestamp: 1780748460563
    },
    '0x5555555555555555555555555555555555555555': {
      wallet: '0x5555555555555555555555555555555555555555',
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: 'Bob Builder',
        username: 'bob_builds',
        bio: 'Frontend wizard specializing in high fidelity CSS and SVG animations.',
        website: 'https://bob.build',
        location: 'San Francisco, CA',
        profession: 'UI/UX Engineer',
        country: 'USA',
        skills: 'React, CSS, SVG, GSAP'
      }),
      isRegistered: true,
      registrationTimestamp: 1780748460563
    },
    '0x9999999999999999999999999999999999999999': {
      wallet: '0x9999999999999999999999999999999999999999',
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: 'Shahi Dev',
        username: 'shahitechnovation',
        bio: 'Building dApps and infrastructure on Base. Active DAO organizer.',
        website: 'https://shahi.dev',
        location: 'Mumbai, India',
        profession: 'Fullstack Dev',
        country: 'India',
        skills: 'NextJS, Node, Hardhat'
      }),
      isRegistered: true,
      registrationTimestamp: 1780748460563
    },
    '0x8888888888888888888888888888888888888888': {
      wallet: '0x8888888888888888888888888888888888888888',
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: 'Impure.eth',
        username: 'Impure_eth',
        bio: 'EVM Researcher & optimizer. Writing Yul for breakfast.',
        website: 'https://impure.eth',
        location: 'Remote',
        profession: 'EVM Researcher',
        country: 'Germany',
        skills: 'EVM, Yul, Go-Ethereum'
      }),
      isRegistered: true,
      registrationTimestamp: 1780748460563
    }
  }
};

// Retrieve data from localStorage or initialize with seed data
const getStore = () => {
  const store = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!store) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  try {
    const parsed = JSON.parse(store);
    // Clear / upgrade legacy data if missing RSVP link or empty members
    if (parsed.events && parsed.events.length > 0 && !parsed.events[0].rsvpLink) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultData));
      return defaultData;
    }
    if (!parsed.members || Object.keys(parsed.members).length === 0) {
      parsed.members = defaultData.members;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    console.error("Failed parsing web3 store", e);
    return defaultData;
  }
};

const saveStore = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// Delay simulation for realistic transaction processing
const simulateDelay = (ms = 1200) => new Promise(resolve => setTimeout(resolve, ms));

export const Web3Service = {
  // --- Events / Calendar ---
  getEvents: async () => {
    await simulateDelay(400);
    return getStore().events;
  },

  getMembers: async () => {
    await simulateDelay(300);
    return getStore().members;
  },

  createEvent: async (title, description, category, timestamp, location, hostName, bannerGradient, rsvpLink, creatorAddress) => {
    // Simulate transaction request
    await simulateDelay(1500);
    
    const store = getStore();
    const newEvent = {
      id: store.events.length,
      creator: creatorAddress,
      title,
      description,
      category,
      eventTimestamp: new Date(timestamp).getTime(),
      location: location || 'Discord Voice Lounge',
      hostName: hostName || `@builder`,
      bannerGradient: bannerGradient || 'linear-gradient(135deg, #1f1f2e 0%, #0f0f15 100%)',
      rsvpLink: rsvpLink || 'https://lu.ma',
      ipfsHash: `Qm${generateTxHash().substring(2, 28)}`,
      isCancelled: false,
      rsvpCount: 0,
      rsvps: []
    };

    store.events.push(newEvent);
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash(),
      event: newEvent
    };
  },

  rsvpToEvent: async (eventId, userAddress) => {
    await simulateDelay(1000);
    const store = getStore();
    const event = store.events.find(e => e.id === eventId);
    
    if (!event) throw new Error("Event not found");
    if (event.isCancelled) throw new Error("Event is cancelled");
    if (event.rsvps.includes(userAddress.toLowerCase())) throw new Error("Already RSVPed");

    event.rsvps.push(userAddress.toLowerCase());
    event.rsvpCount++;
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash(),
      rsvpCount: event.rsvpCount
    };
  },

  cancelRsvp: async (eventId, userAddress) => {
    await simulateDelay(800);
    const store = getStore();
    const event = store.events.find(e => e.id === eventId);
    
    if (!event) throw new Error("Event not found");
    
    const index = event.rsvps.indexOf(userAddress.toLowerCase());
    if (index === -1) throw new Error("No RSVP found for this user");

    event.rsvps.splice(index, 1);
    event.rsvpCount--;
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash(),
      rsvpCount: event.rsvpCount
    };
  },

  cancelEvent: async (eventId, userAddress) => {
    await simulateDelay(1200);
    const store = getStore();
    const event = store.events.find(e => e.id === eventId);
    
    if (!event) throw new Error("Event not found");
    if (event.creator.toLowerCase() !== userAddress.toLowerCase()) {
      throw new Error("Only the creator can cancel this event");
    }

    event.isCancelled = true;
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash()
    };
  },

  // --- Bounties & Gigs ---
  getBounties: async () => {
    await simulateDelay(500);
    return getStore().bounties;
  },

  createBounty: async (title, description, rewardAmount, difficulty, category, tokenAddress, issuerAddress) => {
    await simulateDelay(2000); // Higher delay to simulate staking/locking transaction in escrow
    const store = getStore();
    const newBounty = {
      id: store.bounties.length,
      issuer: issuerAddress,
      hunter: null,
      title,
      description,
      rewardAmount,
      tokenAddress: tokenAddress || 'address(0)',
      status: 'Open',
      submissionLink: '',
      difficulty,
      category,
      applicants: []
    };

    store.bounties.push(newBounty);
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash(),
      bounty: newBounty
    };
  },

  applyForBounty: async (bountyId, pitch, userAddress) => {
    await simulateDelay(1000);
    const store = getStore();
    const bounty = store.bounties.find(b => b.id === bountyId);
    
    if (!bounty) throw new Error("Bounty not found");
    if (bounty.status !== 'Open') throw new Error("Bounty is not open for applications");
    if (bounty.issuer.toLowerCase() === userAddress.toLowerCase()) throw new Error("Issuer cannot apply");
    if (bounty.applicants.some(a => a.wallet.toLowerCase() === userAddress.toLowerCase())) {
      throw new Error("Already applied for this bounty");
    }

    bounty.applicants.push({
      wallet: userAddress,
      pitch
    });
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash()
    };
  },

  assignBounty: async (bountyId, hunterAddress, issuerAddress) => {
    await simulateDelay(1200);
    const store = getStore();
    const bounty = store.bounties.find(b => b.id === bountyId);
    
    if (!bounty) throw new Error("Bounty not found");
    if (bounty.issuer.toLowerCase() !== issuerAddress.toLowerCase()) {
      throw new Error("Only the bounty issuer can assign it");
    }
    if (bounty.status !== 'Open') throw new Error("Bounty is not open");
    
    const hasApplied = bounty.applicants.some(a => a.wallet.toLowerCase() === hunterAddress.toLowerCase());
    if (!hasApplied) throw new Error("Target hunter has not applied");

    bounty.hunter = hunterAddress;
    bounty.status = 'InProgress';
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash()
    };
  },

  submitWork: async (bountyId, submissionLink, hunterAddress) => {
    await simulateDelay(1200);
    const store = getStore();
    const bounty = store.bounties.find(b => b.id === bountyId);
    
    if (!bounty) throw new Error("Bounty not found");
    if (!bounty.hunter || bounty.hunter.toLowerCase() !== hunterAddress.toLowerCase()) {
      throw new Error("Only the assigned hunter can submit work");
    }
    if (bounty.status !== 'InProgress') throw new Error("Bounty is not currently in progress");

    bounty.submissionLink = submissionLink;
    bounty.status = 'Submitted';
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash()
    };
  },

  approveSubmission: async (bountyId, issuerAddress) => {
    await simulateDelay(1800); // Simulates gas escrow payout transaction
    const store = getStore();
    const bounty = store.bounties.find(b => b.id === bountyId);
    
    if (!bounty) throw new Error("Bounty not found");
    if (bounty.issuer.toLowerCase() !== issuerAddress.toLowerCase()) {
      throw new Error("Only the bounty issuer can approve submissions");
    }
    if (bounty.status !== 'Submitted') throw new Error("No submissions to approve");

    bounty.status = 'Completed';
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash()
    };
  },

  cancelBounty: async (bountyId, issuerAddress) => {
    await simulateDelay(1500); // Simulates gas escrow refund transaction
    const store = getStore();
    const bounty = store.bounties.find(b => b.id === bountyId);
    
    if (!bounty) throw new Error("Bounty not found");
    if (bounty.issuer.toLowerCase() !== issuerAddress.toLowerCase()) {
      throw new Error("Only the bounty issuer can cancel it");
    }
    if (bounty.status !== 'Open') throw new Error("Can only cancel Open bounties");

    bounty.status = 'Cancelled';
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash()
    };
  },

  // --- Ecosystem Directory ---
  getDirectory: async () => {
    await simulateDelay(300);
    return getStore().directory;
  },

  addDirectoryItem: async (name, description, category, link, creatorAddress) => {
    await simulateDelay(1000);
    const store = getStore();
    const newItem = {
      id: store.directory.length,
      name,
      description,
      category,
      link,
      creator: creatorAddress,
      upvotes: 1,
      upvoters: [creatorAddress.toLowerCase()]
    };

    store.directory.push(newItem);
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash(),
      item: newItem
    };
  },

  upvoteDirectoryItem: async (itemId, userAddress) => {
    await simulateDelay(500);
    const store = getStore();
    const item = store.directory.find(d => d.id === itemId);
    
    if (!item) throw new Error("Directory item not found");
    
    const formattedUser = userAddress.toLowerCase();
    const index = item.upvoters.indexOf(formattedUser);

    if (index === -1) {
      // Upvote
      item.upvoters.push(formattedUser);
      item.upvotes++;
    } else {
      // Remove upvote
      item.upvoters.splice(index, 1);
      item.upvotes--;
    }

    saveStore(store);

    return {
      success: true,
      upvotes: item.upvotes,
      hasUpvoted: index === -1
    };
  },

  // --- Member Profiles & Gas-Sponsored Registry ---
  getMember: async (userAddress) => {
    await simulateDelay(300);
    const store = getStore();
    return store.members[userAddress.toLowerCase()] || null;
  },

  registerMember: async (userAddress) => {
    await simulateDelay(2200); // Simulate paymaster signing and contract registration
    const store = getStore();
    const formattedAddress = userAddress.toLowerCase();

    if (store.members[formattedAddress]) {
      return { success: true, member: store.members[formattedAddress], sponsored: true };
    }

    const newMember = {
      wallet: userAddress,
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: '',
        username: '',
        bio: '',
        website: '',
        location: '',
        profession: '',
        country: '',
        skills: ''
      }),
      isRegistered: true,
      registrationTimestamp: Date.now()
    };

    store.members[formattedAddress] = newMember;
    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash(),
      member: newMember,
      sponsored: true
    };
  },

  updateProfile: async (userAddress, profileData) => {
    await simulateDelay(1200);
    const store = getStore();
    const formattedAddress = userAddress.toLowerCase();
    
    if (!store.members[formattedAddress]) {
      throw new Error("Member is not registered");
    }

    const member = store.members[formattedAddress];
    member.profileType = 'builder';
    member.profileIpfsHash = JSON.stringify(profileData);

    saveStore(store);

    return {
      success: true,
      txHash: generateTxHash(),
      member
    };
  }
};
