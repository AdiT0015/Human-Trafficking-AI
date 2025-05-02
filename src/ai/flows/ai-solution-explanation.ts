'use server';
/**
 * @fileOverview Explains how the AI solution works, including pattern detection,
 * suspicious activities, and technologies used.
 *
 * - aiSolutionExplanation - A function that generates the AI solution explanation.
 * - AiSolutionExplanationInput - The input type for the aiSolutionExplanation function.
 * - AiSolutionExplanationOutput - The return type for the aiSolutionExplanation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AiSolutionExplanationInputSchema = z.object({
  problemOverview: z
    .string()
    .describe('A summary of the human trafficking problem.'),
  technologiesUsed: z
    .string()
    .describe('List the AI technologies used in this solution.'),
});
export type AiSolutionExplanationInput = z.infer<
  typeof AiSolutionExplanationInputSchema
>;

const AiSolutionExplanationOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A detailed explanation of the AI solution.'),
});
export type AiSolutionExplanationOutput = z.infer<
  typeof AiSolutionExplanationOutputSchema
>;

export async function aiSolutionExplanation(
  input: AiSolutionExplanationInput
): Promise<AiSolutionExplanationOutput> {
  return aiSolutionExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSolutionExplanationPrompt',
  input: {
    schema: z.object({
      problemOverview: z
        .string()
        .describe('A summary of the human trafficking problem.'),
      technologiesUsed: z
        .string()
        .describe('List the AI technologies used in this solution.'),
    }),
  },
  output: {
    schema: z.object({
      explanation: z
        .string()
        .describe('A detailed explanation of the AI solution.'),
    }),
  },
  prompt: `You are an expert in explaining AI solutions to combat human trafficking.

  Given the problem overview and the technologies used, explain how the AI solution works, including how it detects patterns and suspicious activities.

  Problem Overview: {{{problemOverview}}}
  Technologies Used: {{{technologiesUsed}}}
  Explanation:`,
});

const aiSolutionExplanationFlow = ai.defineFlow<
  typeof AiSolutionExplanationInputSchema,
  typeof AiSolutionExplanationOutputSchema
>({
  name: 'aiSolutionExplanationFlow',
  inputSchema: AiSolutionExplanationInputSchema,
  outputSchema: AiSolutionExplanationOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
