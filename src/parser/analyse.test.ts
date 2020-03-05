import { analyse } from './analyse';
import { ParseResult, ParsedPlayer } from './parser_chat';
import { Configuration } from 'common';

it('should work for empty config', () => {
  const player1: ParsedPlayer = {
    name: 'a',
    title: 'A',
  };
  const player2: ParsedPlayer = {
    name: 'b',
    title: 'B',
  };
  const parseResult: ParseResult = {
    logLines: [
      {
        time: 'time1',
        player: player1,
        content: ['1', '2'],
      },
      {
        time: 'time2',
        player: player2,
        content: ['3'],
      },
      {
        time: 'time3',
        player: player1,
        content: ['4'],
      },
    ]
  };
  const oldConfig: Configuration = {
    players: {},
  };
  const analyseResult: AnalyseResult = analyse(parseResult, oldConfig);
  expect(analyseResult).toMatchSnapshot();
});