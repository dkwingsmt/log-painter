import compact from 'lodash/compact';
import trim from 'lodash/trim';
import flow from 'lodash/flow';

export interface ParsedPlayer {
  name: string;
  number?: string;
  title?: string;
}

export interface ParsedLine {
  time?: string;
  player: ParsedPlayer;
  content: string[];
}

export interface ParseResult {
  logLines: ParsedLine[];
}

interface ParsedHeader {
  player: ParsedPlayer;
  time?: string;
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

  const withdrawParser = /^.*撤回了一条消息( 重新编辑)?$/;
  const withdrawMemberParser = /^.*撤回了成员.*的一条消息$/;
  const withdrawMember2Parser = /^.*撤回了一条成员消息$/;
  const commonFriendsParser = /^你和.*有\d+个共同好友，点击添加好友。$/;
  const joinMemberParser = /^.*加入本群。$/;
  const inviteMemberParser = /^.*邀请.*加入了本群。$/;

  let end = lines.length - 1;
  for (; end >=0; end--) {
    if ([
      /^ *$/,
      withdrawParser,
      withdrawMemberParser,
      withdrawMember2Parser,
      commonFriendsParser,
      joinMemberParser,
      inviteMemberParser,
    ].some((toMatch: RegExp) => toMatch.exec(lines[end]))) {
      continue;
    }
    break;
  }
  logLine.content = logLine.content.slice(0, end + 1);
  return logLine;
}

const regNumber = /\(\d+\)|<.+@.+\..+>/;
const regTitle = /(?:【(.{1,6})】)?/;
const regTime = /\d{1,2}:\d{2}:\d{2}(?: (?:AM|PM))?/;

function removeMessageManagerSystemTextConverter(logLine: ParsedLine | null): ParsedLine | null {
  if (logLine == null)
    return null;
  const lines = logLine.content;

  const dateParser = /^ \d{4}-\d{2}-\d{2}$/;
  const withdrawParser = new RegExp(`^${regTime.source}.*撤回了一条消息$`);
  const withdrawMemberParser = new RegExp(`^${regTime.source}.*撤回了成员.*的一条消息$`);
  const withdrawMember2Parser = new RegExp(`^${regTime.source}.*撤回了一条成员消息$`);
  // const commonFriendsParser = /^你和.*有\d+个共同好友，点击添加好友。$/;
  const joinMemberParser = new RegExp(`^${regTime.source}.*加入本群。$`);
  // const inviteMemberParser = /^.*邀请.*加入了本群。$/;

  let end = lines.length - 1;
  for (; end >=0; end--) {
    if ([
      /^ *$/,
      dateParser,
      withdrawParser,
      withdrawMemberParser,
      withdrawMember2Parser,
      joinMemberParser,
    ].some((toMatch: RegExp) => toMatch.exec(lines[end]))) {
      continue;
    }
    break;
  }
  logLine.content = logLine.content.slice(0, end + 1);
  return logLine;
}

function defaultConverter(logLine: ParsedLine | null): ParsedLine | null {
  if (logLine == null)
    return null;
  const lines = logLine.content;
  // Remove starting and trailing empty lines.
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

function trimNumber(src: string): string {
  return trim(src, '()<>');
}

// Export from log
// E.g. "2019-09-23 8:43:38 PM 骰娘-Roll100(872001750)"
const exportFromLog: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regDateName = new RegExp(`\\d{4}-\\d{2}-\\d{2} ${regTime.source}`);
    const regHeader = new RegExp(`^(${regDateName.source}) (.*)(${regNumber.source})$`);
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, time, name, number] = matches;
    return {
      player: {
        name,
        number: trimNumber(number),
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
    const regDateTime = new RegExp(`\\d{1,4}\\/\\d{1,2}\\/\\d{1,4} ${regTime.source}`);
    const regHeader = new RegExp(`^${regTitle.source}(.*?) (${regDateTime.source})$`);
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
    const regHeader = new RegExp(`^${regTitle.source}(.*) (${regTime.source})$`);
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

// Copy from message manager
// E.g. "织练取(958884) 3:13:28 AM"
const copyFromMessageManager: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regHeader = new RegExp(`^${regTitle.source}(.*?)(${regNumber.source}) (${regTime.source})$`);
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, title, name, number, time] = matches;
    return {
      player: {
        name,
        title,
        number: trimNumber(number),
      },
      time,
    };
  },
  logLineConverter: (logLine: ParsedLine): ParsedLine | null => {
    return flow(
      removeMessageManagerSystemTextConverter,
      defaultConverter,
    )(logLine);
  },
};

// Copy from mobile
// E.g. "a dark ideation  23:50:40"
const copyFromMobile: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regHeader = /^(.*?) {2}(\d{1,2}:\d{2}:\d{2}) *$/;
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, name, time] = matches;
    return {
      player: {
        name,
      },
      time,
    };
  },
  logLineConverter: (logLine: ParsedLine): ParsedLine | null => {
    return defaultConverter(logLine);
  },
};

export function parseChat(data: string): ParseResult {
  const logLines: ParsedLine[] = [];
  let firstLogConfig: LogConfig | undefined = undefined;
  for (const line of data.split('\n')) {
    const parsedHeader = ((): ParsedHeader | null => {
      if (firstLogConfig)
        return firstLogConfig.headerParser(line);
      for (const logConfig of [
        copyFromMessageManager,
        copyFromMobile,
        exportFromLog,
        copyFromSideWindow,
        copyFromChat,
      ]) {
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