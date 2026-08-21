import type { Event } from '../types';

/**
 * Robust CSV parser supporting quotes and commas inside fields.
 */
export const parseCsvText = (csvText: string): Event[] => {
  const lines: string[] = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      currentLine += char;
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }
      currentLine = '';
      if (char === '\r' && csvText[i + 1] === '\n') {
        i++;
      }
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  if (lines.length < 2) {
    throw new Error('CSV must contain a header row and at least one data row.');
  }

  const parseRow = (row: string): string[] => {
    const values: string[] = [];
    let val = '';
    let inside = false;

    for (let i = 0; i < row.length; i++) {
      const c = row[i];
      if (c === '"') {
        if (inside && row[i + 1] === '"') {
          val += '"';
          i++;
        } else {
          inside = !inside;
        }
      } else if (c === ',' && !inside) {
        values.push(val.trim());
        val = '';
      } else {
        val += c;
      }
    }
    values.push(val.trim());
    return values;
  };

  const headers = parseRow(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));

  const getCol = (rowValues: string[], possibleNames: string[]): string => {
    for (const name of possibleNames) {
      const idx = headers.indexOf(name.toLowerCase().replace(/[^a-z0-9]/g, ''));
      if (idx !== -1 && rowValues[idx] !== undefined) {
        return rowValues[idx];
      }
    }
    return '';
  };

  const parsedEvents: Event[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseRow(lines[i]);
    if (row.length === 0 || row.every((val) => !val)) continue;

    const title = getCol(row, ['title', 'eventname', 'name', 'event']) || `Imported Event ${i}`;
    const category = (getCol(row, ['category', 'type', 'tag']) || 'Workshop') as Event['category'];
    const date = getCol(row, ['date', 'eventdate', 'day']) || 'Fri, Nov 15';
    const time = getCol(row, ['time', 'eventtime', 'slot']) || '4:00 PM - 5:30 PM';
    const location = getCol(row, ['location', 'venue', 'room', 'place']) || 'Auditorium A';
    const clubName = getCol(row, ['clubname', 'club', 'organizer', 'host']) || 'TechSoc';
    const description = getCol(row, ['description', 'about', 'details', 'summary']) || 'Event imported via custom CSV data payload.';
    const attendeesStr = getCol(row, ['attendeescount', 'attendees', 'registered', 'count']);
    const attendeesCount = attendeesStr ? parseInt(attendeesStr, 10) || 120 : 120;
    const image = getCol(row, ['image', 'imageurl', 'thumbnail', 'photo']) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';

    parsedEvents.push({
      id: `csv-evt-${i}-${Date.now()}`,
      title,
      clubId: clubName.toLowerCase().replace(/[^a-z0-9]/g, ''),
      clubName,
      clubLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      category,
      date,
      time,
      location,
      image,
      description,
      attendeesCount,
      spotsLeft: 20,
      isLive: i === 1,
      startTimeIso: new Date(Date.now() + i * 86400000).toISOString(),
      endTimeIso: new Date(Date.now() + i * 86400000 + 7200000).toISOString(),
    });
  }

  return parsedEvents;
};

export const getSampleCsvString = (): string => {
  return `Title,Category,Date,Time,Location,Club,Description,Attendees,Image
"Product Teardown Challenge","Competition","Mon, Nov 10","3:00 PM - 5:00 PM","LT 201, Academic Block","TechSoc","Live teardown of top Indian fintech apps with cash prizes.","150","https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
"McKinsey Case Interview Sprint","Workshop","Tue, Nov 11","5:30 PM - 7:00 PM","Auditorium B","Consulting Club","Master profitability and market entry frameworks with McKinsey alumni.","210","https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
"Venture Capital Valuation Masterclass","Speaker Session","Wed, Nov 12","6:00 PM - 7:30 PM","MDC Hall","FinSec","Sequoia India Partner breakdowns term sheets and valuation multiples.","180","https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80"
"Inter-Batch Badminton Championship","Sports","Thu, Nov 13","7:00 PM - 9:30 PM","Sports Complex","SportsCom","Annual doubles badminton tournament across PGP1 and PGP2 batches.","95","https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"`;
};
