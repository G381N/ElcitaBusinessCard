import { NextResponse } from 'next/server';

export async function GET() {
  const name = process.env.NEXT_PUBLIC_PERSON_NAME || '';
  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');
  const role = process.env.NEXT_PUBLIC_PERSON_ROLE || '';
  const phone = process.env.NEXT_PUBLIC_PERSON_PHONE || '';
  const email = process.env.NEXT_PUBLIC_PERSON_EMAIL || '';
  const office = process.env.NEXT_PUBLIC_PERSON_OFFICE || '';
  const photoUrl = process.env.NEXT_PUBLIC_PERSON_PHOTO_URL || '';
  const company = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Elcita Ltd';

  // Construct the vCard string
  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${name}`,
    `ORG:${company}`,
    `TITLE:${role}`,
    `TEL;TYPE=WORK,VOICE:${phone}`,
    `EMAIL:${email}`,
    `ADR;TYPE=WORK:;;${office.replace(/,/g, '\\,')};;;;`,
    `PHOTO;VALUE=URL;TYPE=JPEG:${photoUrl}`,
    'END:VCARD',
  ].join('\n');

  // Return the vCard as a downloadable file
  return new NextResponse(vCard, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${name.replace(/\s/g, '_')}.vcf"`,
    },
  });
}
