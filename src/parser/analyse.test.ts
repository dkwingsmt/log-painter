import { analyse } from './analyse';
import { Configuration, GroupResult, AnalysedPlayer, AnalyseResult } from 'common';

it('should work for empty config', () => {
  const player1: AnalysedPlayer = {
    playerId: 'name:a',
    allPlayerIds: ['name:a'],
    name: 'a',
  };
  const player2: AnalysedPlayer = {
    playerId: 'name:b',
    allPlayerIds: ['name:b'],
    name: 'b',
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
  const oldConfig: Configuration = {
    players: {},
  };
  const analyseResult: AnalyseResult = analyse(groupResult, oldConfig);
  expect(analyseResult).toMatchSnapshot();
});

it('should work when some players have filled starting colors', () => {
  const player1: AnalysedPlayer = {
    playerId: 'name:a',
    allPlayerIds: ['name:a'],
    name: 'a',
  };
  const player2: AnalysedPlayer = {
    playerId: 'name:b',
    allPlayerIds: ['name:b'],
    name: 'b',
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
    ]
  };
  const oldConfig: Configuration = {
    players: {
      'name:a': {
        enabled: true,
        displayName: 'A',
        color: 'black',
      },
      'name:d': {
        enabled: true,
        displayName: 'D',
        color: 'silver',
      },
    },
  };
  const analyseResult: AnalyseResult = analyse(groupResult, oldConfig);
  expect(analyseResult).toMatchSnapshot();
});