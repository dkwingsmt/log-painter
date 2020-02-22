import compact from 'lodash/compact';
import flow from 'lodash/flow';

export interface ParsedPlayer {
  name: string;
  number?: string;
  title?: string;
}

interface ParsedHeader {
  player: ParsedPlayer;
  time?: string;
}

export interface ParsedLine {
  time?: string;
  player: ParsedPlayer;
  content: string[];
}

export interface ParseResult {
  logLines: ParsedLine[];
}

type HeaderParser = (line: string) => ParsedHeader | null;
type LogLineConverter = (logLine: ParsedLine) => ParsedLine | null;

interface LogConfig {
  headerParser: HeaderParser;
  logLineConverter: LogLineConverter;
}

function removeSystemTextConverter(logLine: ParsedLine | null): ParsedLine | null {
  if (logLine == null)
    return null;
  const lines = logLine.content;
  const linesToRemove: number[] = [];
  for (let i = 0; i < lines.length - 2; i++) {
    const withdrawParser = /^.*撤回了一条消息$/;
    const commonFriendsParser = /^你和.*有\d+个共同好友，点击添加好友。$/;
    if (lines[i] === '' && (
      lines[i+1].match(withdrawParser) ||
      lines[i+1].match(commonFriendsParser)
    )) {
      linesToRemove.push(i);
      linesToRemove.push(i+1);
      i++;
    }
  }
  linesToRemove.reverse();
  for (const i of linesToRemove) {
    lines.splice(i, 1);
  }
  return logLine;
}

function defaultConverter(logLine: ParsedLine | null): ParsedLine | null {
  if (logLine == null)
    return null;
  const lines = logLine.content;
  while(lines.length > 0 && lines[0].trim() === '') {
    lines.splice(0, 1);
  }
  while(lines.length > 0 && lines[lines.length-1].trim() === '') {
    lines.splice(lines.length-1, 1);
  }
  if (lines.length === 0)
    return null;
  return logLine;
}

// Export from log
// E.g. "2019-09-23 8:43:38 PM 骰娘-Roll100(872001750)"
const exportFromLog: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regHeader = /^(\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}(?: (?:AM|PM))?) ([^AMP]*?)\((\d+)\)$/;
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, time, name, number] = matches;
    return {
      player: {
        name,
        number,
      },
      time,
    };
  },
  logLineConverter: (logLine: ParsedLine): ParsedLine | null => {
    if (['10000', '1000000'].includes(logLine.player.number || ''))
      return null;
    return defaultConverter(logLine);
  },
};

// Copy from sidewindow
// E.g. "【冒泡】无情的围观熊 2/14/2020 9:16:13 PM"
const copyFromSideWindow: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regHeader = /^(?:【(.{1,6})】)?(.*?) (\d{1,4}\/\d{2}\/\d{1,4}\xA0\d{1,2}:\d{2}:\d{2}(?:\xA0(?:AM|PM))?)$/;
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, title, name, time] = matches;
    return {
      player: {
        name,
        title,
      },
      time,
    };
  },
  logLineConverter: (logLine: ParsedLine): ParsedLine | null => {
    return flow(
      removeSystemTextConverter,
      defaultConverter,
    )(logLine);
  },
};

// Copy from chat
// E.g. "【煤油】丧 丧 熊 9:59:54 PM"
const copyFromChat: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regHeader = /^(?:【(.{1,6})】)?(.*)\xA0(\d{1,2}:\d{2}:\d{2}(?:\xA0(?:AM|PM)))?$/;
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, title, name, time] = matches;
    return {
      player: {
        name,
        title,
      },
      time,
    };
  },
  logLineConverter: (logLine: ParsedLine): ParsedLine | null => {
    return flow(
      removeSystemTextConverter,
      defaultConverter,
    )(logLine);
  },
};

export function parseChat(data: string): ParseResult {
  const logLines: ParsedLine[] = [];
  let firstLogConfig: LogConfig | undefined;
  for (const line of data.split('\n')) {
    const parsedHeader = ((): ParsedHeader | null => {
      if (firstLogConfig)
        return firstLogConfig.headerParser(line);
      for (const logConfig of [exportFromLog, copyFromSideWindow, copyFromChat]) {
        const result = logConfig.headerParser(line);
        if (result) {
          firstLogConfig = logConfig;
          return result;
        }
      }
      return null;
    })();
    if (parsedHeader) {
      logLines.push({
        ...parsedHeader,
        content: [],
      });
    } else {
      if (firstLogConfig) {
        const currentLogLine: ParsedLine | undefined = logLines[logLines.length - 1];
        // Content after a recognizable header
        if (currentLogLine)
          currentLogLine.content.push(line);
      } else {
        // Unrecognizable content before the first header
        // Do nothing
      }
    }
  }
  if (!firstLogConfig)
    return { logLines: [] };

  const convertedLogLines = compact(
    logLines.map(firstLogConfig.logLineConverter)
  );
  return { logLines: convertedLogLines };
}