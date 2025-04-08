import { inject, injectable } from "inversify";
import {
    elizaLogger,
    type ActionExample,
    type Action,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    type State,
} from "@elizaos/core";
import { globalContainer } from "@elizaos-plugins/plugin-di";


@injectable()
export class HackathonAssistantAction implements Action {
    public readonly name: string;
    public readonly similes: string[];
    public readonly description: string;
    public readonly examples: ActionExample[][];
    public readonly suppressInitialMessage: boolean;

    constructor() {
        this.name = "HACKATHON_ASSISTANT";
        this.similes = [
            "HACKATHON_INFO",
            "AI_HACKATHON",
            "BLOCKCHAIN_AGENT",
            "BUILD_AGENT"
        ];
        this.description = "Provides information and assistance for building AI agents on blockchain during the hackathon";
        this.examples = [
            [
                {
                    user: "{{user1}}",
                    content: {
                        text: "Tell me something about the hackathon",
                        action: "HACKATHON_HELP",
                    },
                },
                {
                    user: "MatchP Assistant",
                    content: {
                        text: "Like, zoinks! It's an AI Agent Hackathon held by TinTin, Flow and 0G from April 7th to 9th in Hong Kong!",
                        actions: ["HACKATHON_HELP"],
                    },
                },
            ],
            [
                {
                    user: "{{user1}}",
                    content: {
                        text: "How do I build a blockchain agent?",
                        action: "HACKATHON_HELP",
                    },
                },
                {
                    user: "MatchP Assistant",
                    content: {
                        text: "Ruh-roh! Building agents is easy with ElizaOS! First you'll need Node.js and the Flow CLI. Then check out the plugin template to built your own plugin!",
                        actions: ["HACKATHON_HELP"],
                    },
                },
            ],
        ];
        this.suppressInitialMessage = false;
    }

    async validate(_runtime: IAgentRuntime, message: Memory): Promise<boolean> {
        const content =
            typeof message.content === "string" ? message.content : message.content?.text;

        if (!content) return false;

        const keywords = ["hackathon", "build agent", "blockchain agent", "ai agent", "elizaos", "flow", "0g", "tintin"];
        return keywords.some((keyword) =>
            content.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    async handler(
        runtime: IAgentRuntime,
        message: Memory,
        _state?: State,
        _options?: Record<string, unknown>,
        callback?: HandlerCallback,
    ) {
        elizaLogger.log(`Starting ${this.name} handler...`);

        const responses = [
            "The AI Agent Hackathon is being held by TinTin, Flow and 0G from April 7th to 9th in Hong Kong!",
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        if (callback) {
            await callback({
                text: randomResponse,
                thought: "Providing hackathon information and agent development tips",
                actions: [this.name],
            });
        }

        elizaLogger.log(`Completed ${this.name} handler.`);
        return true;
    }
}

// Register the action
globalContainer.bind(HackathonAssistantAction).toSelf();
