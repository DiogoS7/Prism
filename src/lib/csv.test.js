import { describe, it, expect } from 'vitest';
import { toCsv } from './csv.js';

describe('toCsv', () => {
  it('writes a header row and one line per record', () => {
    expect(toCsv([{ id: 'DEF-1', sev: 'High' }])).toBe('id,sev\r\nDEF-1,High');
  });

  it('quotes commas, quotes and line breaks', () => {
    const csv = toCsv([{ title: 'Limit, daily', note: 'says "no"\nthen' }]);
    expect(csv).toBe('title,note\r\n"Limit, daily","says ""no""\nthen"');
  });

  it('respects an explicit column order and blanks missing values', () => {
    expect(toCsv([{ a: 1 }], ['b', 'a'])).toBe('b,a\r\n,1');
  });

  it('handles an empty list', () => {
    expect(toCsv([])).toBe('');
  });
});
