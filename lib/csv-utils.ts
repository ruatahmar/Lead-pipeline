// import Papa from 'papaparse';
// import { RowData } from './store';

// export const parseCSV = (file: File): Promise<RowData[]> => {
//     return new Promise((resolve, reject) => {
//         Papa.parse(file, {
//             header: true,
//             skipEmptyLines: true,
//             complete: (results) => {
//                 resolve(results.data as RowData[]);
//             },
//             error: (error) => {
//                 reject(error);
//             },
//         });
//     });
// };

// export const exportCSV = (data: RowData[], filename: string = 'data.csv') => {
//     const csv = Papa.unparse(data);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     if (link.download !== undefined) {
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', filename);
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }
// };


// const LEGAL_SUFFIXES = [
//     /\s+pvt\.?\s*ltd\.?$/i,
//     /\s+private\s+limited$/i,
//     /\s+private\s+ltd\.?$/i,
//     /\s+llc\.?$/i,
//     /\s+llp\.?$/i,
//     /\s+inc\.?$/i,
//     /\s+incorporated$/i,
//     /\s+corp\.?$/i,
//     /\s+corporation$/i,
//     /\s+limited$/i,
//     /\s+ltd\.?$/i,
//     /\s+plc\.?$/i,
//     /\s+pty\.?\s*ltd\.?$/i,
//     /\s+gmbh$/i,
//     /\s+srl$/i,
//     /\s+s\.a\.?$/i,
//     /[,\.]+$/,
// ];

// const COUNTRY_SUFFIXES = [
//     /\s+india$/i,
//     /\s+usa$/i,
//     /\s+u\.s\.a\.?$/i,
//     /\s+uk$/i,
//     /\s+u\.k\.?$/i,
//     /\s+united\s+states$/i,
//     /\s+united\s+kingdom$/i,
//     /\s+canada$/i,
//     /\s+australia$/i,
//     /\s+singapore$/i,
//     /\s+dubai$/i,
//     /\s+uae$/i,
// ];

// const JUNK_WORDS = new Set([
//     // prepositions
//     'for', 'with', 'in', 'at', 'by', 'of', 'to', 'from',
//     // articles
//     'the', 'a', 'an',
//     // descriptive
//     'best', 'top', 'new', 'next', 'smart', 'fast', 'easy',
//     'first', 'great', 'good', 'big', 'your', 'our', 'my',
//     // generic nouns that are never standalone brand names
//     'app', 'site', 'tool', 'platform', 'software', 'service',
//     'solution', 'product', 'business', 'startup', 'company',
// ]);

// export interface CleanResult {
//     cleaned: string;
//     needsLLM: boolean;
// }

// export function cleanCompanyName(input: string): CleanResult {
//     if (!input?.trim()) return { cleaned: '', needsLLM: false };

//     let name = input.trim();

//     // Step 1: Split on separators, take left side
//     const separatorMatch = name.match(/^([^|\-–—•:]+)[|\-–—•:]/);
//     if (separatorMatch) {
//         name = separatorMatch[1].trim();
//     }

//     // Step 2: Strip bracket/paren content
//     name = name.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();

//     // Step 3: Strip legal suffixes — run twice for compound ones
//     for (let pass = 0; pass < 2; pass++) {
//         for (const pattern of LEGAL_SUFFIXES) {
//             name = name.replace(pattern, '').trim();
//         }
//     }

//     // Step 4: Strip country suffixes
//     for (const pattern of COUNTRY_SUFFIXES) {
//         name = name.replace(pattern, '').trim();
//     }

//     // Step 5: Clean up leftover punctuation and whitespace
//     name = name
//         .replace(/^[\s,.\-–—|]+|[\s,.\-–—|]+$/g, '')
//         .replace(/\s{2,}/g, ' ')
//         .trim();

//     // Step 6: Check for junk words — if any found, send to LLM
//     const words = name.split(/\s+/).filter(Boolean);
//     const hasJunk = words.some(w => JUNK_WORDS.has(w.toLowerCase()));

//     if (hasJunk || name.length < 2) {
//         return { cleaned: input.trim(), needsLLM: true };
//     }

//     return { cleaned: name, needsLLM: false };
// }