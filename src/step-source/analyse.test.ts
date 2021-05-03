import { GroupResult, AnalysedPlayer } from 'step-source';
import { analyse, AnalyseResult } from './analyse';

function setOf(elements: string[]): Set<string> {
  const result = new Set<string>();
  for (const element of elements) {
    result.add(element);
  }
  return result;
}

it('should work for empty config', () => {
  const player1: AnalysedPlayer = {
    playerId: 'name:a',
    names: setOf(['a']),
  };
  const player2: AnalysedPlayer = {
    playerId: 'name:b',
    names: setOf(['b']),
  };
  const groupResult: GroupResult = {
    players: [
      player1,
      player2,
    ],
    lines: [
      {
        time: 'time1',
        playerId: player1.playerId,
        content: ['1', '2'],
        title: 'A',
      },
      {
        time: 'time2',
        playerId: player2.playerId,
        content: ['3'],
        title: 'B',
      },
      {
        time: 'time3',
        playerId: player1.playerId,
        content: ['4'],
        title: 'A',
      },
    ]
  };
  const analyseResult: AnalyseResult = analyse(groupResult);
  expect(analyseResult).toMatchSnapshot();
});
