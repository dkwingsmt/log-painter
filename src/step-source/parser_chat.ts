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
  content?: string;
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

  const withdrawParser = /^.*撤回了一条消息/;
  const withdrawEnglishParser = /^.* recalled a message( Re-edit)?$/;
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
      withdrawEnglishParser,
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
const regTime = /(?:(?:上午|下午) )?\d{1,2}:\d{2}:\d{2}(?: (?:AM|PM))?/;

function removeMobileDateConverter(logLine: ParsedLine | null): ParsedLine | null {
  if (logLine == null)
    return null;
  const lines = logLine.content;

  const dateParser = /^— —  \d{4}-\d{1,2}-\d{1,2}  — —$/;

  let end = lines.length - 1;
  for (; end >=0; end--) {
    if ([
      /^ *$/,
      dateParser,
    ].some((toMatch: RegExp) => toMatch.exec(lines[end]))) {
      continue;
    }
    break;
  }
  logLine.content = logLine.content.slice(0, end + 1);
  return logLine;
}

function removeMessageManagerSystemTextConverter(logLine: ParsedLine | null): ParsedLine | null {
  if (logLine == null)
    return null;
  const lines = logLine.content;

  const dateParser = /^ \d{4}-\d{2}-\d{2}$/;
  const withdrawParser = new RegExp(`^${regTime.source}.*撤回了一条消息`);
  const withdrawEnglishParser = new RegExp(`^${regTime.source}.* recalled a message( Re-edit)?`);
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
      withdrawEnglishParser,
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
// E.g. "2019-09-23 8:43:38 PM 骰娘-Roll100"
const exportFromLog: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regDateName = new RegExp(`\\d{4}-\\d{2}-\\d{2} ${regTime.source}`);
    const regHeader = new RegExp(`^(${regDateName.source}) (.*?)(${regNumber.source})?$`);
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, time, name, number] = matches;
    return {
      player: {
        name,
        number: number == null ? undefined : trimNumber(number),
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

// Copy from chat mainwindow or sidewindow
// E.g. "【冒泡】无情的围观熊 2/14/2020 9:16:13 PM"
// E.g. "【煤油】丧 丧 熊 9:59:54 PM"
const copyFromChat: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regDateTime = new RegExp(`(?:\\d{1,4}\\/\\d{1,2}\\/\\d{1,4} (?:星期. )?)?${regTime.source}`);
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
    return flow(
      removeMobileDateConverter,
      defaultConverter,
    )(logLine);
  },
};

// 溯洄骰的Log记录器
// E.g. "名字(123456) 2021-11-08 04:07:37"
const shikiLogRecord: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regHeader = new RegExp(`^(.*?)(${regNumber.source}) (\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})$`);
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, name, number, time] = matches;
    return {
      player: {
        name,
        number: trimNumber(number),
      },
      time,
    };
  },
  logLineConverter: (logLine: ParsedLine): ParsedLine | null => {
    return flow(
      defaultConverter,
    )(logLine);
  },
};

// Reparse log with angular brackes
// E.g. "<小明> 内容内容内容内容"
const reparseAngularBracket: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regHeader = /^<(.+)> (.+)$/;
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, name, content] = matches;
    return {
      player: {
        name,
      },
      content,
    };
  },
  logLineConverter: (logLine: ParsedLine): ParsedLine | null => {
    return flow(
      defaultConverter,
    )(logLine);
  },
};

// Reparse log with bold brackes
// E.g. "【小明】内容内容内容内容"
const reparseBoldBracket: LogConfig = {
  headerParser: (line: string): ParsedHeader | null => {
    const regHeader = /^【(.+)】(.+)$/;
    const matches = regHeader.exec(line);
    if (!matches)
      return null;
    const [_all, name, content] = matches;
    return {
      player: {
        name,
      },
      content,
    };
  },
  logLineConverter: (logLine: ParsedLine): ParsedLine | null => {
    return flow(
      defaultConverter,
    )(logLine);
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
        shikiLogRecord,
        copyFromMessageManager,
        copyFromMobile,
        exportFromLog,
        copyFromChat,
        reparseAngularBracket,
        reparseBoldBracket,
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
      const { player, time, content } = parsedHeader;
      logLines.push({
        player,
        time,
        content: content ? [content] : [],
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
