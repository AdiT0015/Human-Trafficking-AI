'use server';
/**
 * @fileOverview An AI-powered chatbot that provides information, guidance, and resources related to human trafficking.
 *
 * - aiSupportChatbot - A function that handles the chatbot interaction.
 * - AiSupportChatbotInput - The input type for the aiSupportChatbot function.
 * - AiSupportChatbotOutput - The return type for the aiSupportChatbot function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getHumanTraffickingOrganizations, submitHumanTraffickingReport} from '@/services/human-trafficking';

const AiSupportChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type AiSupportChatbotInput = z.infer<typeof AiSupportChatbotInputSchema>;

const AiSupportChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type AiSupportChatbotOutput = z.infer<typeof AiSupportChatbotOutputSchema>;

export async function aiSupportChatbot(input: AiSupportChatbotInput): Promise<AiSupportChatbotOutput> {
  return aiSupportChatbotFlow(input);
}

const submitReport = ai.defineTool({
  name: 'submitReport',
  description: 'Submits a report about a potential human trafficking incident.',
  inputSchema: z.object({
    description: z.string().describe('The description of the incident.'),
    location: z.string().describe('The location of the incident.'),
    dateTime: z.string().describe('The date and time of the incident.'),
  }),
  outputSchema: z.void(),
},
async input => {
    await submitHumanTraffickingReport({
      description: input.description,
      location: input.location,
      dateTime: input.dateTime,
    });
  }
);

const getOrganizations = ai.defineTool({
  name: 'getOrganizations',
  description: 'Retrieves a list of human trafficking organizations.',
  outputSchema: z.array(z.object({
    name: z.string(),
    website: z.string(),
    phoneNumber: z.string(),
  })),
}, async () => {
  return getHumanTraffickingOrganizations();
});

const qaPairs = [
  {
    question: 'What is human trafficking?',
    answer: 'Human trafficking is the illegal trade of humans for forced labor, sexual exploitation, or other forms of abuse.',
  },
  {
    question: 'What are common signs of trafficking?',
    answer: 'Signs include restricted movement, fearfulness, physical abuse, lack of documents, and someone speaking for the victim.',
  },
  {
    question: 'Who is most vulnerable to trafficking?',
    answer: 'Vulnerable populations include children, women, migrants, the homeless, and people in poverty or conflict zones.',
  },
  {
    question: 'Is human trafficking illegal in India?',
    answer: 'Yes, it is punishable under IPC Sections 370–373, the Immoral Traffic (Prevention) Act, and various child protection laws.',
  },
  {
    question: 'What is Section 370 of IPC?',
    answer: 'Section 370 defines human trafficking and lays out punishments ranging from 7 years to life imprisonment.',
  },
  {
    question: 'How can I report a trafficking case in India?',
    answer: 'Call the National Human Trafficking Helpline at +91-73040-11000 or dial 112 for immediate police help.',
  },
  {
    question: 'I think someone is being trafficked. What should I do?',
    answer: 'Do not confront the trafficker. Contact authorities or NGOs immediately with all available information.',
  },
  {
    question: 'Are there NGOs helping victims in India?',
    answer: 'Yes, NGOs like Prajwala, Bachpan Bachao Andolan, and Gudiya support victims with shelter, counseling, and legal help.',
  },
  {
    question: 'Can I remain anonymous while reporting?',
    answer: 'Yes. Most hotlines and reporting portals allow anonymous reporting.',
  },
  {
    question: 'How is AI used to fight trafficking?',
    answer: 'AI helps identify trafficking patterns, scan escort ads, monitor online grooming, and trace missing persons.',
  },
  {
    question: 'Has AI saved lives in trafficking cases?',
    answer: 'Yes, tools like Thorn’s Spotlight and Marinus Analytics’ Traffic Jam have helped rescue thousands worldwide.',
  },
  {
    question: 'Can AI detect child grooming online?',
    answer: 'Yes, tools like Microsoft’s Project Artemis use AI to detect and flag grooming behavior in online chats.',
  },
  {
    question: 'How can I help as a volunteer?',
    answer: 'Join awareness drives, donate to NGOs, report suspicious activity, or become a cyber volunteer at cybercrime.gov.in.',
  },
  {
    question: 'Can students participate in anti-trafficking work?',
    answer: 'Yes, many NGOs offer internships, campus campaigns, and youth advocacy programs.',
  },
  {
    question: 'Where can I learn more about trafficking prevention?',
    answer: 'Visit unodc.org or savemissinggirls.com for resources and training.',
  },
  {
    question: 'How many people are trafficked globally each year?',
    answer: 'Over 27 million people are estimated to be victims of human trafficking worldwide, according to the ILO and UNODC.',
  },
  {
    question: 'Which countries are most affected by human trafficking?',
    answer: 'Countries like India, Nigeria, the U.S., Thailand, and the Philippines have high trafficking activity—both as source and destination countries.',
  },
  {
    question: 'What international laws combat human trafficking?',
    answer: 'Key frameworks include the UN Palermo Protocol, ILO Conventions, and TIP Protocol under the UN Convention against Transnational Organized Crime.',
  },
  {
    question: 'What is the UN Palermo Protocol?',
    answer: 'It’s a global treaty adopted in 2000 to prevent, suppress, and punish trafficking, especially of women and children.',
  },
  {
    question: 'Who are the main victims of international trafficking?',
    answer: 'Women and children make up the majority, mostly for sexual exploitation and forced labor.',
  },
  {
    question: 'Are other countries using AI to fight trafficking?',
    answer: 'Yes, countries like the U.S., Canada, Australia, and UK use AI for monitoring ads, tracking online grooming, and identifying traffickers.',
  },
  {
    question: 'What is Thorn’s role in fighting trafficking?',
    answer: 'Thorn builds tech like Spotlight, which has helped law enforcement identify over 17,000 victims of child sex trafficking globally.',
  },
  {
    question: 'Can I report trafficking in another country?',
    answer: 'Yes. Contact the local authorities, embassies, or international hotlines like UNODC or Interpol tip lines.',
  },
  {
    question: 'What day is observed as World Day Against Trafficking?',
    answer: 'July 30 is marked as World Day Against Trafficking in Persons by the United Nations.',
  },
  {
    question: 'How can I help stop trafficking globally?',
    answer: 'Raise awareness, donate to organizations like Polaris, A21, ECPAT, and Walk Free, or volunteer locally or online.',
  },
];

const prompt = ai.definePrompt({
  name: 'aiSupportChatbotPrompt',
  input: {
    schema: z.object({
      message: z.string().describe('The user message to the chatbot.'),
    }),
  },
  output: {
    schema: z.object({
      response: z.string().describe('The chatbot response to the user message.'),
    }),
  },
  tools: [submitReport, getOrganizations],
  prompt: `You are an AI-powered chatbot designed to provide information, guidance, and resources related to human trafficking.

  Here are some common questions and their answers:
  ${qaPairs.map(qa => `Q: ${qa.question}\nA: ${qa.answer}`).join('\n\n')}

  If the user asks to submit a report, use the submitReport tool.
  If the user asks for a list of human trafficking organizations, use the getOrganizations tool.
  If the user asks a question that is similar to questions above, provide the answer as listed above.

  Respond to the following user message: {{{message}}}`,
});

const aiSupportChatbotFlow = ai.defineFlow<
  typeof AiSupportChatbotInputSchema,
  typeof AiSupportChatbotOutputSchema
>({
  name: 'aiSupportChatbotFlow',
  inputSchema: AiSupportChatbotInputSchema,
  outputSchema: AiSupportChatbotOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
