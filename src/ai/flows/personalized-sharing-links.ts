'use server';

/**
 * @fileOverview A flow to generate personalized sharing links for various platforms.
 *
 * - generateSharingLinks - A function that generates personalized sharing links.
 * - SharingLinksInput - The input type for the generateSharingLinks function.
 * - SharingLinksOutput - The return type for the generateSharingLinks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SharingLinksInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  designation: z.string().describe('The designation of the person.'),
  phone: z.string().describe('The phone number of the person.'),
  office: z.string().describe('The office address of the person.'),
  email: z.string().email().describe('The email address of the person.'),
  cardUrl: z.string().url().describe('The URL of the digital business card.'),
});
export type SharingLinksInput = z.infer<typeof SharingLinksInputSchema>;

const SharingLinksOutputSchema = z.object({
  whatsapp: z.string().url().describe('WhatsApp sharing link.'),
  sms: z.string().url().describe('SMS sharing link.'),
  linkedin: z.string().url().describe('LinkedIn sharing link.'),
  copyLink: z.string().url().describe('Direct link to copy.'),
});
export type SharingLinksOutput = z.infer<typeof SharingLinksOutputSchema>;

export async function generateSharingLinks(input: SharingLinksInput): Promise<SharingLinksOutput> {
  return sharingLinksFlow(input);
}

const sharingLinksPrompt = ai.definePrompt({
  name: 'sharingLinksPrompt',
  input: {schema: SharingLinksInputSchema},
  output: {schema: SharingLinksOutputSchema},
  prompt: `You are an expert in generating personalized sharing links for digital business cards.

Given the following information, generate sharing links for WhatsApp, SMS, and LinkedIn.
Consider the context and create links that are appropriate for each platform. Not all links might make sense.
If a certain platform does not make sense, return an empty string for the field. Never return null.

Name: {{{name}}}
Designation: {{{designation}}}
Phone: {{{phone}}}
Office: {{{office}}}
Email: {{{email}}}
Card URL: {{{cardUrl}}}

Output:
{
  "whatsapp": "whatsapp link",
  "sms": "sms link",
  "linkedin": "linkedin link",
  "copyLink": "direct link"
}
`,
});

const sharingLinksFlow = ai.defineFlow(
  {
    name: 'sharingLinksFlow',
    inputSchema: SharingLinksInputSchema,
    outputSchema: SharingLinksOutputSchema,
  },
  async input => {
    const baseUrl = input.cardUrl;
    const whatsappMessage = `Check out my digital business card: ${baseUrl}`;
    const smsMessage = `Check out my digital business card: ${baseUrl}`;
    const linkedinMessage = `Check out my digital business card: ${baseUrl}`;

    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    const smsLink = `sms:?body=${encodeURIComponent(smsMessage)}`;
    const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(linkedinMessage)}`;
    const copyLink = baseUrl;

    const llmInput = {
      ...input,
    };

    const {output} = await sharingLinksPrompt(llmInput);


    return {
      whatsapp: whatsappLink,
      sms: smsLink,
      linkedin: linkedinLink,
      copyLink: copyLink,
    };
  }
);
