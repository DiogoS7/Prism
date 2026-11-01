import { describe, it, expect } from 'vitest';
import { searchAll } from './search.js';
import { defects, requirements, testCases } from '../data/release.js';
import { testRunRows } from './metrics.js';

const sources = { defects, requirements, runs: testRunRows(requirements, testCases) };

describe('searchAll', () => {
  it('returns nothing for an empty query', () => {
    expect(searchAll('  ', sources)).toEqual([]);
  });

  it('finds an item by exact id and sends it to the right view', () => {
    const [first] = searchAll('DEF-1042', sources);
    expect(first).toMatchObject({ type: 'defect', id: 'DEF-1042', view: 'defects' });
  });

  it('ranks id matches above title matches', () => {
    const results = searchAll('req-104', sources);
    expect(results[0].id).toBe('REQ-104');
  });

  it('searches across all three sources by title', () => {
    const types = new Set(searchAll('limit', sources, 20).map((r) => r.type));
    expect([...types].sort()).toEqual(['defect', 'requirement', 'test']);
  });

  it('respects the result limit', () => {
    expect(searchAll('e', sources, 5)).toHaveLength(5);
  });
});
