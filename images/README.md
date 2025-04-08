# Plugin for MatchP
MatchP is a match-targeted protocol based on blockchain. And hackathon is, of course, a match. So why not build an AI agent for our hackathon? That is what we try to implement for this agent.
We provide ACTIONs for answering questions about hackathon, especially for the wonderful AI Agent Hackathon held by TinTin, Flow and 0G.

Code built for answering information about the hackathon.
```            [
                {
                    user: "{{user1}}",
                    content: {
                        text: "Tell me about the hackathon",
                        action: "HACKATHON_HELP",
                    },
                },
                {
                    user: "MatchP Assistant",
                    content: {
                        text: "It's an AI Agent Hackathon held by TinTin, Flow and 0G from April 7th to 9th in Hong Kong!",
                        actions: ["HACKATHON_HELP"],
                    },
                },
            ],
```

This plugin is built on the template of [eliza-plugin-template][https://github.com/onflow/eliza-plugin-template/tree/bc6f8ff8ed9776aab597a2fad625aaea1b175f00], which is a eliza plugin for Flow blockchain, so install the dependencies at https://github.com/onflow/elizaOnFlow

The ACTION is implemented in src/actions/hackathon-assistant.ts, see this file for details.