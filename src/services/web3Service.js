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
      title: 'MetaMask Community Builder Night Delhi #3',
      description: 'Third edition of the MetaMask Community Builder Night in Delhi NCR. An evening of Web3 networking, live demos, and ecosystem deep dives with MetaMask/Consensys. Open to all Web3 builders — developers, designers, community organizers.',
      category: 'Builder Night',
      eventTimestamp: new Date('2026-06-21T17:00:00+05:30').getTime(),
      location: 'Delhi NCR · Venue TBA',
      hostName: '@its_punit05',
      bannerGradient: 'linear-gradient(135deg, #f6851b 0%, #e17726 100%)',
      rsvpLink: 'https://lu.ma/cbndelhijune',
      ipfsHash: 'QmBuilderBaseCBNDelhi3',
      isCancelled: false,
      rsvpCount: 47,
      rsvps: []
    },
    {
      id: 1,
      creator: '0x3216832168321683216832168321683216832168',
      title: 'QuantCraft Hackathon',
      description: '48-hour hackathon co-organized with Team Nexido. Focuses on onboarding student developers into EVM, smart contracts, and gas optimization layers.',
      category: 'Hackathon',
      eventTimestamp: new Date('2026-05-25T10:00:00+05:30').getTime(),
      location: 'Delhi NCR Campus',
      hostName: '@its_punit05',
      bannerGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      rsvpLink: 'https://https://luma.com/Builderbase',
      ipfsHash: 'QmQuantCraftHack2026',
      isCancelled: false,
      rsvpCount: 200,
      rsvps: []
    },
    {
      id: 2,
      creator: '0x3216832168321683216832168321683216832168',
      title: 'MetaMask Community Builder Night Delhi #2',
      description: 'Second edition of the Delhi MetaMask Builder Night. Deep dives into MetaMask SDK, Snaps, and Delegation Toolkit. Hosted at Unstop HQ.',
      category: 'Builder Night',
      eventTimestamp: new Date('2026-05-18T17:00:00+05:30').getTime(),
      location: 'Unstop HQ · Delhi',
      hostName: '@its_punit05',
      bannerGradient: 'linear-gradient(135deg, #f6851b 0%, #e17726 100%)',
      rsvpLink: 'https://https://luma.com/Builderbase',
      ipfsHash: 'QmBuilderBaseCBNDelhi2',
      isCancelled: false,
      rsvpCount: 120,
      rsvps: []
    },
    {
      id: 3,
      creator: '0x3216832168321683216832168321683216832168',
      title: 'MetaMask Community Builder Night Delhi #1',
      description: 'Inaugural MetaMask Builder Night in Delhi. Kicked off the Consensys × Builder Base partnership.',
      category: 'Builder Night',
      eventTimestamp: new Date('2026-04-05T17:00:00+05:30').getTime(),
      location: '91Springboard Mohan Estate · Delhi',
      hostName: '@its_punit05',
      bannerGradient: 'linear-gradient(135deg, #f6851b 0%, #e17726 100%)',
      rsvpLink: 'https://https://luma.com/Builderbase',
      ipfsHash: 'QmBuilderBaseCBNDelhi1',
      isCancelled: false,
      rsvpCount: 90,
      rsvps: []
    },
    {
      id: 4,
      creator: '0x8888888888888888888888888888888888888888',
      title: 'Classified Hack',
      description: 'Student hackathon onboarding developers into the Synthesis.md agentic platform. 434 registered, 165 completed.',
      category: 'Hackathon',
      eventTimestamp: new Date('2025-11-12T10:00:00+05:30').getTime(),
      location: 'Online',
      hostName: '@Synthesis',
      bannerGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      rsvpLink: 'https://https://luma.com/Builderbase',
      ipfsHash: 'QmClassifiedHack2025',
      isCancelled: false,
      rsvpCount: 165,
      rsvps: []
    },
    {
      id: 5,
      creator: '0x9999999999999999999999999999999999999999',
      title: 'Monad Blitz V3 Delhi',
      description: 'Co-hosted Monad hackathon in Delhi NCR. Builder Base team placed 1st Runner-Up.',
      category: 'Hackathon',
      eventTimestamp: new Date('2026-03-28T10:00:00+05:30').getTime(),
      location: '91Springboard Noida',
      hostName: '@Monad',
      bannerGradient: 'linear-gradient(135deg, #836ef9 0%, #4f0ff7 100%)',
      rsvpLink: 'https://https://luma.com/Builderbase',
      ipfsHash: 'QmMonadBlitzDelhi3',
      isCancelled: false,
      rsvpCount: 80,
      rsvps: []
    },
    {
      id: 6,
      creator: '0x8888888888888888888888888888888888888888',
      title: 'Builder Base × Midnight ZK Session',
      description: 'Educational deep dive into ZK privacy protocols with Midnight, organized with OSEN.',
      category: 'Workshop',
      eventTimestamp: new Date('2025-10-05T15:00:00+05:30').getTime(),
      location: 'Online',
      hostName: '@Midnight',
      bannerGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      rsvpLink: 'https://https://luma.com/Builderbase',
      ipfsHash: 'QmMidnightZKSession',
      isCancelled: false,
      rsvpCount: 60,
      rsvps: []
    },
    {
      id: 7,
      creator: '0x9999999999999999999999999999999999999999',
      title: 'Synthesis IRL Builder Day',
      description: 'IRL builder day bringing the Synthesis agentic platform to campus developers.',
      category: 'Workshop',
      eventTimestamp: new Date('2025-09-15T11:00:00+05:30').getTime(),
      location: 'Campus Auditorium',
      hostName: '@Synthesis',
      bannerGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      rsvpLink: 'https://https://luma.com/Builderbase',
      ipfsHash: 'QmSynthesisIRLBuilderDay',
      isCancelled: false,
      rsvpCount: 120,
      rsvps: []
    }
  ],
  bounties: [
    {
      id: 0,
      issuer: '0x3216832168321683216832168321683216832168',
      hunter: null,
      title: 'Build zkProof Verifier Smart Contract',
      description: 'Deploy an optimized Plonk verifier smart contract on Base Sepolia. The contract must verify proof elements generated from SnarkJS and include gas optimization tricks (like precompiled pairings). Must compile with Solidity 0.8.20.',
      rewardAmount: '0.40',
      tokenAddress: 'address(0)',
      status: 'Open',
      submissionLink: '',
      difficulty: 'Advanced',
      category: 'Development',
      applicants: [
        {
          wallet: '0x8888888888888888888888888888888888888888',
          pitch: 'I specialize in ZK and EVM research. I can construct the pairing check using precompiled contracts at address 0x08.'
        }
      ]
    },
    {
      id: 1,
      issuer: '0x3216832168321683216832168321683216832168',
      hunter: '0x8888888888888888888888888888888888888888',
      title: 'Audit Propulsion Labs Smart Contract',
      description: 'Perform a comprehensive security audit of our Propulsion Labs creator escrow contracts. Deliverables must include a vulnerability report highlighting potential reentrancy, access control leaks, or overflow risks.',
      rewardAmount: '0.50',
      tokenAddress: 'address(0)',
      status: 'InProgress',
      submissionLink: '',
      difficulty: 'Advanced',
      category: 'Security',
      applicants: [
        {
          wallet: '0x8888888888888888888888888888888888888888',
          pitch: 'I write EVM assembly and audit contracts regularly. Happy to perform the audit.'
        }
      ]
    },
    {
      id: 2,
      issuer: '0x3216832168321683216832168321683216832168',
      hunter: '0x9999999999999999999999999999999999999999',
      title: 'Design Glassmorphic DAO Dashboard Layout',
      description: 'Deliver responsive high-fidelity CSS and Figma files matching our neon-cyberpunk terminal design system. Design must utilize a 64px left sidebar, right-hand transaction log feed, and neon-glowing border widgets.',
      rewardAmount: '0.25',
      tokenAddress: 'address(0)',
      status: 'Completed',
      submissionLink: 'https://github.com/theBuilder-base/dao-portal/pull/1',
      difficulty: 'Intermediate',
      category: 'Design',
      applicants: [
        {
          wallet: '0x9999999999999999999999999999999999999999',
          pitch: 'React UI dev here. I have implemented multiple glassmorphic dashboards and CSS grids.'
        }
      ]
    },
    {
      id: 3,
      issuer: '0x3216832168321683216832168321683216832168',
      hunter: '0x1111111111111111111111111111111111111111',
      title: 'Draft API Getting-Started SDK Guides',
      description: 'Write a comprehensive Markdown guide showing how developers can integrate with the MetaMask SDK Snaps and register on-chain builder identity tags.',
      rewardAmount: '0.15',
      tokenAddress: 'address(0)',
      status: 'Completed',
      submissionLink: 'https://github.com/theBuilder-base/sdk-guides/pull/42',
      difficulty: 'Beginner',
      category: 'Writing',
      applicants: [
        {
          wallet: '0x1111111111111111111111111111111111111111',
          pitch: 'Technical writer for ZK/EVM protocols. Can deliver detailed developer guides.'
        }
      ]
    }
  ],
  directory: [
    {
      id: 0,
      name: 'PyVax Transpiler',
      description: 'Write Solidity logic in Python and compile directly to optimized EVM bytecode. Deployed on Avalanche Subnet.',
      category: 'Community Projects',
      link: 'https://github.com/ShahiTechnovation/pyvax',
      creator: '0x3216832168321683216832168321683216832168',
      upvotes: 240,
      upvoters: []
    },
    {
      id: 1,
      name: 'Bloopa Credit Protocol',
      description: 'ARC-4 compliant on-chain credit scoring and credit issuance protocol for autonomous AI agents on Algorand.',
      category: 'Community Projects',
      link: 'https://github.com/ShahiTechnovation',
      creator: '0x3216832168321683216832168321683216832168',
      upvotes: 180,
      upvoters: []
    },
    {
      id: 2,
      name: 'Base CLI Contract Deployer',
      description: 'Zero-config command-line tool to deploy and instantly verify Solidity contracts on Base Sepolia and Mainnet.',
      category: 'Dev Tools',
      link: 'https://github.com/builderbase/deployer',
      creator: '0x9999999999999999999999999999999999999999',
      upvotes: 89,
      upvoters: []
    },
    {
      id: 3,
      name: 'MetaMask SDK & Snaps',
      description: 'Extend MetaMask wallet functionalities with custom API execution, transaction insights, and key validations.',
      category: 'Dev Tools',
      link: 'https://metamask.io/snaps/',
      creator: '0x3216832168321683216832168321683216832168',
      upvotes: 310,
      upvoters: []
    },
    {
      id: 4,
      name: 'Ethereum Foundation ESP Grant',
      description: 'Grants and resources for core protocol upgrades, developer tools, and academic research.',
      category: 'Grants',
      link: 'https://esp.ethereum.org',
      creator: '0xDAO_Treasury',
      upvotes: 420,
      upvoters: []
    },
    {
      id: 5,
      name: 'Monad Ecosystem Grants',
      description: 'Funding opportunities for high-throughput scaling dApps deploying on the Monad network.',
      category: 'Grants',
      link: 'https://monad.xyz',
      creator: '0xDAO_Treasury',
      upvotes: 280,
      upvoters: []
    }
  ],
  members: {
    '0x3216832168321683216832168321683216832168': {
      wallet: '0x3216832168321683216832168321683216832168',
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: 'Punit Pal',
        username: 'its_punit05',
        bio: 'Founder @ Builder Base. Python & Solidity Dev. EVM researcher, writing transpilers for breakfast.',
        website: 'https://impure.me',
        location: 'Delhi NCR, India',
        profession: 'Founder & Dev',
        country: 'India',
        skills: 'Solidity, Python, EVM, React'
      }),
      isRegistered: true,
      registrationTimestamp: Date.now()
    },
    '0x9999999999999999999999999999999999999999': {
      wallet: '0x9999999999999999999999999999999999999999',
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: 'Shashi Dev',
        username: 'shahitechnovation',
        bio: 'Building dApps and open source infrastructure. Active Builder Base chapter lead.',
        website: 'https://shahi.dev',
        location: 'Mumbai, India',
        profession: 'Fullstack Dev',
        country: 'India',
        skills: 'Next.js, Node.js, Hardhat'
      }),
      isRegistered: true,
      registrationTimestamp: Date.now()
    },
    '0x1111111111111111111111111111111111111111': {
      wallet: '0x1111111111111111111111111111111111111111',
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: 'Alice Vance',
        username: 'alice',
        bio: 'Solidity Architect & Security auditor. Deeply involved in ZK rollup research.',
        website: 'https://github.com/alicev',
        location: 'Bengaluru, India',
        profession: 'Solidity Architect',
        country: 'India',
        skills: 'Solidity, Auditing, ZK'
      }),
      isRegistered: true,
      registrationTimestamp: Date.now()
    },
    '0x5555555555555555555555555555555555555555': {
      wallet: '0x5555555555555555555555555555555555555555',
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: 'Bob Builder',
        username: 'bob_builds',
        bio: 'UI/UX engineer specializing in Web3 terminal dashboards and CSS micro-animations.',
        website: 'https://bob.build',
        location: 'Delhi NCR, India',
        profession: 'UI/UX Engineer',
        country: 'India',
        skills: 'CSS, React, GSAP, SVG'
      }),
      isRegistered: true,
      registrationTimestamp: Date.now()
    },
    '0x8888888888888888888888888888888888888888': {
      wallet: '0x8888888888888888888888888888888888888888',
      profileType: 'builder',
      profileIpfsHash: JSON.stringify({
        displayName: 'Impure.eth',
        username: 'Impure_eth',
        bio: 'EVM optimization researcher. Writing Yul instructions and optimizing gas.',
        website: 'https://impure.eth',
        location: 'Remote',
        profession: 'EVM Researcher',
        country: 'Germany',
        skills: 'EVM, Yul, Go-Ethereum'
      }),
      isRegistered: true,
      registrationTimestamp: Date.now()
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
